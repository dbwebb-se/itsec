#!/usr/bin/env bash
cd me/kmom01 || exit 1

echo ""
tput setaf 6
echo "----- Check for a pdf-file -----"
tput sgr0
ls

echo ""

tput setaf 6
read -r -p "----- Is it there? [Y/n] ----- " response
tput sgr0

if [ ! "$response" = "n" ]
then
    open *.pdf
fi

#eval "$BROWSER" "http://localhost:$port/all" &

# tput setaf 6
# read -p "Done with viewing browser? <Press Enter>"
# tput sgr0
