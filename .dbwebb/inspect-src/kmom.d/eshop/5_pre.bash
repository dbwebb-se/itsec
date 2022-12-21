#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)
normal=$(tput sgr 0)

function header {
    printf "\033[32;01m>>> -------------- %-20s -------------------------\033[0m\n" "$1"
}

cd me || exit 1

#header "OPENING FILES IN VSCODE"
#code kmom10

# header "OPEN ASSIGNMENT IN BROWSER"
# url="$REDOVISA_HTTP_PREFIX/~$ACRONYM/dbwebb-kurser/$COURSE/me/$KMOM"
# eval "$BROWSER" "$url" &
