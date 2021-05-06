FROM node:14-slim as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build-dev

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /.nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80