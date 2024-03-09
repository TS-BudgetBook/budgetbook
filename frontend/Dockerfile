FROM node:lts-alpine AS buildstage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

FROM nginx:latest AS productionstage
COPY --from=buildstage /app/dist/frontend/browser /etc/nginx/html

EXPOSE 8080
CMD ["nginx","-g","daemon off;"]