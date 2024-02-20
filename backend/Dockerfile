FROM node:lts-alpine
WORKDIR /app
COPY *.json .
RUN npm install
RUN npm run build
COPY . . 
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
