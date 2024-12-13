# Specifies the image of your engine
FROM node:21
# COPY ./sql/restore.sql /docker-entrypoint-initdb.d/

# The working directory inside your container
WORKDIR /app

# Get the package.json first to install dependencies
COPY package*.json ./

# This will install those dependencies
RUN npm install

# Copy the rest of the app to the working directory
COPY . .

# Get the database config file for docker
COPY config/db/docker/eshop.mjs config/db/.

# Expose port 3000
EXPOSE 3000

# Run the container
CMD ["npm", "start"]
