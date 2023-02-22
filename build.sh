# Create a backup of the current build
timestamp=$(date +%Y-%m-%d_%H-%M-%S)
cp -r /usr/share/nginx/html "/backups/html_$timestamp"

# Install dependencies and build the project
npm install
npm run build

# Check if build was successful
if [[ -d /usr/share/nginx/html && -n $(ls /usr/share/nginx/html) ]]; then
    nginx -s reload
else
    # Roll back to the previous backup
    latest_backup=$(ls -td /backups/html_* | head -n 1)
    cp -r "$latest_backup" /usr/share/nginx/html

    # Reload Nginx
    nginx -s reload
fi