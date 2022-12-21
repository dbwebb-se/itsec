#!/usr/bin/env bash
#
# Script run BEFORE kmom specific scripts.
# Put tests here that applies to all kmoms.
#
# Available (and usable) data:
#   $COURSE
#   $KMOM
#   $ACRONYM
#   $REDOVISA_HTTP_PREFIX
#   $REDOVISA_HTTP_POSTFIX
#   $LOG_DOCKER
#   eval "$BROWSER" "$url" &
#   openUrl "$url"
#   openSpecificUrl "$DIR" "me/redovisa" "build/coverage/index.html"
#
#printf ">>> -------------- Pre (all kmoms) ----------------------\n"

echo $DIR

# Open log
echo "[$ACRONYM/$COURSE/$KMOM]" > "$LOG_DOCKER"

# Do different things depending on kmom
#localRepoUrl="http://127.0.0.1:18080/gui-repo"

studentServerUrl="$REDOVISA_HTTP_PREFIX/~$ACRONYM/dbwebb-kurser/$COURSE/me"

case $KMOM in
    kmom05)
        #openUrl "$studentServerUrl/kmom05/bank-app/index.js"
        header "OPENING FILES IN VSCODE"
        code me/kmom05/
    ;;
    kmom10)
        #openUrl "$studentServerUrl/kmom10/eshop-app2/htdocs"
        header "OPENING FILES IN VSCODE"
        code me/kmom10/
    ;;
esac


# # Rsync the target dir/repo to a temp space
# install -d gui-repo/
# rm -rf gui-repo/{*,.??*}
# rsync -a --delete $REPO/ gui-repo/
