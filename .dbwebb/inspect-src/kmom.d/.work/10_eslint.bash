#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

function header {
    printf "\033[32;01m>>> -------------- %-20s -------------------------\033[0m\n" "$1"
}

if [[ ! -d "node_modules" ]]; then
    read -p "Missing folder npm_modules. Should I fix it? [Y/n]" answer
    if [[ "$answer" != "n" ]]; then
        npm install
    else
        exit 1
    fi
fi

eslint -c .eslintrc.json --ext=js "me/kmom05/bank-app" --silent || exit 1

read -p "All good. Done? "

exit 0
