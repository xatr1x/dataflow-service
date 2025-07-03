FROM node:18

WORKDIR /usr/src/app/service-b

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]