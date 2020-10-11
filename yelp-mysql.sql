CREATE DATABASE  IF NOT EXISTS `yelp` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yelp`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: yelp
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cust_name` varchar(45) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cust_image` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `nick_name` varchar(45) DEFAULT NULL,
  `headline` varchar(255) DEFAULT NULL,
  `yelp_since` date DEFAULT NULL,
  `things_love` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `find_me` varchar(255) DEFAULT NULL,
  `blog_website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Sweekrut Joshi','a@b.com','$2b$12$lLqYtONda6lFcNosIxqY5uCC15yMhzgns4lm9bmEicvmBKqVxVWyS','undefined','null','customer1-1602366506156.jpeg','2020-09-02','sweek','headline1','2020-09-29','undefined','Santa Clara','undefined','USA','undefined','undefined'),(7,'John Smit','johnsmit@abc.com','$2b$12$iJuJhHLuvTbBh6.KG8jv3uqWT3CfSraaICHHwndx77zbtbuDp3vc.',NULL,'San Jose',NULL,NULL,'jon','head1',NULL,'shravya','San Jose','CA','USA',NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `event_id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_description` varchar(255) DEFAULT NULL,
  `event_time` time NOT NULL,
  `event_date` date NOT NULL,
  `event_hashtag` varchar(255) DEFAULT NULL,
  `event_location` varchar(255) NOT NULL,
  `restaurant_id` int unsigned NOT NULL,
  `event_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `event_id_UNIQUE` (`event_id`),
  KEY `restaurant_id_idx` (`restaurant_id`),
  CONSTRAINT `restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Dandia Night','Come enjoy Dussehra night with us. Food and Drinks included!','19:00:00','2020-10-20','#dandia #swagath','San Jose',1,NULL),(2,'Karaoke Night','Come sing to your favourite bollywood songs.','18:00:00','2020-10-05','#sing #karaoke #bollywood #swagath','San Jose',1,'event1-karaoke.jpg'),(4,'Weekend Buffet','Enjoy special Indian buffet with 50 items','20:30:00','2020-10-18','#foodie','San Jose',1,NULL),(6,'Pizza Secret Sauce','Learn to make The Hub  special pizza and other surprise dishes','19:00:00','2020-10-30','#italian #pizza #cook #hub','The Hub San Jose',3,NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_registration`
--

DROP TABLE IF EXISTS `event_registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_registration`
--

LOCK TABLES `event_registration` WRITE;
/*!40000 ALTER TABLE `event_registration` DISABLE KEYS */;
INSERT INTO `event_registration` VALUES (1,2,1,1),(2,4,1,1),(3,2,7,1),(13,4,7,1);
/*!40000 ALTER TABLE `event_registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_category`
--

DROP TABLE IF EXISTS `menu_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `menu_category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `restaurant_id` int unsigned NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_category`
--

LOCK TABLES `menu_category` WRITE;
/*!40000 ALTER TABLE `menu_category` DISABLE KEYS */;
INSERT INTO `menu_category` VALUES (1,'Appetizer',1),(2,'Main Course',1),(3,'Dessert',1),(4,'Kids',1),(5,'Fast food',3);
/*!40000 ALTER TABLE `menu_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,'Dosa',10,'Crispy crepe with potato filling',1,1,'item1602367841712.jpg','Urad dal, potato, coconut'),(2,'Idly',10,'Soft rice dumplings',1,1,'null','Rice powder'),(3,'Meals',15,'Enjoy 7 different south indian dishes',1,2,NULL,NULL),(4,'Ice Cream',10,'In house ice cream',1,3,NULL,NULL),(5,'Mini idly',7,'Small Idly for kids',1,4,NULL,NULL),(6,'Cheese Pizza',10,'Italian style wood fire pizza',3,5,NULL,NULL),(7,'Burger',12,'Ham burger',3,5,NULL,NULL),(9,'Vada',10,'Crispy and spice fried donut',1,1,'null','Urad dal batter'),(10,'Falooda',7,'Semiga',1,3,'undefined','Tuti Fruti'),(11,'Manglore Fish curry meals',12,'Fresh fish curry with rice and papad',1,2,'undefined','Fish and rice');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (24,'2020-10-07',1,1,'Delivery','New Order','Order Received',0),(25,'2020-10-07',1,1,'Delivery','New Order','Order Received',0),(26,'2020-10-08',1,1,'Delivery','Delivered Order','Delivered',30),(27,'2020-10-08',1,1,'Delivery','NewOrder','Preparing',7),(28,'2020-10-08',1,1,'Pickup','Delivered Order','Pick up ready',7),(29,'2020-10-08',1,1,'Delivery','New Order','Delivered',7);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (17,24,2,1),(18,25,1,1),(19,26,1,2),(20,26,2,1),(21,27,5,1),(22,28,10,1),(23,29,5,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
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
  `cuisine` varchar(255) DEFAULT NULL,
  `curbside_pickup` tinyint DEFAULT '0',
  `dine_in` tinyint DEFAULT '0',
  `yelp_delivery` tinyint DEFAULT '0',
  `restaurant_image` varchar(255) DEFAULT NULL,
  `lat` double DEFAULT '0',
  `lng` double DEFAULT '0',
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `restaurant_id_UNIQUE` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'Swagath','abc@xyz.com','$2b$12$FXQ3kImHbvxiDAgDVwrpauOI1OetN9pKs6hrD0ukwvqe7/OCeVV5u',95127,'Come enjoy authentic south Indian delicacies','Ph: 123-445-1233',NULL,NULL,'Indian',1,1,0,'restaurant1-1602366413674.jpg',37.373498,-121.7594384),(3,'The Hub','hub@hub.com','$2b$12$nNe7BM8a/d5cbcCXlPqZXO6nkll1lVR4V.sxE/xf4epW26Kiz0opS',95051,'Home of delicious Italian cuisine ','Ph: 704-883-9753',NULL,NULL,'Italian',0,1,1,NULL,37.3598283,-121.9814354),(15,'Pizza place','pizza@pizza.com','$2b$12$x2O3kYX.sCIQ6tZwaOD0tOANTjE.rAWBTYSwY/8vEFw4chZ7TBlNa',95050,NULL,NULL,NULL,NULL,'Pizza',0,0,1,NULL,37.3539663,-121.9529992);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_id` int unsigned NOT NULL AUTO_INCREMENT,
  `review_text` varchar(16000) NOT NULL,
  `review_date` date NOT NULL,
  `review_rating` int unsigned DEFAULT NULL,
  `customer_id` int unsigned NOT NULL,
  `restaurant_id` int unsigned NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id_UNIQUE` (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,'good restaurant','2020-10-07',4,1,1);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'yelp'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_order_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_review` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_event` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_events` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_events`()
BEGIN
	IF EXISTS (SELECT event_id FROM event) THEN
		SELECT event_id, event_image, event_name, event_description, event_time, event_date, event_location, event_hashtag, restaurant_id
		FROM event
		ORDER BY event_date, event_name;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_event_by_name` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_event_by_name`(
	p_event_name VARCHAR(255)
)
BEGIN
	DECLARE p_search_str_reg VARCHAR(255);
    SET p_search_str_reg = CONCAT('%', p_event_name, '%');
    
    IF EXISTS(SELECT event_id FROM event WHERE event_name LIKE p_search_str_reg) THEN
		SELECT event_id, event_image, event_name, event_description, event_time, event_date, event_location, event_hashtag, restaurant_id
		FROM event
		WHERE event_name LIKE p_search_str_reg
		ORDER BY event_date;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_event_by_resId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_event_by_resId`(
	p_restaurant_id INT
)
BEGIN
    IF EXISTS(SELECT event_id FROM event WHERE restaurant_id = p_restaurant_id) THEN
		SELECT event_id, event_image, event_name, event_description, event_time, event_date, event_location, event_hashtag, restaurant_id
		FROM event
		WHERE restaurant_id = p_restaurant_id
		ORDER BY event_date;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_hasReviewed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_hasReviewed`(
	p_customer_id INT,
    p_restaurant_id INT
)
BEGIN
	IF EXISTS (SELECT review_id FROM review WHERE customer_id = p_customer_id AND restaurant_id = p_restaurant_id) THEN
		SELECT "REVIEWED" AS result;
    ELSE
		SELECT 'NO_RECORD' AS result;
    END IF;
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_isRegistered` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_items_by_resId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_items_by_resId`(
	    p_restaurant_id INT
)
BEGIN
    SELECT i.item_id, i.item_name, i.item_description, i.item_ingredients, i.item_price, i.item_image, c.category_id, c.category_name, c.restaurant_id
    FROM menu_items i
	LEFT OUTER JOIN menu_category c
    ON i.menu_category_id = c.category_id
    WHERE i.restaurant_id = p_restaurant_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_menu_categories_by_resId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_menu_category_byId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orders_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_orders_customer`(
    p_customer_id INT
)
BEGIN
	IF EXISTS (SELECT * FROM `order` WHERE customer_id = p_customer_id) THEN
	SELECT 
        o.order_id, o.restaurant_id, o.order_status, DATE_FORMAT(o.order_date, "%b %d, %Y") as order_date, o.order_cost, o.order_delivery_status, o.order_type, r.restaurant_name, r.zip_code, c.customer_id, c.cust_name, c.phone_number, c.city
	FROM `order` o, restaurant r, customer c
    WHERE o.customer_id = p_customer_id
    AND o.restaurant_id = r.restaurant_id
    AND o.customer_id = c.customer_id
    ORDER BY o.order_date DESC;
	ELSE
    SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orders_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_orders_items`(
    p_order_id INT
)
BEGIN
	IF EXISTS (SELECT * FROM order_items WHERE order_id = p_order_id) THEN
	SELECT 
        o.order_id, o.item_id, o.item_quantity, i.item_name, i.item_price, i.item_description
	FROM order_items o, menu_items i
    WHERE o.order_id = p_order_id
    AND i.item_id = o.item_id;
	ELSE
    SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orders_restaurant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_orders_restaurant`(
    p_restaurant_id INT
)
BEGIN
	IF EXISTS (SELECT * FROM `order` WHERE restaurant_id = p_restaurant_id) THEN
	SELECT 
        o.order_id, o.restaurant_id, o.order_status, DATE_FORMAT(o.order_date, "%b %d, %Y") as order_date, o.order_cost, o.order_delivery_status, o.order_type, r.restaurant_name, r.restaurant_image, r.zip_code, c.customer_id, c.cust_name, c.phone_number, c.city
	FROM `order` o, restaurant r, customer c
    WHERE o.restaurant_id = p_restaurant_id
    AND o.restaurant_id = r.restaurant_id
    AND o.customer_id = c.customer_id
    ORDER BY o.order_date DESC;
	ELSE
    SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_registered_customers_by_eventId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_registered_events_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_restaurant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_restaurant`(
	p_email_id VARCHAR(100)
)
BEGIN
	IF EXISTS(SELECT restaurant_id FROM restaurant WHERE email_id = p_email_id) THEN
		SELECT restaurant_id, restaurant_image, email_id, password, restaurant_name, zip_code, description, contact, open_time, close_time, 1 AS status FROM restaurant WHERE email_id = p_email_id;
	ELSE
		SELECT 0 AS status;
	END IF;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_restaurant_byId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_restaurant_byId`(
	p_id INT
)
BEGIN
	IF EXISTS(SELECT restaurant_id FROM restaurant WHERE restaurant_id = p_id) THEN
		SELECT restaurant_id, restaurant_image, email_id, password, restaurant_name, zip_code, description, contact, open_time, close_time, cuisine, curbside_pickup, dine_in, yelp_delivery, 1 AS status FROM restaurant WHERE restaurant_id = p_id;
	ELSE
		SELECT 0 AS status;
	END IF;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_reviews` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_reviews`(
    p_restaurant_id INT
)
BEGIN
    IF EXISTS(SELECT review_id FROM review
    WHERE restaurant_id = p_restaurant_id) THEN
    BEGIN
		SELECT r.review_text, r.review_date, r.review_rating, r.customer_id, r.restaurant_id, res.restaurant_name, res.restaurant_image, c.cust_name
        FROM review r, restaurant res, customer c
        WHERE r.restaurant_id = p_restaurant_id
        AND r.restaurant_id = res.restaurant_id
        AND r.customer_id = c.customer_id;
	END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user`(
	p_email_id VARCHAR(100)
)
BEGIN
	IF EXISTS(SELECT customer_id FROM customer WHERE email_id = p_email_id) THEN
		SELECT customer_id, email_id, password, cust_name, city, state, country, phone_number, cust_image, headline, nick_name, DATE_FORMAT(yelp_since, "%Y-%m-%d") as yelp_since, find_me, blog_website, DATE_FORMAT(dob, "%Y-%m-%d") as dob, 1 AS status FROM customer WHERE email_id = p_email_id;
	ELSE
		SELECT 0 AS status;
	END IF;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user_byId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_byId`(
	p_id INT
)
BEGIN
	IF EXISTS(SELECT customer_id FROM customer WHERE customer_id = p_id) THEN
		SELECT customer_id, email_id, password, cust_name, city, state, country, phone_number, cust_image, headline, nick_name, 1 AS status FROM customer WHERE customer_id = p_id;
	ELSE
		SELECT 0 AS status;
	END IF;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register_restaurant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_restaurant`(
	_restaurant_name VARCHAR(100),
	_zip_code INT,
	_email_id VARCHAR(100),
    _password VARCHAR(100),
    _lat DOUBLE,
    _lng DOUBLE
    
)
BEGIN
	DECLARE p_restaurant_id INT;
	SELECT restaurant_id INTO p_restaurant_id FROM restaurant WHERE email_id = _email_id;

	IF p_restaurant_id IS NULL THEN
		INSERT INTO restaurant (restaurant_name, email_id, password, zip_code, lat, lng)
		VALUES (_restaurant_name, _email_id, _password, _zip_code, _lat, _lng);
        
        SELECT 'RESTAURANT_ADDED' as status;
    ELSE
		SELECT restaurant_id, 'RESTAURANT_EXISTS' AS status FROM restaurant WHERE email_id = _email_id;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register_to_event` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_restaurants` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
    restaurant_id, restaurant_image, restaurant_name, zip_code, description, contact, open_time, close_time, cuisine, curbside_pickup, dine_in, yelp_delivery, lat, lng
	FROM restaurant
    WHERE restaurant_name LIKE p_search_str_reg
    OR cuisine LIKE p_search_str_reg
    OR description LIKE p_search_str_reg;
    ELSE
    SELECT 'NO_RECORD' AS result;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_customer`(
	_email_id VARCHAR(255),
    _cust_name VARCHAR(45),
    _password VARCHAR(100),
    _city VARCHAR(100),
    _state VARCHAR(100),
    _country VARCHAR(100),
    _nick_name VARCHAR(45),
    _headline VARCHAR(255),
    _yelp_since DATE,
    _dob DATE,
    _things_love VARCHAR(255),
    _find_me VARCHAR(255),
    _blog_website VARCHAR(255),
    _phone_number VARCHAR(15)
)
BEGIN
	DECLARE _customer_id varchar(255);
    DECLARE _exiting_password varchar(255);
	SELECT customer_id, password INTO _customer_id, _exiting_password FROM customer WHERE email_id = _email_id;
    IF _customer_id IS NOT NULL THEN
    BEGIN
		UPDATE customer
		SET cust_name  = _cust_name , email_id = _email_id, city = _city, state = _state, country = _country, nick_name = _nick_name, headline = _headline, things_love = _things_love,
        yelp_since = _yelp_since, dob = _dob, find_me = _find_me, blog_website = _blog_website, phone_number = _phone_number
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_delivery_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_delivery_status`(
	p_order_id INT,
    p_order_delivery_status VARCHAR(255)
)
BEGIN
	IF EXISTS(SELECT order_id FROM `order` WHERE order_id = p_order_id) THEN
		BEGIN
			UPDATE `order`
			SET order_delivery_status  = p_order_delivery_status
			WHERE order_id = p_order_id;
            
			SELECT 'UPDATED' AS status;
		END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_get_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_order_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_order_status`(
	p_order_id INT,
    p_order_status VARCHAR(255)
)
BEGIN
	IF EXISTS(SELECT order_id FROM `order` WHERE order_id = p_order_id) THEN
		BEGIN
			UPDATE `order`
			SET order_status  = p_order_status
			WHERE order_id = p_order_id;
            
			SELECT 'UPDATED' AS status;
		END;
    ELSE
		SELECT 'NO_RECORD' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_restaurant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-11 14:39:11
