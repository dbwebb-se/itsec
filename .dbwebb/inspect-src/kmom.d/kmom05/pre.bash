#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

function header {
    printf "\033[32;01m>>> -------------- %-20s -------------------------\033[0m\n" "$1"
}

cd me || exit 1

header "OPENING FILES IN VSCODE"
code kmom05

# header "INSTALLING ASSIGNMENT IN DOCKER"
# cd kmom05/bank-app || exit 1
# eval "npm install"
# eval "npm start" &

# header "OPEN ASSIGNMENT IN BROWSER"
# url="http://127.0.0.1:1337/"
# echo "Starting bank-app on 1337"
# printf "$url\n" 2>&1
# eval "$BROWSER" "$url" &
