const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'default-assets');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'hot-drinks': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Coffee Cup with Steam -->
    <path d="M18 14c0-4 4-4 4-8 M28 14c0-4 4-4 4-8 M38 14c0-4 4-4 4-8" stroke="#8B5A2B" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M12 20h32v20c0 8-8 10-16 10s-16-2-16-10V20z" fill="#FFF5EE" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <path d="M12 28h32" stroke="#333" stroke-width="3"/>
    <path d="M44 24h6c4 0 5 3 5 5s-1 5-5 5h-6" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <rect x="6" y="50" width="44" height="6" rx="3" fill="#EAD8C0" stroke="#333" stroke-width="3"/>
    <!-- Coffee liquid inside -->
    <path d="M14 26c4-1 8 1 12 0s8-2 12 0s4 1 4 1v1h-32v-2z" fill="#8B4513"/>
  </svg>`,

  'cold-drinks': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Iced Coffee / Cold Drink -->
    <path d="M42 8L48 4" stroke="#D2691E" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M16 16h32L42 56H22L16 16z" fill="#FDF5E6" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <path d="M17 22c5-1 10 1 15 0s10-2 15 0" stroke="#333" stroke-width="2" fill="none"/>
    <path d="M18 28l20 4v20H24L18 28z" fill="#CD853F" opacity="0.85"/>
    <!-- Straw -->
    <path d="M30 48V10l12-6" fill="none" stroke="#FF4500" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Ice cubes -->
    <rect x="22" y="30" width="8" height="8" rx="1" fill="#FFF" stroke="#333" stroke-width="2" transform="rotate(15 26 34)"/>
    <rect x="32" y="36" width="8" height="8" rx="1" fill="#FFF" stroke="#333" stroke-width="2" transform="rotate(-10 36 40)"/>
  </svg>`,

  'shake': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Shake / Smoothie Tall Glass -->
    <path d="M18 22h28l-6 34H24L18 22z" fill="#FFF" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Shake color pink -->
    <path d="M19 28h26l-4.5 25h-17L19 28z" fill="#FFB6C1"/>
    <!-- Whipped cream -->
    <path d="M22 22c0-4 4-6 10-6s10 2 10 6" fill="#FFF" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <path d="M26 17c0-3 3-5 6-5s6 2 6 5" fill="#FFF" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="10" r="3" fill="#FF0000" stroke="#333" stroke-width="2"/>
    <!-- Straw -->
    <path d="M38 28V6l8-3" fill="none" stroke="#1E90FF" stroke-width="3" stroke-linecap="round"/>
    <line x1="24" y1="56" x2="40" y2="56" stroke="#333" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  'cake': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Cake Slice / Plate -->
    <path d="M10 50h44v4H10v-4z" fill="#EAD8C0" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Cake body -->
    <path d="M14 50V26l36 10v14H14z" fill="#CD853F" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Layers -->
    <path d="M14 38l36 10" stroke="#333" stroke-width="3"/>
    <path d="M14 38l36 10" stroke="#FFF" stroke-width="2" fill="none"/>
    <!-- Cream frosting on top -->
    <path d="M14 26s8 4 18 1s18 9 18 9v3s-10-8-18-9s-18-4-18-4v-1z" fill="#FFF" stroke="#333" stroke-width="2"/>
    <!-- Cherry on top -->
    <circle cx="30" cy="20" r="4" fill="#FF0000" stroke="#333" stroke-width="2"/>
    <path d="M32 17c2-4 6-4 8-2" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  'pizza': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Pizza Slice -->
    <path d="M12 12c15 5 35 15 40 40C35 45 15 25 12 12z" fill="#FFA500" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Crust -->
    <path d="M12 12c3 1.5 5 5 5 8s-1.5 5-5 5c-3 0-5-2-5-5s2.5-6.5 5-8z" fill="#D2691E" stroke="#333" stroke-width="2" transform="rotate(-45 12 12)"/>
    <!-- Pepperonis -->
    <circle cx="28" cy="24" r="3.5" fill="#D32F2F" stroke="#333" stroke-width="2"/>
    <circle cx="38" cy="34" r="3.5" fill="#D32F2F" stroke="#333" stroke-width="2"/>
    <circle cx="24" cy="36" r="3.5" fill="#D32F2F" stroke="#333" stroke-width="2"/>
    <!-- Basil leaves -->
    <path d="M34 18c-2 2-2 4-2 4s2 0 4-2s2-4 2-4" fill="#4CAF50"/>
    <path d="M44 26c-2 2-2 4-2 4s2 0 4-2s2-4 2-4" fill="#4CAF50"/>
  </svg>`,

  'salad': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Salad Bowl with Greens -->
    <path d="M10 28c0 0 4 12 22 12s22-12 22-12H10z" fill="#E0F7FA" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <path d="M14 28c0 10 36 10 36 0" fill="#FFF" opacity="0.5"/>
    <circle cx="16" cy="22" r="5" fill="#81C784" stroke="#333" stroke-width="2"/>
    <circle cx="24" cy="20" r="6" fill="#4CAF50" stroke="#333" stroke-width="2.5"/>
    <circle cx="34" cy="18" r="7" fill="#2E7D32" stroke="#333" stroke-width="2.5"/>
    <circle cx="44" cy="21" r="5.5" fill="#4CAF50" stroke="#333" stroke-width="2.5"/>
    <circle cx="50" cy="24" r="4" fill="#81C784" stroke="#333" stroke-width="2"/>
    <!-- Tomato slice -->
    <circle cx="30" cy="25" r="5" fill="#E53935" stroke="#333" stroke-width="2"/>
    <circle cx="30" cy="25" r="2.5" fill="#FF8A80"/>
    <!-- Cucumber slice -->
    <circle cx="40" cy="26" r="4.5" fill="#81C784" stroke="#333" stroke-width="2"/>
  </svg>`,

  'pasta': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Pasta Bowl -->
    <ellipse cx="32" cy="46" rx="22" ry="8" fill="#ECEFF1" stroke="#333" stroke-width="3"/>
    <!-- Spaghetti -->
    <path d="M16 40c4-8 12-12 16-12s12 4 16 12" fill="none" stroke="#FFD54F" stroke-width="6" stroke-linecap="round"/>
    <path d="M20 36c4-6 10-10 12-10s8 4 12 10" fill="none" stroke="#FFCA28" stroke-width="5" stroke-linecap="round"/>
    <path d="M24 32c4-4 6-6 8-6s4 2 8 6" fill="none" stroke="#FFD54F" stroke-width="5" stroke-linecap="round"/>
    <!-- Sauce / Basil -->
    <path d="M28 26c1-2 5-2 8 0s2 4 0 4s-7 0-8-4z" fill="#D32F2F" stroke="#333" stroke-width="2"/>
    <path d="M32 20c-1 2-3 2-3 2s0-2 2-3s2-1 2-1" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>
  </svg>`,

  'sandwich': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Sandwich / Sub -->
    <path d="M8 32c0-8 8-10 24-10s24 2 24 10H8z" fill="#F4A460" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Fillings (Lettuce, Tomato, Cheese) -->
    <path d="M6 32c3-3 6 0 9-3s6 3 9 0s6 3 9 0s6 3 9 0s6 3 9 0" fill="none" stroke="#4CAF50" stroke-width="4" stroke-linecap="round"/>
    <path d="M12 34h40" stroke="#E53935" stroke-width="4" stroke-linecap="round"/>
    <path d="M15 32l6 4h10l6-4h10l6 4" fill="none" stroke="#FFD54F" stroke-width="3"/>
    <!-- Bottom bread -->
    <path d="M8 35c0 8 8 10 24 10s24-2 24-10H8z" fill="#D2691E" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
  </svg>`,

  'burger': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Double Cheeseburger -->
    <path d="M12 28c0-10 10-12 20-12s20 2 20 12H12z" fill="#DEB887" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Sesame seeds -->
    <circle cx="22" cy="20" r="1" fill="#FFF"/>
    <circle cx="32" cy="18" r="1" fill="#FFF"/>
    <circle cx="42" cy="21" r="1" fill="#FFF"/>
    <!-- Lettuce -->
    <path d="M10 28c4 2 8-2 12 0s8 2 12 0s8-2 12 0s4 2 8 0" fill="none" stroke="#4CAF50" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Cheese -->
    <path d="M11 32h42l-4 5H15l-4-5z" fill="#FFD54F" stroke="#333" stroke-width="2" stroke-linejoin="round"/>
    <!-- Meat Patty -->
    <rect x="11" y="36" width="42" height="6" rx="3" fill="#8B4513" stroke="#333" stroke-width="3"/>
    <!-- Bottom bun -->
    <path d="M12 44c0 4 6 6 20 6s20-2 20-6H12z" fill="#CD853F" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
  </svg>`,

  'fries': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- French Fries Red Box -->
    <g stroke="#333" stroke-width="3" fill="#FFD54F" stroke-linecap="round">
      <rect x="18" y="10" width="5" height="24" rx="2" transform="rotate(-15 20 22)"/>
      <rect x="25" y="6" width="5" height="26" rx="2" transform="rotate(-5 27 22)"/>
      <rect x="32" y="8" width="5" height="25" rx="2" transform="rotate(5 34 22)"/>
      <rect x="39" y="12" width="5" height="23" rx="2" transform="rotate(15 41 22)"/>
      <rect x="14" y="16" width="5" height="20" rx="2" transform="rotate(-25 16 26)"/>
      <rect x="44" y="18" width="5" height="18" rx="2" transform="rotate(25 46 26)"/>
    </g>
    <!-- Red Pocket -->
    <path d="M14 26l4 28h28l4-28c-6 4-12 4-18 0c-6-4-12-4-18 0z" fill="#E53935" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <path d="M26 40c4-4 8-4 12 0" fill="none" stroke="#FFD54F" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  'hot-bar': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Hot Bar / Espresso Pot -->
    <path d="M20 18l4 24h16l4-24H20z" fill="#ECEFF1" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <path d="M24 42l2 12h10l2-12H24z" fill="#CFD8DC" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Lid -->
    <path d="M18 18h28l-4-4H22l-4 4z" fill="#B0BEC5" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="32" cy="11" r="3" fill="#333"/>
    <!-- Handle -->
    <path d="M20 26h-6v10h6" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <!-- Spout -->
    <path d="M44 22l6-4v6l-6 2" fill="#CFD8DC" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Steam -->
    <path d="M48 10c1-3 3-3 3-6 M54 12c1-3 3-3 3-6" stroke="#B0BEC5" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`,

  'tea': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Tea Cup / Tea Bag -->
    <path d="M16 22h24c0 10-4 16-12 16s-12-6-12-16z" fill="#FFF" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Tea color -->
    <path d="M18 26c4 1 8-1 12 0s8 1 10 0c0 4-2 10-10 10s-12-6-12-10z" fill="#CD853F"/>
    <!-- Handle -->
    <path d="M40 26h5c3 0 4 2 4 4s-1 4-4 4h-5" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <!-- Plate -->
    <rect x="10" y="42" width="36" height="5" rx="2.5" fill="#ECEFF1" stroke="#333" stroke-width="3"/>
    <!-- Tea tag -->
    <path d="M26 22l-4-8h-4" fill="none" stroke="#757575" stroke-width="2" stroke-linecap="round"/>
    <rect x="14" y="10" width="5" height="7" fill="#E53935" stroke="#333" stroke-width="1.5"/>
  </svg>`,

  'smoothie': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Smoothie Mason Jar -->
    <rect x="18" y="22" width="28" height="32" rx="6" fill="#E1F5FE" stroke="#333" stroke-width="3"/>
    <!-- Smoothie Color (Purple/berry) -->
    <rect x="20" y="28" width="24" height="24" rx="4" fill="#BA68C8"/>
    <!-- Handle -->
    <path d="M18 28h-5v16h5" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <!-- Straw -->
    <path d="M36 28V6l-8-3" fill="none" stroke="#4CAF50" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Mint leaf -->
    <path d="M24 28c-1-3 2-4 4-2s1 5 1 5s-3-1-5-3z" fill="#81C784" stroke="#333" stroke-width="1.5"/>
  </svg>`,

  'mocktail': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Cocktail / Mocktail Glass -->
    <path d="M14 16h36L32 38z" fill="#FFF" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Drink color (orange/yellow gradient look) -->
    <path d="M18 21h28L32 36z" fill="#FFD54F"/>
    <path d="M32 38v16" stroke="#333" stroke-width="3"/>
    <line x1="22" y1="54" x2="42" y2="54" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    <!-- Lemon wheel on rim -->
    <circle cx="48" cy="14" r="6" fill="#FFEE58" stroke="#333" stroke-width="2"/>
    <path d="M48 14l3 5 M48 14l-5-2" stroke="#333" stroke-width="1"/>
    <!-- Straw / Umbrella -->
    <path d="M24 30l-8-18" stroke="#FF5722" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  'juice': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Juice Glass -->
    <path d="M18 16h28l-4 38H22z" fill="#FFF" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <path d="M19 24h26l-3 28H22z" fill="#FFA726"/>
    <!-- Straw -->
    <path d="M30 36V8l10-4" fill="none" stroke="#E53935" stroke-width="3" stroke-linecap="round"/>
    <!-- Orange Slice -->
    <path d="M42 22a6 6 0 1 1-6-6" fill="none" stroke="#FFA726" stroke-width="2"/>
  </svg>`,

  'drinks': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Drinks Can -->
    <rect x="18" y="14" width="28" height="42" rx="4" fill="#A5D6A7" stroke="#333" stroke-width="3"/>
    <!-- Can details -->
    <path d="M18 22h28 M18 48h28" stroke="#333" stroke-width="2"/>
    <rect x="22" y="26" width="20" height="18" rx="2" fill="#81C784" stroke="#333" stroke-width="2"/>
    <!-- Pull tab -->
    <path d="M32 14v-4h4v4" fill="none" stroke="#333" stroke-width="2" stroke-linejoin="round"/>
    <!-- Cute design on can -->
    <circle cx="32" cy="35" r="4" fill="#FFF" stroke="#333" stroke-width="1.5"/>
  </svg>`,

  'breakfast': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Frying Pan with Egg -->
    <circle cx="28" cy="34" r="18" fill="#546E7A" stroke="#333" stroke-width="3"/>
    <path d="M44 42l14 10" stroke="#333" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Egg white -->
    <path d="M20 34c0-5 6-8 10-6s8 4 6 8s-6 6-10 4s-6-1-6-6z" fill="#FFF" stroke="#333" stroke-width="2"/>
    <!-- Egg yolk -->
    <circle cx="25" cy="32" r="4.5" fill="#FFCA28" stroke="#333" stroke-width="2"/>
  </svg>`,

  'steak': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100" height="100">
    <!-- Steak -->
    <path d="M12 32C12 20 22 14 36 16s20 10 16 22s-10 16-24 14s-16-12-16-20z" fill="#8D6E63" stroke="#333" stroke-width="3" stroke-linejoin="round"/>
    <!-- Fat strip -->
    <path d="M12 32c4-2 10-1 14 3s10 2 12-2" fill="none" stroke="#FFF" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Grill marks -->
    <line x1="24" y1="20" x2="32" y2="28" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
    <line x1="32" y1="18" x2="40" y2="26" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
    <line x1="40" y1="20" x2="46" y2="26" stroke="#5D4037" stroke-width="3" stroke-linecap="round"/>
  </g>
  </svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, `${name}.svg`), content.trim());
}

console.log('SVGs written successfully!');
