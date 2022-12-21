#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

function header {
    printf "\033[32;01m>>> -------------- %-20s -------------------------\033[0m\n" "$1"
}

cd me/kmom10/eshop-app2 || exit 1

docker-compose up -d

# Open eshop, localhost:8182 in browser
printf "Open localhost:8182/htdocs in browser\n"
eval "$BROWSER" "http://127.0.0.1:8182/htdocs" &

read -p "Done? "

exit "$?"
