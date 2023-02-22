# Create a backup of the current build
timestamp=$(date +%Y-%m-%d_%H-%M-%S)
cp -r /usr/share/nginx/html "/backups/html_$timestamp"

# Install dependencies and build the project
npm install
npm run build

# Check if build was successful
if [[ -d dist && -n $(ls dist) ]]; then
    # Copy the .htaccess file to the dist directory
    cp deploy/.htaccess dist/.htaccess

    # Copy the contents of the dist directory to /usr/share/nginx/html
    cp -a dist/* /usr/share/nginx/html

    # Start Nginx in the foreground
    nginx -g 'daemon off;'
else
    # Roll back to the previous backup
    latest_backup=$(ls -td /backups/html_* | head -n 1)
    cp -r "$latest_backup"/* /usr/share/nginx/html

    # Start Nginx in the foreground
    nginx -g 'daemon off;'
fi