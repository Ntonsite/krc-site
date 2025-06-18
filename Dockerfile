# Build stage
FROM node:18.19.0 AS build

# Set working directory
WORKDIR /app

# Update npm to the latest version
RUN npm install -g npm@latest --force

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite project for production
RUN npm run build

# Production stage
FROM nginx:latest

# Copy the built files from the build stage to NGINX's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom NGINX configuration to change the port
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the custom port
EXPOSE 3000