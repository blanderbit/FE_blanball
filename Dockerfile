
FROM node:18.9.0
RUN apt-get update
RUN apt-get install -y nginx
WORKDIR /app
COPY . /app
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
