FROM node:14

ARG PORT=5000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt-get update && apt-get install curl
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE $PORT
HEALTHCHECK CMD curl --fail http://localhost:$PORT/api-docs || exit 1
CMD [ "npm", "start" ]
