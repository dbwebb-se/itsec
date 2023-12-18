#!/usr/bin/env bash
#
# Script run AFTER kmom specific scripts.
# Put tests here that applies to all kmoms.
#
# Available (and usable) data:
#   $COURSE
#   $KMOM
#   $ACRONYM
#   $REDOVISA_HTTP_PREFIX
#   $REDOVISA_HTTP_POSTFIX
#   eval "$BROWSER" "$url" &
#
printf ">>> -------------- Post (all kmoms) ---------------------\n"

if [[ "$KMOM" = "kmom10" ]]; then
    eval "docker compose down" &
fi

# echo
