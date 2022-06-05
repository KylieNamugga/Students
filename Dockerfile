FROM node:lts-alpine

WORKDIR '/var/www/app'

COPY package*.json ./

RUN npm install

COPY . /usr/src/app/

EXPOSE 3000

CMD ["node", "app.js"]