npm install;
npm run build;

if [[ -d dist ]]
then
    mv dist completed_build
fi

cp deploy/.htaccess completed_build/.htaccess
cp -a completed_build/* /usr/share/nginx/html;
nginx -g 'daemon off;'