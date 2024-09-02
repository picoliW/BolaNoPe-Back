FROM node:latest 

WORKDIR /usr/node/app

COPY package*.json ./
RUN npm install
COPY . .

