const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Determine persistent data directory (Support cloud volumes like Darkoob / Hamravesh)
const DATA_DIR = process.env.DATA_DIR || __dirname;
const DB_FILE = path.join(DATA_DIR, 'data.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Ensure uploads directory exists on startup
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Auto-migration (Newly Added): Copy any pre-existing files from public/uploads to persistent storage on startup
const localUploadsDir = path.join(__dirname, 'public', 'uploads');
if (fs.existsSync(localUploadsDir) && localUploadsDir !== UPLOADS_DIR) {
  try {
    const localFiles = fs.readdirSync(localUploadsDir);
    localFiles.forEach(file => {
      const srcPath = path.join(localUploadsDir, file);
      const destPath = path.join(UPLOADS_DIR, file);
      if (fs.statSync(srcPath).isFile() && !fs.existsSync(destPath) && !file.startsWith('.')) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Auto-migrated asset: ${file} to persistent storage.`);
      }
    });
  } catch (e) {
    console.error('Error during uploads auto-migration:', e);
  }
}

// Serve public static assets
app.use(express.static(path.join(__dirname, 'public')));
// Serve uploaded images statically from persistent directory
app.use('/uploads', express.static(UPLOADS_DIR));

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('فقط فایل‌های تصویری مجاز هستند!'));
  }
});

// Helper to read data
function readData() {
  // If db file doesn't exist in the data dir, copy it from local template if exists
  if (!fs.existsSync(DB_FILE)) {
    const templatePath = path.join(__dirname, 'data.json');
    if (fs.existsSync(templatePath)) {
      try {
        fs.copyFileSync(templatePath, DB_FILE);
      } catch (e) {
        console.error('Error copying template data.json:', e);
      }
    } else {
      // Create empty DB template
      fs.writeFileSync(DB_FILE, JSON.stringify({ settings: { title: "moslem", adminPassword: "admin" }, categories: [], items: [] }, null, 2));
    }
  }

  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data.json:', err);
    return { settings: {}, categories: [], items: [] };
  }
}

// Helper to write data
function writeData(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing data.json:', err);
    return false;
  }
}

// Simple authentication middleware
function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  const db = readData();
  const actualPassword = db.settings.adminPassword || 'admin';
  
  if (token === actualPassword) {
    next();
  } else {
    res.status(401).json({ error: 'دسترسی غیرمجاز. لطفا دوباره وارد شوید.' });
  }
}

// API Routes

// Login
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const db = readData();
  const actualPassword = db.settings.adminPassword || 'admin';
  
  if (password === actualPassword) {
    res.json({ token: actualPassword, success: true });
  } else {
    res.status(401).json({ error: 'رمز عبور اشتباه است.' });
  }
});

// Get all menu data (publicly available)
app.get('/api/data', (req, res) => {
  const db = readData();
  const { adminPassword, ...safeSettings } = db.settings;
  
  const categories = (db.categories || []).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  const items = (db.items || []).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  res.json({
    settings: safeSettings,
    categories,
    items
  });
});

// Update Settings
app.post('/api/settings', authenticate, (req, res) => {
  const { title, subtitle, description, logo, adminPassword, phone, address, credit } = req.body;
  const db = readData();
  
  if (title !== undefined) db.settings.title = title;
  if (subtitle !== undefined) db.settings.subtitle = subtitle;
  if (description !== undefined) db.settings.description = description;
  if (logo !== undefined) db.settings.logo = logo;
  if (phone !== undefined) db.settings.phone = phone;
  if (address !== undefined) db.settings.address = address;
  if (credit !== undefined) db.settings.credit = credit;
  if (adminPassword) db.settings.adminPassword = adminPassword;
  
  if (writeData(db)) {
    const { adminPassword: _, ...safeSettings } = db.settings;
    res.json({ success: true, settings: safeSettings });
  } else {
    res.status(500).json({ error: 'خطا در ذخیره‌سازی تنظیمات.' });
  }
});

// Categories Endpoints

// Create Category
app.post('/api/categories', authenticate, (req, res) => {
  const { name, image, order } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'نام دسته‌بندی اجباری است.' });
  }
  
  const db = readData();
  const id = 'cat-' + Date.now();
  const newCategory = {
    id,
    name,
    image: image || '/default-assets/hot-drinks.svg',
    order: Number(order) || (db.categories.length + 1)
  };
  
  db.categories.push(newCategory);
  if (writeData(db)) {
    res.status(201).json(newCategory);
  } else {
    res.status(500).json({ error: 'خطا در ذخیره‌سازی دسته‌بندی.' });
  }
});

// Update Category
app.put('/api/categories/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { name, image, order } = req.body;
  const db = readData();
  
  const catIndex = db.categories.findIndex(c => c.id === id);
  if (catIndex === -1) {
    return res.status(404).json({ error: 'دسته‌بندی یافت نشد.' });
  }
  
  if (name) db.categories[catIndex].name = name;
  if (image !== undefined) db.categories[catIndex].image = image;
  if (order !== undefined) db.categories[catIndex].order = Number(order);
  
  if (writeData(db)) {
    res.json(db.categories[catIndex]);
  } else {
    res.status(500).json({ error: 'خطا در ویرایش دسته‌بندی.' });
  }
});

// Delete Category
app.delete('/api/categories/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const db = readData();
  
  db.categories = db.categories.filter(c => c.id !== id);
  db.items = db.items.filter(item => item.categoryId !== id);
  
  if (writeData(db)) {
    res.json({ success: true, message: 'دسته‌بندی و تمام آیتم‌های آن با موفقیت حذف شدند.' });
  } else {
    res.status(500).json({ error: 'خطا در حذف دسته‌بندی.' });
  }
});

// Items Endpoints

// Create Item
app.post('/api/items', authenticate, (req, res) => {
  const { categoryId, name, price, description, image, order } = req.body;
  if (!categoryId || !name || !price) {
    return res.status(400).json({ error: 'ورودی‌های اجباری: دسته‌بندی، نام، و قیمت.' });
  }
  
  const db = readData();
  const id = 'item-' + Date.now();
  const newItem = {
    id,
    categoryId,
    name,
    price,
    description: description || '',
    image: image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    order: Number(order) || (db.items.filter(i => i.categoryId === categoryId).length + 1)
  };
  
  db.items.push(newItem);
  if (writeData(db)) {
    res.status(201).json(newItem);
  } else {
    res.status(500).json({ error: 'خطا در ذخیره‌سازی آیتم.' });
  }
});

// Update Item
app.put('/api/items/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { categoryId, name, price, description, image, order } = req.body;
  const db = readData();
  
  const itemIndex = db.items.findIndex(i => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'آیتم یافت نشد.' });
  }
  
  if (categoryId) db.items[itemIndex].categoryId = categoryId;
  if (name) db.items[itemIndex].name = name;
  if (price !== undefined) db.items[itemIndex].price = price;
  if (description !== undefined) db.items[itemIndex].description = description;
  if (image !== undefined) db.items[itemIndex].image = image;
  if (order !== undefined) db.items[itemIndex].order = Number(order);
  
  if (writeData(db)) {
    res.json(db.items[itemIndex]);
  } else {
    res.status(500).json({ error: 'خطا در ویرایش آیتم.' });
  }
});

// Delete Item
app.delete('/api/items/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const db = readData();
  
  db.items = db.items.filter(i => i.id !== id);
  
  if (writeData(db)) {
    res.json({ success: true, message: 'آیتم با موفقیت حذف شد.' });
  } else {
    res.status(500).json({ error: 'خطا در حذف آیتم.' });
  }
});

// Image Upload Endpoint (Newly Added / Restored)
app.post('/api/upload', authenticate, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'فایلی ارسال نشده است.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// Get List of All Uploaded Files
app.get('/api/uploads', authenticate, (req, res) => {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'خطا در خواندن پوشه تصاویر.' });
    }
    const images = files
      .filter(file => !file.startsWith('.') && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map(file => {
        const filePath = path.join(UPLOADS_DIR, file);
        let stat;
        try {
          stat = fs.statSync(filePath);
        } catch (e) {
          stat = { size: 0 };
        }
        return {
          name: file,
          url: `/uploads/${file}`,
          size: stat.size
        };
      });
    res.json(images);
  });
});

// Delete an Uploaded File
app.delete('/api/uploads/:filename', authenticate, (req, res) => {
  const filename = req.params.filename;
  if (filename.includes('/') || filename.includes('..') || filename.includes('\\')) {
    return res.status(400).json({ error: 'نام فایل نامعتبر است.' });
  }
  const filePath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'خطا در حذف تصویر.' });
      }
      res.json({ success: true, message: 'تصویر با موفقیت از گالری سرور حذف شد.' });
    });
  } else {
    res.status(404).json({ error: 'تصویر یافت نشد.' });
  }
});

// Specific URL route to serve admin page
app.get('/secret-admin-portal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Wildcard for client-side routing fallback or redirection
app.get('/admin', (req, res) => {
  res.redirect('/secret-admin-portal');
});

// Express Error Handler Middleware (Catches Multer or permission errors, returns clean JSON instead of HTML)
app.use((err, req, res, next) => {
  console.error('Express Error Handler:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'حجم فایل انتخابی بیش از حد مجاز (۵ مگابایت) است.' });
    }
    return res.status(400).json({ error: `خطای آپلود: ${err.message}` });
  }
  res.status(500).json({ error: err.message || 'یک خطای داخلی در سرور رخ داده است.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
