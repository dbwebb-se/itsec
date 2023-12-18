#!/usr/bin/env bash

. .dbwebb/inspect-src/kmom.d/colors.bash

function header {
    printf "\033[32;01m>>> -------------- %-20s -------------------------\033[0m\n" "$1"
}

cd me || exit 1

header "INSTALLING ASSIGNMENT IN DOCKER"
cd kmom05/bank-app || exit 1
eval "npm install"
eval "npm start" &

header "OPEN ASSIGNMENT IN BROWSER"
url="http://127.0.0.1:1337/"
echo "Starting bank-app on 1337"
printf "$url\n" 2>&1
eval "$BROWSER" "$url" &

read -p "Done? "

exit "$?"
