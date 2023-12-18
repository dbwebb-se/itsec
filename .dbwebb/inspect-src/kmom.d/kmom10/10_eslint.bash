#!/usr/bin/env bash

. .dbwebb/inspect-src/kmom.d/colors.bash

function header {
    printf "\033[32;01m>>> -------------- %-20s -------------------------\033[0m\n" "$1"
}

function validation
{
  #echo "Running [npm run $2 --what=$1]"

  res=$(npm run --silent $2 --what="$1")

  [[ ! -z "$res" ]] && printf "$2 $1/ validates: ${RED}${ERROR}${NC} $res" || printf "$2 $1/ validates: ${GREEN}${CORRECT}${NC}"
  echo ""
}

printf "Copying config files... \n"

if [[ ! -f "me/kmom10/eshop-js/.eslintrc.json" ]]; then
    read -p "Missing files. Should I fix it? [Y/n]" answer
    if [[ "$answer" != "n" ]]; then
        cp example/eshop-js/.eslintrc.json me/kmom10/eshop-js/
    else
        exit 1
    fi
fi

validation "me/kmom10/" "eslint"

# if [[ ! -d "node_modules" ]]; then
#     read -p "Missing folder npm_modules. Should I fix it? [Y/n]" answer
#     if [[ "$answer" != "n" ]]; then
#         npm install
#     else
#         exit 1
#     fi
# fi

header "INSTALLING ASSIGNMENT IN DOCKER"
cd me/kmom10/eshop-js || exit 1
eval "docker compose up -d"
eval "npm install"
eval "npm start" &

read -p "All good. Done? "

exit 0
