# Create a backup of the current build
timestamp=$(date +%Y-%m-%d_%H-%M-%S)
cp -r /usr/share/nginx/html "/backups/html_$timestamp"

# Install dependencies and build the project
npm install
npm run build

# Check if build was successful
if [[ -d /usr/share/nginx/html && -n $(ls /usr/share/nginx/html) ]]; then
    # Create the /run directory and set the correct permissions
    mkdir -p /run/nginx
    chown -R nginx:nginx /run/nginx
    chmod -R 755 /run/nginx

    # Start Nginx in the foreground
    nginx -g 'daemon off;'
else
    # Roll back to the previous backup
    latest_backup=$(ls -td /backups/html_* | head -n 1)
    cp -r "$latest_backup" /usr/share/nginx/html

    # Create the /run directory and set the correct permissions
    mkdir -p /run/nginx
    chown -R nginx:nginx /run/nginx
    chmod -R 755 /run/nginx

    # Start Nginx in the foreground
    nginx -g 'daemon off;'
fi