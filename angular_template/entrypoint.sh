#!/bin/sh

# Replace $API_URL placeholder in index.html using environment variables
envsubst '$API_URL' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp
mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html

# Start Nginx
exec "$@"
