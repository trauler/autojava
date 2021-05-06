FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/conf.d
COPY /upstream.conf /etc/nginx/conf.d
EXPOSE 80