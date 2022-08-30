
FROM node:12.14.0
RUN apt-get update
RUN apt-get install -y nginx
WORKDIR /app
COPY ../.. /app
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
