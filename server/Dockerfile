FROM node:14-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --prod

# Bundle app source
COPY . /usr/src/app

# Build react app
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
