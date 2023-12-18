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

cp example/bank-app/.eslintrc.json me/kmom05/bank-app/

validation "me/kmom05/bank-app" "eslint"
# npm run linter "me/kmom05/bank-app" --silent || exit 1

# if [[ ! -d "node_modules" ]]; then
#     read -p "Missing folder npm_modules. Should I fix it? [Y/n]" answer
#     if [[ "$answer" != "n" ]]; then
#         npm install
#     else
#         exit 1
#     fi
# fi

read -p "All good. Done? "

exit 0
