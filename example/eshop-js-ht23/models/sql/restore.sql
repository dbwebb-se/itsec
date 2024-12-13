DROP DATABASE IF EXISTS itsec;
CREATE DATABASE itsec;

USE itsec;

SET NAMES utf8;

DROP USER IF EXISTS 'user'@'%';
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON itsec.* TO 'user'@'%';
FLUSH PRIVILEGES;

--
-- Create the table Category
--

CREATE TABLE IF NOT EXISTS Category (
	`categoryID` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `categoryName` VARCHAR(80) NOT NULL,
	`parentID` INTEGER DEFAULT NULL,
	`gender`   INTEGER NOT NULL
);

--
-- Create the table Product
--

CREATE TABLE IF NOT EXISTS Product (
	`productID` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `productManufacturer` VARCHAR(80) NOT NULL,
    `productName` VARCHAR(80) NOT NULL,
    `productOriginCountry` VARCHAR(40) NOT NULL,
    `productWeight` INTEGER NOT NULL,
    `productSize` VARCHAR(3) NOT NULL,
    `productSellPrize` INTEGER NOT NULL,
    `productBuyPrize` INTEGER NOT NULL,
    `productColor` VARCHAR(20) NOT NULL,
    `productAmount` INTEGER,
    `productCategoryID` INTEGER,
	`productGender`   INTEGER NOT NULL,
    `productDeleted`  VARCHAR(5) NOT NULL,
    `productImage` VARCHAR(80),
	FOREIGN KEY (`productCategoryID`) REFERENCES Category(`categoryID`)
);

--
-- Create the table Role
--

CREATE TABLE IF NOT EXISTS Role (
	`roleID` INTEGER PRIMARY KEY NOT NULL,
	`roleName` VARCHAR(80) NOT NULL
);

--
-- Create the table User
--

CREATE TABLE IF NOT EXISTS User (
	`userID` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `userFirstName` VARCHAR(40) NOT NULL,
    `userSurName` VARCHAR(80) NOT NULL,
    `userPhone` VARCHAR(40),
    `userMail` VARCHAR(80) NOT NULL,
    `userGender` INTEGER,
    `userAddress` VARCHAR (120) NOT NULL,
    `userPostcode` INTEGER NOT NULL,
    `userCity` VARCHAR(80) NOT NULL,
	`userRole` INTEGER NOT NULL DEFAULT 0,
	`userPassword` VARCHAR(255) NOT NULL,
	FOREIGN KEY (`userRole`) REFERENCES Role(`roleID`)
);

--
-- Create the table Coupons
--

CREATE TABLE IF NOT EXISTS Coupon (
	`couponID` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `couponName` VARCHAR(64) UNIQUE,
    `couponAmount` INTEGER,
    `startDate` DATETIME,
    `finishDate` DATETIME
);


--
-- Create the table Orders
-- https://github.com/canax/database/issues/1#issuecomment-338931447
--

CREATE TABLE IF NOT EXISTS Orders (
	`orderID` INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `userID` INTEGER NOT NULL,
    `purchaseTime` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`sentTime` DATETIME NULL,
	`couponID` INTEGER,
	`orderStatus` VARCHAR(40),
	`price` INTEGER,
	FOREIGN KEY (`userID`) REFERENCES User(`userID`),
	FOREIGN KEY (`couponID`) REFERENCES Coupon(`couponID`)
);

--
-- Create the table OrderItem
--

CREATE TABLE IF NOT EXISTS OrderItem (
	`orderID` INTEGER NOT NULL,
	`productID` INTEGER NOT NULL,
	`productAmount` INTEGER NOT NULL,
	PRIMARY KEY (`orderID`, `productID`),
	FOREIGN KEY (`orderID`) REFERENCES Orders(`orderID`),
	FOREIGN KEY (`productID`) REFERENCES Product(`productID`)
);

INSERT INTO Category (
    `categoryName`,
    `gender`
) VALUES ("Byxor", 0), ("Tröjor", 0), ("Jackor", 0), ("Underkläder", 0), ("Klänningar", 0), ("Väskor", 0), ("Byxor", 1), ("Tröjor", 1), ("Underkläder", 1), ("Jackor", 1), ("Väskor", 1);


INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Shorts", 0, 1);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Jeans", 0, 1);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Träningsbyxor", 0, 1);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Trosor", 0, 4);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("BH", 0, 4);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Nattlinnen", 0, 4);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("T-shirt", 0, 2);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Sweatshirt", 0, 2);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Cardigans", 0, 2);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Linnen", 0, 2);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Långklänningar", 0, 5);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Korta klänningar", 0, 5);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Vinterjackor", 0, 3);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Skinnjackor", 0, 3);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Övriga jackor", 0, 3);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Skinnväskor", 0, 6);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Ryggsäckar", 0, 6);

-- --

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Shorts", 1, 7);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Jeans", 1, 7);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Träningsbyxor", 1, 7);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("T-shirt", 1, 8);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Sweatshirt", 1, 8);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Cardigans", 1, 8);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Linnen", 1, 8);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Y-front", 1, 9);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Boxershort", 1, 9);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Vinterjackor", 1, 10);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Skinnjackor", 1, 10);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Övriga jackor", 1, 10);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Kostymer", 1, 10);

INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Skinnväskor", 1, 11);
INSERT INTO Category (`categoryName`, `gender`, `parentID`) VALUES ("Ryggsäckar", 1, 11);

INSERT INTO Product(
    `productManufacturer`,
    `productName`,
    `productOriginCountry`,
    `productWeight`,
    `productSize`,
    `productSellPrize`,
    `productBuyPrize`,
    `productColor`,
    `productAmount`,
    `productCategoryID`,
    `productGender`,
    `productDeleted`,
    `productImage`
) VALUES
("HM", "En fin tröja", "Sweden", 200, "M", 200, 100, "Vit", 100, 18, 0, "false", "/images/products/women/t-shirt_white.png"),
("HM", "En fin tröja", "Sweden", 200, "L", 200, 100, "Vit", 100, 18, 0, "false", "/images/products/women/t-shirt_white.png"),
("HM", "En fin tröja", "Sweden", 200, "S", 200, 100, "Vit", 100, 18, 0, "false", "/images/products/women/t-shirt_white.png"),
("Dior", "Guldtröja", "Sweden", 200, "S", 600, 400, "Guld", 100, 18, 0, "false", "/images/products/women/t-shirt_golden.jpeg"),
("Dior", "Guldtröja", "Sweden", 200, "M", 600, 400, "Guld", 100, 18, 0, "false", "/images/products/women/t-shirt_golden.jpeg"),
("Dior", "Guldtröja", "Sweden", 200, "L", 600, 400, "Guld", 100, 18, 0, "false", "/images/products/women/t-shirt_golden.jpeg"),
("HM", "En skön hoody", "Sweden", 500, "S", 449, 229, "Ljusgrå", 100, 19, 0, "false", "/images/products/women/hoody_grey.jpeg"),
("HM", "En skön hoody", "Sweden", 500, "M", 449, 229, "Ljusgrå", 100, 19, 0, "false", "/images/products/women/hoody_grey.jpeg"),
("HM", "En skön hoody", "Sweden", 500, "L", 449, 229, "Ljusgrå", 100, 19, 0, "false", "/images/products/women/hoody_grey.jpeg"),
("HM", "Cool kjol", "Sweden", 200, "S", 349, 229, "Denim", 100, 23, 0, "false", "/images/products/women/denim_skirt.jpeg"),
("HM", "Cool kjol", "Sweden", 200, "M", 349, 229, "Denim", 100, 23, 0, "false", "/images/products/women/denim_skirt.jpeg"),
("HM", "Cool kjol", "Sweden", 200, "L", 349, 229, "Denim", 100, 23, 0, "false", "/images/products/women/denim_skirt.jpeg"),
("HM", "Cool kjol", "Sweden", 200, "XL", 349, 229, "Denim", 100, 23, 0, "false", "/images/products/women/denim_skirt.jpeg"),
("HM", "Coola shorts", "Sweden", 200, "S", 349, 229, "Denim", 100, 12, 0, "false", "/images/products/women/denim_shorts.jpg"),
("HM", "Coola shorts", "Sweden", 200, "M", 349, 229, "Denim", 100, 12, 0, "false", "/images/products/women/denim_shorts.jpg"),
("HM", "Coola shorts", "Sweden", 200, "L", 349, 229, "Denim", 100, 12, 0, "false", "/images/products/women/denim_shorts.jpg"),
("HM", "Coola shorts", "Sweden", 200, "XL", 349, 229, "Denim", 100, 12, 0, "false", "/images/products/women/denim_shorts.jpg"),
("HM", "Baggy jeans", "Sweden", 600, "S", 849, 400, "Denim", 100, 13, 0, "false", "/images/products/women/baggy_jeans.jpg"),
("HM", "Baggy jeans", "Sweden", 600, "M", 849, 400, "Denim", 100, 13, 0, "false", "/images/products/women/baggy_jeans.jpg"),
("HM", "Baggy jeans", "Sweden", 600, "L", 849, 400, "Denim", 100, 13, 0, "false", "/images/products/women/baggy_jeans.jpg"),
("HM", "Baggy jeans", "Sweden", 600, "XL", 849, 400, "Denim", 100, 13, 0, "false", "/images/products/women/baggy_jeans.jpg"),
("HM", "En fin tröja", "Sweden", 200, "M", 200, 100, "Vit", 100, 32, 1, "false", "/images/products/men/t-shirt_white.png"),
("HM", "En fin tröja", "Sweden", 200, "L", 200, 100, "Vit", 100, 32, 1, "false", "/images/products/men/t-shirt_white.png"),
("HM", "En fin tröja", "Sweden", 200, "XL", 200, 100, "Vit", 100, 32, 1, "false", "/images/products/men/t-shirt_white.png"),
("HM", "En cool tröja", "Sweden", 200, "M", 229, 129, "Svart", 100, 32, 1, "false", "/images/products/men/t-shirt_black.png"),
("HM", "En cool tröja", "Sweden", 200, "L", 229, 129, "Svart", 100, 32, 1, "false", "/images/products/men/t-shirt_black.png"),
("HM", "En cool tröja", "Sweden", 200, "XL", 229, 129, "Svart", 100, 32, 1, "false", "/images/products/men/t-shirt_black.png"),
("HM", "En häftig tröja", "Sweden", 200, "L", 129, 29, "Orange", 100, 32, 1, "false", "/images/products/men/t-shirt_orange.png"),
("HM", "En häftig tröja", "Sweden", 200, "L", 129, 29, "Orange", 100, 32, 1, "false", "/images/products/men/t-shirt_orange.png"),
("HM", "En cool hoody", "Sweden", 500, "M", 329, 229, "Svart", 100, 33, 1, "false", "/images/products/men/hoody_black.png"),
("HM", "En cool hoody", "Sweden", 500, "L", 329, 229, "Svart", 100, 33, 1, "false", "/images/products/men/hoody_black.png"),
("HM", "En cool hoody", "Sweden", 500, "XL", 329, 229, "Svart", 100, 33, 1, "false", "/images/products/men/hoody_black.png"),
("HM", "Coola shorts", "Sweden", 200, "S", 349, 229, "Denim", 100, 29, 1, "false", "/images/products/men/denim_shorts.jpg"),
("HM", "Coola shorts", "Sweden", 200, "M", 349, 229, "Denim", 100, 29, 1, "false", "/images/products/men/denim_shorts.jpg"),
("HM", "Coola shorts", "Sweden", 200, "L", 349, 229, "Denim", 100, 29, 1, "false", "/images/products/men/denim_shorts.jpg"),
("HM", "Coola shorts", "Sweden", 200, "XL", 349, 229, "Denim", 100, 29, 1, "false", "/images/products/men/denim_shorts.jpg"),
("HM", "Baggy jeans", "Sweden", 600, "S", 849, 400, "Denim", 100, 30, 1, "false", "/images/products/men/baggy_jeans.jpeg"),
("HM", "Baggy jeans", "Sweden", 600, "M", 849, 400, "Denim", 100, 30, 1, "false", "/images/products/men/baggy_jeans.jpeg"),
("HM", "Baggy jeans", "Sweden", 600, "L", 849, 400, "Denim", 100, 30, 1, "false", "/images/products/men/baggy_jeans.jpeg"),
("HM", "Baggy jeans", "Sweden", 600, "XL", 849, 400, "Denim", 100, 30, 1, "false", "/images/products/men/baggy_jeans.jpeg");

INSERT INTO Role (
    `roleID`,
    `roleName`
) VALUES (0, "user"), (1, "admin"), (2, "management");

INSERT INTO User (
    `userFirstName`,
    `userSurName`,
    `userPhone`,
    `userMail`,
    `userGender`,
    `userAddress`,
    `userPostcode`,
    `userCity`,
    `userRole`,
    `userPassword`
) VALUES ("Carl", "Svensson", 123, "carl.svensson@outlook.com", 1, "Drottningsgatan 13", 37140, "Karlskrona", 0, '$2a$10$rcjXaHncfyIzGzWruiw0E.AnHRZNTKddrgpxIoVaRQBN4rY2r9avS'), 
("Admin", "Adminson", 123, "admin@admin.com", 1, "Admingatan 22", 12345, "Karlskrona", 1, '$2a$10$JwtyPdYi7OekYSRfPAY2Cuho0ebGi9mapLs/jPo7Y17SKDT6jKoBK'),
("Company", "Management", 123, "cm@cm.com", 0, "Companygatan 11", 12222, "Karlskrona", 2, "$2a$10$HqLK7VoLEwYWUSYL6dDe.erLN1fum40B8CuZGkGHakPpTMnH9HYUy");

INSERT INTO `Coupon` (
    `couponName`,
    `couponAmount`,
    `startDate`,
    `finishDate`
) VALUES ('HELG',	120, '1999-01-01 00:00:00',	'2999-01-01 00:00:00');

INSERT INTO Orders (
    `userID`,
    `couponID`
) VALUES (1, 1);

INSERT INTO OrderItem (
    `orderID`,
    `productID`,
    `productAmount`
) VALUES (1, 1, 2);

-- Stored procedures
DROP PROCEDURE IF EXISTS get_user;
DELIMITER ;;
CREATE PROCEDURE get_user(
	a_username CHAR(80)
)
BEGIN
    SELECT
		*
    FROM `User`
    WHERE
		`userMail` = a_username;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS get_user_by_id;
DELIMITER ;;
CREATE PROCEDURE get_user_by_id(
	a_userID INTEGER
)
BEGIN
    SELECT
		*
    FROM `User`
    WHERE
		`userID` = a_userID;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS create_user;
DELIMITER ;;
CREATE PROCEDURE create_user(
    `a_firstname` VARCHAR(40),
    `a_surname` VARCHAR(80),
    `a_phone` VARCHAR(40),
    `a_email` VARCHAR(80),
    `a_gender` INTEGER,
    `a_address` VARCHAR (120),
    `a_postcode` INTEGER,
    `a_city` VARCHAR(80),
	`a_userRole` INTEGER,
	`a_hashedPassword` VARCHAR(255)
)
BEGIN
    INSERT INTO User (
        userFirstName,
        userSurName,
        userPhone,
        userMail,
        userGender,
        userAddress,
        userPostcode,
        userCity,
        userRole,
        userPassword
    ) VALUES (
        a_firstname, 
        a_surname, 
        a_phone, 
        a_email,
        a_gender, 
        a_address, 
        a_postcode, 
        a_city, 
        a_userRole, 
        a_hashedPassword);
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS update_user;
DELIMITER ;;
CREATE PROCEDURE update_user(
    `a_userID` INTEGER,
    `a_firstname` VARCHAR(40),
    `a_surname` VARCHAR(80),
    `a_phone` VARCHAR(40),
    `a_email` VARCHAR(80),
    `a_gender` INTEGER,
    `a_address` VARCHAR (120),
    `a_postcode` INTEGER,
    `a_city` VARCHAR(80),
	`a_userRole` INTEGER
)
BEGIN
    UPDATE User SET
        userFirstName = a_firstname,
        userSurName = a_surname,
        userPhone = a_phone,
        userMail = a_email,
        userGender = a_gender,
        userAddress = a_address,
        userPostcode = a_postcode,
        userCity = a_city,
        userRole = a_userRole
    WHERE userID = a_userID;
END
;;
DELIMITER ;
