# itsec-eshop-js

kmom10 project in itsec

# Installation

1. Copy the directory itsec-eshop-js to kmom10
2. Go to itsec-eshop-js
3. To install eshop in terminal:
npm install  
4. Start the database and eshop in docker:
docker compose up -d
or
start eshop in terminal:
npm start

## Build itsec/eshop

docker compose build eshop  

## Start mariadb with docker

Download the latest mariadb image:
docker pull mariadb

Start the docker container:
docker run --name mariadb2 -e MYSQL_ROOT_PASSWORD=example -p 33061:33061 -d docker.io/library/mariadb:latest

Restore the database:
docker exec -i mariadb2 bash -c "mariadb -uroot -pexample" < models/sql/restore.sql
or
docker exec -i itsec-mariadb bash -c "mariadb -uroot -pexample" < models/sql/restore.sql

docker exec -it mariadb2 bash -c "mariadb -uroot -pexample itsec"
MariaDB [itsec]> select * from Category;
+------------+-------------------+----------+--------+
| categoryID | categoryName      | parentID | gender |
+------------+-------------------+----------+--------+
|          1 | Byxor             |     NULL |      0 |
|          2 | Tröjor            |     NULL |      0 |
|          3 | Jackor            |     NULL |      0 |
...
exit;

Stop the mariadb2 container:
docker stop mariadb2

## Start mariadb with docker-compose

Create a docker-compose.yml file and the volume /var/lib/mysql
Run:
docker-compose up -d
Now you have a docker container with mariadb restored with info from restore.sql

## Connection with mariadb in docker

docker ps -a

docker exec -it cf91022335a7 /bin/sh
eller
docker exec -it cf91022335a7 bash  
eller
docker exec -it eshop-app2-itsec-anax-db-1 bash

mariadb -uroot -pexample  
eller  
mariadb -uroot -pexample -Ditsec

use itsec

docker exec -it eshop-app2-itsec-anax-db-1 bash -c "mariadb -uroot -pexample -Ditsec"

select * from Category;

docker ps -a
cf91022335a7   mariadb                 "docker-entrypoint.s…"   5 days ago   Up 5 days   3306/tcp                 eshop-app2-itsec-anax-db-1
docker inspect cf91022335a7
=> lots of information
Container host ip: 172.17.0.1
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' eshop-app2-itsec-anax-db-1
=> 172.31.0.3

docker exec -it cf91022335a7 bash -c "mariadb -uroot -pexample -Ditsec"
docker exec -it eshop-app2-itsec-anax-db-1 bash -c "mariadb -uroot -pexample -Ditsec"  
docker run --hostname=cf91022335a7 --env=MYSQL_ROOT_PASSWORD=example --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=GOSU_VERSION=1.14 --env=LANG=C.UTF-8 --env=MARIADB_VERSION=1:10.11.2+maria~ubu2204 --volume=/Users/grm/dbwebb-kurser/itsec/me/kmom10/eshop-app2/sql:/docker-entrypoint-initdb.d:rw --volume=/var/lib/mysql --network=eshop-app2_default --restart=always --label='com.docker.compose.config-hash=9eac4ec3b242bdd99c6fe3ee7db616cc940c3c8e6c75d85c4dc1a1aa7b1d6798' --label='com.docker.compose.container-number=1' --label='com.docker.compose.depends_on=' --label='com.docker.compose.image=sha256:4a632f970181546d4d3b8c91fe481fe8220206ee2fd96842b16b7607591de916' --label='com.docker.compose.oneoff=False' --label='com.docker.compose.project=eshop-app2' --label='com.docker.compose.project.config_files=/Users/grm/dbwebb-kurser/itsec/me/kmom10/eshop-app2/docker-compose.yml' --label='com.docker.compose.project.working_dir=/Users/grm/dbwebb-kurser/itsec/me/kmom10/eshop-app2' --label='com.docker.compose.service=itsec-anax-db' --label='com.docker.compose.version=2.17.3' --label='org.opencontainers.image.authors=MariaDB Community' --label='org.opencontainers.image.base.name=docker.io/library/ubuntu:jammy' --label='org.opencontainers.image.description=MariaDB Database for relational SQL' --label='org.opencontainers.image.documentation=https://hub.docker.com/_/mariadb/' --label='org.opencontainers.image.licenses=GPL-2.0' --label='org.opencontainers.image.ref.name=ubuntu' --label='org.opencontainers.image.source=https://github.com/MariaDB/mariadb-docker' --label='org.opencontainers.image.title=MariaDB Database' --label='org.opencontainers.image.url=https://github.com/MariaDB/mariadb-docker' --label='org.opencontainers.image.vendor=MariaDB Community' --label='org.opencontainers.image.version=10.11.2' --runtime=runc -d mariadb

## DNS lookup

node -pe 'require("dns").lookup("172.17.0.1",function(){console.dir(arguments)})'  
or
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb2

Tips på att koppla upp sig mot mariadb i docker
https://stackoverflow.com/questions/33827342/how-to-connect-mysql-workbench-to-running-mysql-inside-docker
select host, user from mysql.user;
=> root får koppla upp sig från vilken host som helst
