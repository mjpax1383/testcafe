# Dockerfile for deploying testmoslem Cafe Menu on Darkoob / Hamravesh
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package configuration files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy all project source files
COPY . .

# Generate the default vector icons on build
RUN node write_svg_assets.js

# Expose server port
EXPOSE 3000

# Set environment variable for persistent storage directory inside the container
ENV PORT=3000
ENV DATA_DIR=/app/data

# Run the server
CMD ["node", "server.js"]
