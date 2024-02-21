FROM node:lts-alpine AS buildstage
RUN npm install -g @angular/cli
WORKDIR /app
COPY *.json ./
RUN npm ci
COPY . .
RUN ng build --configuration=production

EXPOSE  4200

FROM nginx:latest AS productionstage
COPY --from=buildstage /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 8000
CMD ["nginx","-g","daemon off;"]