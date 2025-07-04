FROM node:18

WORKDIR /usr/src/app/service-a

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "dist/service-a/src/main.js"]