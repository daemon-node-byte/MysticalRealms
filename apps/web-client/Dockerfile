# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the app source
COPY . .

# Build the app (if using Next.js or similar)
RUN pnpm build

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
