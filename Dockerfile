FROM node:16-alpine

# create app dir
WORKDIR /usr/src/app

# install app dependency
COPY package*.json ./
RUN npm ci --only=production

# bundle app source
COPY . .

# expose specific port
EXPOSE 3000

# run
CMD [ "node", "app.js" ]