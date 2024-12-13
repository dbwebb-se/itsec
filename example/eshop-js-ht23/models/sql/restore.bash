#!/bin/bash
#restores the database when starting the docker container
sleep 100
mariadb -uroot -pexample < ./create_database.sql

sleep 1000
mariadb -uroot -pexample < ./create_tables.sql

sleep 1000
mariadb -uroot -pexample < ./create_procedures.sql