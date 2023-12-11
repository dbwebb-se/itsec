# itsec - Test Application

This repository contains the application used in kmom10 in the course "Information Security with Web Applications" (DV1616).

## Requirements

To run the application, the user needs to have Docker installed.

## Installation

To start the application, navigate to the application folder and run:

```
docker-compose up -d
```

### MariaDB

Once running, you can access the database with: `mysql:host=itsec-mariadb;` or by browsing to `http://localhost:8180/` to access an instance of [Adminer](https://www.adminer.org/).

The default login is `root/example`.

#### SQL

The application will not load without the basic categories and these can be added by running `sql/restore.sql` either via `docker exec` or by using Adminer.

## Usage

The website can be accessed by browsing to http://localhost:30001/ in your preferred browser. Or if you install the website with `npm install` and start it with `npm start`, the acces is http://localhost:3000/

## Problems
1. If docker problems, try:   
   - docker-compose down -v (close docker containers and clears volumes)
   - docker-compose up -d
2. If npm or terminal problems, try:
   - npm run clean-all
   - npm install
   - npm start

### Note

The database container is using a consistent volume.

## Credits

The work done with eshop-app in Javascript and Express js is done by ([Marie Grahn](https://www.bth.se/staff/marie-grahn-grm/)), who also will maintain it.
Original work (eshop-app-old) done in PHP and Anax by Niklas Andersson and Magnus Greiff.