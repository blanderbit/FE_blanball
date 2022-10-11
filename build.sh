npm install;
npm run build;
cp deploy/.htaccess dist/.htaccess
cp -a dist/* /usr/share/nginx/html;
nginx -g 'daemon off;'
