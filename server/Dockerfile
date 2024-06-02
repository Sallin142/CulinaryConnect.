# Set the base image
FROM node:14

# Set the working directory in the docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the docker container
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose port 3001
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]