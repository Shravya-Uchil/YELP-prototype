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
        
        SELECT 'USER_ADDED' as status;
    ELSE
		SELECT customer_id, 'USER_EXISTS' AS status FROM customer WHERE email_id = _email_id;
    END IF;
END //

DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user`(
	p_email_id VARCHAR(100)
)
BEGIN
	IF EXISTS(SELECT customer_id FROM customer WHERE email_id = p_email_id) THEN
		SELECT customer_id, email_id, password, cust_name, address, phone_number, cust_image, 1 AS status FROM customer WHERE email_id = p_email_id;
	ELSE
		SELECT 0 AS status;
	END IF;        
END //

DELIMITER ;
