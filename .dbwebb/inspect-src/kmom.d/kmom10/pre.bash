#!/usr/bin/env bash

function header {
    printf "\033[32;01m>>> -------------- %-20s -------------------------\033[0m\n" "$1"
}

cd me || exit 1

header "OPENING FILES IN VSCODE"
code kmom10
echo " "

header "STARTING DOCKER CONTAINERS FOR ESHOP"
cd kmom10/eshop-js || exit 1
eval "docker compose up -d" &
cd ../.. || exit 1
