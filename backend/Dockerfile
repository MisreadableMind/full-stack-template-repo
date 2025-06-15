# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port that your NestJS application will run on
EXPOSE 4000

# Define environment variable (optional, adjust according to your needs)
ENV NODE_ENV=production

# Command to run the NestJS application with memory limit (adjust memory size as needed)
CMD ["node", "--max-old-space-size=8192", "dist/main.js"]