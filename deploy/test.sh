ls -l
npm install;
npm run build;
cp -a dist/* /usr/share/nginx/html;
nginx -g 'daemon off;'
