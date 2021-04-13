FROM node:14-slim as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY ./scripts ./scripts
RUN npm install
# COPY ./src ./src
COPY . .
# COPY ./public ./public
RUN npm run build-dev
RUN ls dist

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /.nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80