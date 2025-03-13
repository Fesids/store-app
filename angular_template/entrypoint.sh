#!/bin/sh

# Replace the placeholder in main.*.js or any generated JS bundle
# We look for "API_URL_PLACEHOLDER" and replace it with $API_URL
sed -i "s|API_URL_PLACEHOLDER|${API_URL}|g" /usr/share/nginx/html/*.js

exec "$@"
