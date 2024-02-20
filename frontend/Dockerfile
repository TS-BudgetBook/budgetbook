FROM node:lts-alpine
RUN npm install -g @angular/cli
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build 

EXPOSE  4200