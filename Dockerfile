#Specify a base image
FROM node:14-alpine

#Setup working directory
WORKDIR '/app'

#Copy the dependencies file
COPY package.json .

#Install dependencies
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

#Copy remaining files
COPY . .

#Start the application
CMD ["npm", "run", "start"]