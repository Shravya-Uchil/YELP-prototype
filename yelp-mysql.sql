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

CREATE TABLE `event_registration` (
   `event_reg_id` int unsigned NOT NULL AUTO_INCREMENT,
   `event_id` int unsigned NOT NULL,
   `customer_id` int unsigned NOT NULL,
   `restaurant_id` int unsigned NOT NULL,
   PRIMARY KEY (`event_reg_id`),
   UNIQUE KEY `event_id_UNIQUE` (`event_reg_id`),
   KEY `event_id_idx` (`event_id`),
   KEY `customer_id_idx` (`customer_id`),
   CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
   CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `menu_category` (
   `category_id` int unsigned NOT NULL AUTO_INCREMENT,
   `category_name` varchar(255) NOT NULL,
   `restaurant_id` int unsigned NOT NULL,
   PRIMARY KEY (`category_id`),
   UNIQUE KEY `category_id_UNIQUE` (`category_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `menu_items` (
   `item_id` int unsigned NOT NULL AUTO_INCREMENT,
   `item_name` varchar(255) NOT NULL,
   `item_price` int unsigned NOT NULL,
   `item_description` varchar(255) DEFAULT NULL,
   `restaurant_id` int unsigned NOT NULL,
   `menu_category_id` int unsigned DEFAULT NULL,
   `item_image` varchar(255) DEFAULT NULL,
   `item_ingredients` varchar(255) DEFAULT NULL,
   PRIMARY KEY (`item_id`),
   UNIQUE KEY `item_id_UNIQUE` (`item_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `order` (
   `order_id` int unsigned NOT NULL AUTO_INCREMENT,
   `order_date` date NOT NULL,
   `customer_id` int unsigned NOT NULL,
   `restaurant_id` int unsigned NOT NULL,
   `order_type` varchar(255) NOT NULL,
   `order_status` varchar(255) NOT NULL,
   `order_delivery_status` varchar(255) NOT NULL,
   `order_cost` int unsigned DEFAULT NULL,
   PRIMARY KEY (`order_id`),
   UNIQUE KEY `order_id_UNIQUE` (`order_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `order_items` (
   `order_items_id` int unsigned NOT NULL AUTO_INCREMENT,
   `order_id` int unsigned NOT NULL,
   `item_id` int unsigned NOT NULL,
   `item_quantity` int unsigned NOT NULL,
   PRIMARY KEY (`order_items_id`),
   UNIQUE KEY `order_items_id_UNIQUE` (`order_items_id`),
   KEY `order_id_idx` (`order_id`),
   KEY `item_id_idx` (`item_id`),
   CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`item_id`),
   CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `review` (
   `review_id` int unsigned NOT NULL AUTO_INCREMENT,
   `review_text` varchar(16000) NOT NULL,
   `review_date` date NOT NULL,
   `review_rating` int unsigned DEFAULT NULL,
   `customer_id` int unsigned NOT NULL,
   `restaurant_id` int unsigned NOT NULL,
   PRIMARY KEY (`review_id`),
   UNIQUE KEY `review_id_UNIQUE` (`review_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `event` (
   `event_id` int unsigned NOT NULL AUTO_INCREMENT,
   `event_name` varchar(255) NOT NULL,
   `event_description` varchar(255) DEFAULT NULL,
   `event_time` time NOT NULL,
   `event_date` date NOT NULL,
   `event_hashtag` varchar(255) DEFAULT NULL,
   `event_location` varchar(255) NOT NULL,
   `restaurant_id` int unsigned NOT NULL,
   PRIMARY KEY (`event_id`),
   UNIQUE KEY `event_id_UNIQUE` (`event_id`),
   KEY `restaurant_id_idx` (`restaurant_id`),
   CONSTRAINT `restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

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
    _cuisine VARCHAR(255),
    _curbside_pickup BOOLEAN,
    _dine_in BOOLEAN,
    _yelp_delivery BOOLEAN,
	_email_id VARCHAR(100),
    _password VARCHAR(100)
)
BEGIN
	DECLARE p_restaurant_id INT;
	SELECT restaurant_id INTO p_restaurant_id FROM restaurant WHERE email_id = _email_id;

	IF p_restaurant_id IS NULL THEN
		INSERT INTO restaurant (restaurant_name, email_id, password, zip_code, cuisine, curbside_pickup, dine_in, yelp_delivery)
		VALUES (_restaurant_name, _email_id, _password, _zip_code, _cuisine, _curbside_pickup, _dine_in, _yelp_delivery);
        
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
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_restaurant_byId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_restaurant_byId`(
	p_id INT
)
BEGIN
	IF EXISTS(SELECT restaurant_id FROM restaurant WHERE restaurant_id = p_id) THEN
		SELECT restaurant_id, email_id, password, restaurant_name, zip_code, description, contact, open_time, close_time, cuisine, curbside_pickup, dine_in, yelp_delivery, 1 AS status FROM restaurant WHERE restaurant_id = p_id;
	ELSE
		SELECT 0 AS status;
	END IF;        
END$$

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
    _close_time TIME,
    _cuisine VARCHAR(255),
    _curbside_pickup BOOLEAN,
    _dine_in BOOLEAN,
    _yelp_delivery BOOLEAN
)
BEGIN
    DECLARE _exiting_password varchar(255);
    IF EXISTS(SELECT restaurant_id FROM restaurant WHERE restaurant_id = _restaurant_id) THEN
		SELECT password INTO _exiting_password FROM restaurant WHERE restaurant_id = _restaurant_id;
		BEGIN
			UPDATE restaurant
			SET restaurant_name  = _restaurant_name , contact= _contact, zip_code = _zip_code, description = _description, open_time = _open_time, close_time = _close_time, cuisine = _cuisine, curbside_pickup = _curbside_pickup, dine_in = _dine_in, yelp_delivery = _yelp_delivery
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
END$$

DELIMITER ;

DROP procedure IF EXISTS `search_restaurants`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_restaurants`(
	p_search_str VARCHAR(255)
)
BEGIN
	DECLARE p_search_str_reg VARCHAR(255);
    SET p_search_str_reg = CONCAT('%', p_search_str, '%');
    
    IF EXISTS(SELECT 
        restaurant_id
	FROM restaurant
    WHERE restaurant_name LIKE p_search_str_reg
    OR cuisine LIKE p_search_str_reg
    OR description LIKE p_search_str_reg) THEN

	SELECT DISTINCT 
    restaurant_id, restaurant_name, zip_code, description, contact, open_time, close_time, cuisine, curbside_pickup, dine_in, yelp_delivery
	FROM restaurant
    WHERE restaurant_name LIKE p_search_str_reg
    OR cuisine LIKE p_search_str_reg
    OR description LIKE p_search_str_reg;
    ELSE
    SELECT 'NO_RECORD' AS result;
    END IF;
END$$

DELIMITER ;



DROP procedure IF EXISTS `add_order`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_order`(
	p_customer_id INT,
    p_restaurant_id INT,
    p_order_status VARCHAR(255),
    p_order_cost INT,
    p_order_type VARCHAR(255),
    p_order_delivery_status VARCHAR(255)
)
BEGIN
    DECLARE p_today DATE;
    DECLARE p_order_id INT;
    SELECT curdate() INTO p_today;
    IF (p_restaurant_id IS NOT NULL) THEN
    BEGIN
		INSERT INTO `order` (customer_id, restaurant_id, order_status, order_cost, order_type, order_delivery_status, order_date)
        VALUES(p_customer_id, p_restaurant_id, p_order_status, p_order_cost, p_order_type, p_order_delivery_status, curdate());
		
		SELECT LAST_INSERT_ID() AS order_id, 'ORDER_PLACED' AS status;
    END;
    ELSE
		SELECT 'ORDER_ERROR' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `add_order_items`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_order_items`(
	p_order_id INT,
    p_item_id INT,
    p_item_quantity INT
)
BEGIN
	IF NOT EXISTS(SELECT * FROM order_items WHERE order_id = p_order_id AND item_id = p_item_id) THEN
    BEGIN
		INSERT INTO order_items(order_id, item_id, item_quantity)
        VALUES(p_order_id, p_item_id, p_item_quantity);
        
	END;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `add_review`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_review`(
	p_review_text VARCHAR(16000),
    p_review_rating INT,
    p_restaurant_id INT,
    p_customer_id INT
)
BEGIN
    IF NOT EXISTS(SELECT review_id FROM review
    WHERE customer_id = p_customer_id AND restaurant_id = p_restaurant_id) THEN
    BEGIN
		INSERT INTO review (review_text, review_date, review_rating, customer_id, restaurant_id)
		VALUES(p_review_text, curdate(), p_review_rating, p_customer_id, p_restaurant_id);
        
        SELECT 'REVIEW_ADDED' AS status;
	END;
    ELSE
		SELECT 'REVIEW_EXISTS' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `create_event`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_event`(
	p_event_name VARCHAR(255),
    p_event_description VARCHAR(255),
    p_event_time TIME,
    p_event_date DATE,
    p_event_location VARCHAR(255),
    p_event_hashtag VARCHAR(255),
    p_restaurant_id INT
)
BEGIN
    IF NOT EXISTS(SELECT event_id FROM event
    WHERE event_name = p_event_name AND event_date = p_event_date AND event_time = p_event_time AND event_location = p_event_location) THEN
    BEGIN
		INSERT INTO event (event_name, event_description, event_time, event_date, event_location, event_hashtag, restaurant_id)
		VALUES(p_event_name, p_event_description, p_event_time, p_event_date, p_event_location, p_event_hashtag, p_restaurant_id);
        
        SELECT 'EVENT_ADDED' AS status;
	END;
    ELSE
		SELECT 'EVENT_EXISTS' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_all_events`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_events`()
BEGIN
	IF EXISTS (SELECT event_id FROM event) THEN
		SELECT event_id, event_name, event_description, event_time, event_date, event_location, event_hashtag, restaurant_id
		FROM event
		ORDER BY event_date, event_name;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_event_by_name`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_event_by_name`(
	p_event_name VARCHAR(255)
)
BEGIN
	DECLARE p_search_str_reg VARCHAR(255);
    SET p_search_str_reg = CONCAT('%', p_event_name, '%');
    
    IF EXISTS(SELECT event_id FROM event WHERE event_name LIKE p_search_str_reg) THEN
		SELECT event_id, event_name, event_description, event_time, event_date, event_location, event_hashtag, restaurant_id
		FROM event
		WHERE event_name LIKE p_search_str_reg
		ORDER BY event_date;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_event_by_resId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_event_by_resId`(
	p_restaurant_id INT
)
BEGIN
    IF EXISTS(SELECT event_id FROM event WHERE restaurant_id = p_restaurant_id) THEN
		SELECT event_id, event_name, event_description, event_time, event_date, event_location, event_hashtag, restaurant_id
		FROM event
		WHERE restaurant_id = p_restaurant_id
		ORDER BY event_date;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_isRegistered`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_isRegistered`(
	p_customer_id INT,
    p_event_id INT
)
BEGIN
	IF EXISTS (SELECT event_reg_id FROM event_registration WHERE customer_id = p_customer_id AND event_id = p_event_id) THEN
		SELECT "REGISTERED" AS result;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;   
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_items_by_resId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_items_by_resId`(
	    p_restaurant_id INT
)
BEGIN
    SELECT i.item_id, i.item_name, i.item_description, i.item_ingredients, i.item_price, i.item_image, c.category_id, c.category_name, c.restaurant_id
    FROM menu_items i
	LEFT OUTER JOIN menu_category c
    ON i.menu_category_id = c.category_id
    WHERE i.restaurant_id = p_restaurant_id;
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_menu_categories_by_resId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_menu_categories_by_resId`(
    p_restaurant_id INT
)
BEGIN
    IF EXISTS(SELECT * FROM menu_category WHERE restaurant_id = p_restaurant_id) THEN
    BEGIN
		SELECT category_id, category_name FROM menu_category WHERE restaurant_id = p_restaurant_id;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_menu_category_byId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_menu_category_byId`(
    p_category_id INT
)
BEGIN
    IF EXISTS(SELECT * FROM menu_category WHERE category_id = p_category_id) THEN
    BEGIN
		SELECT category_id, category_name FROM menu_category WHERE category_id = p_category_id;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_orders_customer`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_orders_customer`(
    p_customer_id INT
)
BEGIN
	IF EXISTS (SELECT * FROM `order` WHERE customer_id = p_customer_id) THEN
	SELECT 
        o.order_id, o.restaurant_id, o.order_status, DATE_FORMAT(o.order_date, "%b %d, %Y") as order_date, o.order_cost, o.order_delivery_status, r.restaurant_name, r.zip_code
	FROM `order` o, restaurant r
    WHERE o.customer_id = p_customer_id
    AND o.restaurant_id = r.restaurant_id
    ORDER BY o.order_date DESC;
	ELSE
    SELECT 'NO_RECORD' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_registered_customers_by_eventId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_registered_customers_by_eventId`(
	p_event_id INT
)
BEGIN
	IF EXISTS (SELECT event_reg_id FROM event_registration WHERE event_id = p_event_id) THEN
		SELECT r.event_reg_id, r.event_id, r.restaurant_id, r.customer_id, c.cust_name, c.cust_image
        FROM event_registration r, customer c
        WHERE r.event_id = p_event_id
        AND r.customer_id = c.customer_id;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_registered_events_customer`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_registered_events_customer`(
	p_customer_id INT
)
BEGIN
	IF EXISTS (SELECT event_reg_id FROM event_registration WHERE customer_id = p_customer_id) THEN
		SELECT r.event_reg_id, r.event_id, r.restaurant_id, r.customer_id, e.event_name, e.event_description
        FROM event_registration r, event e
        WHERE r.customer_id = p_customer_id
        AND r.event_id = e.event_id;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_reviews`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_reviews`(
    p_restaurant_id INT
)
BEGIN
    IF EXISTS(SELECT review_id FROM review
    WHERE restaurant_id = p_restaurant_id) THEN
    BEGIN
		SELECT r.review_text, r.review_date, r.review_rating, r.customer_id, r.restaurant_id, res.restaurant_name, c.cust_name
        FROM review r, restaurant res, customer c
        WHERE r.restaurant_id = p_restaurant_id
        AND r.restaurant_id = res.restaurant_id
        AND r.customer_id = c.customer_id;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `get_user_byId`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_byId`(
	p_id INT
)
BEGIN
	IF EXISTS(SELECT customer_id FROM customer WHERE customer_id = p_id) THEN
		SELECT customer_id, email_id, password, cust_name, city, state, country, phone_number, cust_image, headline, nick_name, 1 AS status FROM customer WHERE customer_id = p_id;
	ELSE
		SELECT 0 AS status;
	END IF;        
END$$

DELIMITER ;

DROP procedure IF EXISTS `register_to_event`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_to_event`(
	p_event_id INT,
    p_restaurant_id INT,
    p_customer_id INT
)
BEGIN
    IF NOT EXISTS(SELECT event_id FROM event_registration
    WHERE event_id = p_event_id AND restaurant_id = p_restaurant_id AND customer_id = p_customer_id) THEN
    BEGIN
		INSERT INTO event_registration (event_id, restaurant_id, customer_id)
		VALUES(p_event_id, p_restaurant_id, p_customer_id);
        SELECT 'REGISTERED' AS status;
	END;
    ELSE
		SELECT 'REGISTRATION_EXISTS' AS status;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `update_get_category`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_get_category`(
	p_category_name VARCHAR(255),
    p_restaurant_id INT
)
BEGIN
	IF NOT EXISTS(SELECT category_id FROM menu_category
    WHERE category_name = p_category_name AND restaurant_id = p_restaurant_id) THEN
    BEGIN
		INSERT INTO menu_category (category_name, restaurant_id)
		VALUES(p_category_name, p_restaurant_id);
        
        SELECT category_id, 'CATEGORY_ADDED' as status FROM menu_category
		WHERE category_name = p_category_name AND restaurant_id = p_restaurant_id;
	END;
    ELSE
		SELECT category_id, 'CATEGORY_EXISTS' as status FROM menu_category
		WHERE category_name = p_category_name AND restaurant_id = p_restaurant_id;
    END IF;
END$$

DELIMITER ;

DROP procedure IF EXISTS `update_item`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_item`(
	p_item_id INT,
	p_item_name VARCHAR(255),
    p_item_description VARCHAR(255),
    p_item_ingredients VARCHAR(255),
    p_item_price INT,
    p_restaurant_id INT,
    p_menu_category_id INT,
    p_item_image VARCHAR(255)
)
BEGIN
	IF (p_item_id = 0) THEN
    BEGIN
		INSERT INTO menu_items (item_name, item_description, item_ingredients, item_price, restaurant_id, menu_category_id, item_image) 
        VALUES (p_item_name, p_item_description, p_item_ingredients, p_item_price, p_restaurant_id, p_menu_category_id, p_item_image);
        SELECT 'ITEM_ADDED' AS status;
	END;
    ELSE
    BEGIN
		IF EXISTS (SELECT item_id FROM menu_items
		WHERE item_id = p_item_id ) THEN
		BEGIN
			UPDATE menu_items 
			SET item_name = p_item_name, item_description = p_item_description, item_ingredients = p_item_ingredients, 
			item_price = p_item_price, restaurant_id = p_restaurant_id, menu_category_id = p_menu_category_id, item_image = p_item_image
			WHERE item_id = p_item_id;
			SELECT 'ITEM_UPDATED' AS status;
		END;
        ELSE
			SELECT 'NO_RECORD' AS status;
		END IF;
	END;
    END IF;
END$$

DELIMITER ;
