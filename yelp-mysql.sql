-- 1. Drop the database 'yelp' if it exists
-- 2. create the database 'yelp'
-- 3. set the current DB context to the newly created database, and then execute the DDL statements.

DROP DATABASE IF EXISTS yelp;
CREATE DATABASE yelp;
USE yelp;

-- Customer persona table structure

CREATE TABLE `customer` (
  `customer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cust_name` varchar(45) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cust_image` varchar(255) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `nick_name` varchar(45) DEFAULT NULL,
  `headline` varchar(255) DEFAULT NULL,
  `yelp_since` date DEFAULT NULL,
  `things_love` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- Restaurant persona table structure

CREATE TABLE `restaurant` (
  `restaurant_id` int unsigned NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(100) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `zip_code` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `open_time` time DEFAULT NULL,
  `close_time` time DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `restaurant_id_UNIQUE` (`restaurant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Mysqlpwd123';
flush privileges;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_customer`(
    _name VARCHAR(45),
    _email_id VARCHAR(255),
    _password VARCHAR(100)
)
BEGIN
    DECLARE p_customer_id INT;
    SELECT customer_id INTO p_customer_id FROM customer WHERE email_id = _email_id;

    IF p_customer_id IS NULL THEN
        INSERT INTO customer (cust_name, email_id, password)
        VALUES (_name, _email_id, _password);

        SELECT 'CUSTOMER_ADDED' as status;
    ELSE
        SELECT customer_id, 'CUSTOMER_EXISTS' AS status FROM customer WHERE email_id = _email_id;
    END IF;
END //

DELIMITER ;

DROP procedure IF EXISTS `get_user`;

DELIMITER $$
USE `yelp`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user`(
    p_email_id VARCHAR(100)
)
BEGIN
    IF EXISTS(SELECT customer_id FROM customer WHERE email_id = p_email_id) THEN
        SELECT customer_id, email_id, password, cust_name, city, state, country, phone_number, cust_image, headline, nick_name, 1 AS status FROM customer WHERE email_id = p_email_id;
    ELSE
        SELECT 0 AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `update_customer`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_customer`(
    _email_id VARCHAR(255),
    _cust_name VARCHAR(45),
    _password VARCHAR(100),
    _city VARCHAR(100),
    _state VARCHAR(100),
    _country VARCHAR(100),
    _nick_name VARCHAR(45),
    _headline VARCHAR(255),
    _things_love VARCHAR(255)
)
BEGIN
    DECLARE _customer_id varchar(255);
    DECLARE _exiting_password varchar(255);
    SELECT customer_id, password INTO _customer_id, _exiting_password FROM customer WHERE email_id = _email_id;
    IF _customer_id IS NOT NULL THEN
    BEGIN
        UPDATE customer
        SET cust_name  = _cust_name , email_id = _email_id, city = _city, state = _state, country = _country, nick_name = _nick_name, headline = _headline, things_love = _things_love
        WHERE customer_id = _customer_id;

        IF _password IS NOT NULL THEN
            UPDATE customer
            SET password = _password
            WHERE customer_id = _customer_id;
        END IF;
        SELECT 'CUSTOMER_UPDATED' AS status;
    END;
    ELSE
        SELECT 'NO_RECORD' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `register_restaurant`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_restaurant`(
    _restaurant_name VARCHAR(100),
    _zip_code INT,
    _email_id VARCHAR(100),
    _password VARCHAR(100)
)
BEGIN
    DECLARE p_restaurant_id INT;
    SELECT restaurant_id INTO p_restaurant_id FROM restaurant WHERE email_id = _email_id;

    IF p_restaurant_id IS NULL THEN
        INSERT INTO restaurant (restaurant_name, email_id, password, zip_code)
        VALUES (_restaurant_name, _email_id, _password, _zip_code);
        
        SELECT 'RESTAURANT_ADDED' as status;
    ELSE
        SELECT restaurant_id, 'RESTAURANT_EXISTS' AS status FROM restaurant WHERE email_id = _email_id;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_restaurant`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_restaurant`(
    p_email_id VARCHAR(100)
)
BEGIN
    IF EXISTS(SELECT restaurant_id FROM restaurant WHERE email_id = p_email_id) THEN
        SELECT restaurant_id, email_id, password, restaurant_name, zip_code, description, contact, open_time, close_time, 1 AS status FROM restaurant WHERE email_id = p_email_id;
    ELSE
        SELECT 0 AS status;
    END IF;
END

DELIMITER ;

DROP procedure IF EXISTS `get_restaurant_byId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_restaurant_byId`(
    p_id INT
)
BEGIN
    IF EXISTS(SELECT restaurant_id FROM restaurant WHERE restaurant_id = p_id) THEN
        SELECT restaurant_id, email_id, password, restaurant_name, zip_code, description, contact, open_time, close_time, 1 AS status FROM restaurant WHERE restaurant_id = p_id;
    ELSE
        SELECT 0 AS status;
    END IF;
END

DELIMITER ;

DROP procedure IF EXISTS `update_restaurant`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_restaurant`(
    _restaurant_id VARCHAR(255),
    _restaurant_name VARCHAR(45),
    _password VARCHAR(100),
    _zip_code INT,
    _contact VARCHAR(100),
    _description VARCHAR(100),
    _open_time TIME,
    _close_time TIME
)
BEGIN
    DECLARE _exiting_password varchar(255);
    IF EXISTS(SELECT restaurant_id FROM restaurant WHERE restaurant_id = _restaurant_id) THEN
        SELECT password INTO _exiting_password FROM restaurant WHERE restaurant_id = _restaurant_id;
        BEGIN
            UPDATE restaurant
            SET restaurant_name  = _restaurant_name , contact= _contact, zip_code = _zip_code, description = _description, open_time = _open_time, close_time = _close_time
            WHERE restaurant_id = _restaurant_id;

            IF _password IS NOT NULL THEN
                UPDATE restaurant
                SET password = _password
                WHERE restaurant_id = _restaurant_id;
            END IF;
            SELECT 'RESTAURANT_UPDATED' AS status;
        END;
    ELSE
        SELECT 'NO_RECORD' AS status;
    END IF;
END

DELIMITER ;
