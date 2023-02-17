npm install;
npm run build;

if [[ -d dist ]]
then
    mv dist completed_build
fi
if [[ -d completed_build ]]
then
    cp deploy/.htaccess completed_build/.htaccess
    cp -a completed_build/* /usr/share/nginx/html;
    nginx -g 'daemon off;'
if