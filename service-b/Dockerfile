FROM node:18

WORKDIR /usr/src/app/service-b

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "dist/service-b/src/main.js"]