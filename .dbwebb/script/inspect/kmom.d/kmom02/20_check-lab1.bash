#!/usr/bin/env bash
cd me/kmom02/bash1 || exit 1

./answer.bash

tput setaf 6
read -p "Done viewing the lab?"
tput sgr0
