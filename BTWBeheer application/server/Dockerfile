# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Rebuild the bcrypt module within the container
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express app will run on
EXPOSE 5000

# Command to run the Express app
CMD [ "npm", "start" ]
