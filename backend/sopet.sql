-- MySQL dump 10.13  Distrib 8.0.27, for macos11.6 (arm64)
--
-- Host: localhost    Database: sopet
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `admin_id` varchar(3) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Chatroom`
--

DROP TABLE IF EXISTS `Chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Chatroom` (
  `chatroom_id` varchar(30) NOT NULL,
  PRIMARY KEY (`chatroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chatroom`
--

LOCK TABLES `Chatroom` WRITE;
/*!40000 ALTER TABLE `Chatroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `Chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Client` (
  `client_id` varchar(10) NOT NULL,
  `firstname_th` varchar(50) DEFAULT NULL,
  `lastname_th` varchar(50) DEFAULT NULL,
  `firstname_en` varchar(50) DEFAULT NULL,
  `lastname_en` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `profile_picture_url` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES ('0000000000','ณภัทร','ชีถนอม','Napat','Cheetanom','napatchee01@gmail.com','hashedTest','0830171663','Address01','https://scontent.fbkk9-3.fna.fbcdn.net/v/t1.6435-9/136741436_2789656357956376_2614371051396205242_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGA6X7nO9KCOX0VOmiNaaTxb2SKSamfTvRvZIpJqZ9O9CBSkAd_xyYftglzGr_kzCEbYln8Xse9XgX1QZWk6B8j&_nc_ohc=h7p5ZrVeBpUAX9VXgnl&_nc_oc=AQm246SIKO-wJm11S7Qm17N3pZJDgNNDBTibFt0DrewQ1n2cqF9kxKlFqH7Qf-KR6bA&_nc_ht=scontent.fbkk9-3.fna&oh=00_AT-j7VHmvIiiuvHT-w5LA4BBK9FAg99YgjEAHouvtAMKSg&oe=622B1BF7'),('0000000001','ณภัทร','ชีถนอม','Napat','Cheetanom','napatchee01@gmail.com','hashedTest','0830171663','Address01','https://scontent.fbkk9-3.fna.fbcdn.net/v/t1.6435-9/136741436_2789656357956376_2614371051396205242_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGA6X7nO9KCOX0VOmiNaaTxb2SKSamfTvRvZIpJqZ9O9CBSkAd_xyYftglzGr_kzCEbYln8Xse9XgX1QZWk6B8j&_nc_ohc=h7p5ZrVeBpUAX9VXgnl&_nc_oc=AQm246SIKO-wJm11S7Qm17N3pZJDgNNDBTibFt0DrewQ1n2cqF9kxKlFqH7Qf-KR6bA&_nc_ht=scontent.fbkk9-3.fna&oh=00_AT-j7VHmvIiiuvHT-w5LA4BBK9FAg99YgjEAHouvtAMKSg&oe=622B1BF7');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Image_message`
--

DROP TABLE IF EXISTS `Image_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Image_message` (
  `message_id` varchar(100) DEFAULT NULL,
  `image_url` varchar(2048) DEFAULT NULL,
  KEY `message_id` (`message_id`),
  CONSTRAINT `image_message_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `Message` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Image_message`
--

LOCK TABLES `Image_message` WRITE;
/*!40000 ALTER TABLE `Image_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `Image_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `message_id` varchar(100) NOT NULL,
  `senderType` enum('Vet','Client') DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  `chatroom_id` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `chatroom_id` (`chatroom_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`chatroom_id`) REFERENCES `Chatroom` (`chatroom_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment_History`
--

DROP TABLE IF EXISTS `Payment_History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment_History` (
  `payment_id` varchar(50) NOT NULL,
  `payment_datetime` datetime DEFAULT NULL,
  `payment_amount` int DEFAULT NULL,
  `service_id` varchar(30) DEFAULT NULL,
  `wallet_id` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `service_id` (`service_id`),
  KEY `wallet_id` (`wallet_id`),
  CONSTRAINT `payment_history_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `Service` (`service_id`),
  CONSTRAINT `payment_history_ibfk_2` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment_History`
--

LOCK TABLES `Payment_History` WRITE;
/*!40000 ALTER TABLE `Payment_History` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment_History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pet`
--

DROP TABLE IF EXISTS `Pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pet` (
  `pet_id` varchar(6) NOT NULL,
  `client_id` varchar(5) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `species` varchar(50) DEFAULT NULL,
  `favourite_activity` varchar(50) DEFAULT NULL,
  `birthyear` int DEFAULT NULL,
  `favourite_food` varchar(50) DEFAULT NULL,
  `profile_pic_url` varchar(2048) DEFAULT NULL,
  `weight` decimal(4,1) DEFAULT NULL,
  PRIMARY KEY (`pet_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Client` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pet`
--

LOCK TABLES `Pet` WRITE;
/*!40000 ALTER TABLE `Pet` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Report`
--

DROP TABLE IF EXISTS `Report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Report` (
  `report_id` varchar(30) NOT NULL,
  `report_detail` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Report`
--

LOCK TABLES `Report` WRITE;
/*!40000 ALTER TABLE `Report` DISABLE KEYS */;
/*!40000 ALTER TABLE `Report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Review` (
  `review_id` varchar(30) NOT NULL,
  `suggestion` varchar(200) DEFAULT NULL,
  `satisfaction_point` int DEFAULT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `service_id` varchar(30) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `review_id` varchar(30) DEFAULT NULL,
  `report_id` varchar(30) DEFAULT NULL,
  `summary_id` varchar(30) DEFAULT NULL,
  `chatroom_id` varchar(30) DEFAULT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  `vet_id` varchar(10) DEFAULT NULL,
  `pet_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `review_id` (`review_id`),
  KEY `report_id` (`report_id`),
  KEY `summary_id` (`summary_id`),
  KEY `chatroom_id` (`chatroom_id`),
  KEY `client_id` (`client_id`),
  KEY `vet_id` (`vet_id`),
  KEY `pet_id` (`pet_id`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `Review` (`review_id`),
  CONSTRAINT `service_ibfk_2` FOREIGN KEY (`report_id`) REFERENCES `Report` (`report_id`),
  CONSTRAINT `service_ibfk_3` FOREIGN KEY (`summary_id`) REFERENCES `Summary` (`summary_id`),
  CONSTRAINT `service_ibfk_4` FOREIGN KEY (`chatroom_id`) REFERENCES `Chatroom` (`chatroom_id`),
  CONSTRAINT `service_ibfk_5` FOREIGN KEY (`client_id`) REFERENCES `Client` (`client_id`),
  CONSTRAINT `service_ibfk_6` FOREIGN KEY (`vet_id`) REFERENCES `Vet` (`vet_id`),
  CONSTRAINT `service_ibfk_7` FOREIGN KEY (`pet_id`) REFERENCES `Pet` (`pet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `Service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Summary`
--

DROP TABLE IF EXISTS `Summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Summary` (
  `summary_id` varchar(30) NOT NULL,
  `summary_deal` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`summary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Summary`
--

LOCK TABLES `Summary` WRITE;
/*!40000 ALTER TABLE `Summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `Summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Text_message`
--

DROP TABLE IF EXISTS `Text_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Text_message` (
  `message_id` varchar(100) DEFAULT NULL,
  `text` varchar(200) DEFAULT NULL,
  KEY `message_id` (`message_id`),
  CONSTRAINT `text_message_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `Message` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Text_message`
--

LOCK TABLES `Text_message` WRITE;
/*!40000 ALTER TABLE `Text_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `Text_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Topup_History`
--

DROP TABLE IF EXISTS `Topup_History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Topup_History` (
  `topup_id` varchar(50) NOT NULL,
  `topup_datetime` datetime DEFAULT NULL,
  `topup_amount` int DEFAULT NULL,
  `admin_id` varchar(3) DEFAULT NULL,
  `wallet_id` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`topup_id`),
  KEY `admin_id` (`admin_id`),
  KEY `wallet_id` (`wallet_id`),
  CONSTRAINT `topup_history_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `Admin` (`admin_id`),
  CONSTRAINT `topup_history_ibfk_2` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Topup_History`
--

LOCK TABLES `Topup_History` WRITE;
/*!40000 ALTER TABLE `Topup_History` DISABLE KEYS */;
/*!40000 ALTER TABLE `Topup_History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Topup_Request`
--

DROP TABLE IF EXISTS `Topup_Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Topup_Request` (
  `request_id` varchar(50) NOT NULL,
  `request_datetime` datetime DEFAULT NULL,
  `request_amount` int DEFAULT NULL,
  `wallet_id` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `wallet_id` (`wallet_id`),
  CONSTRAINT `topup_request_ibfk_1` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet` (`wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Topup_Request`
--

LOCK TABLES `Topup_Request` WRITE;
/*!40000 ALTER TABLE `Topup_Request` DISABLE KEYS */;
/*!40000 ALTER TABLE `Topup_Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vet`
--

DROP TABLE IF EXISTS `Vet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vet` (
  `vet_id` varchar(10) NOT NULL,
  `firstname_th` varchar(50) DEFAULT NULL,
  `lastname_th` varchar(50) DEFAULT NULL,
  `firstname_en` varchar(50) DEFAULT NULL,
  `lastname_en` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `profile_picture_url` varchar(2048) DEFAULT NULL,
  `ba_firstname` varchar(50) DEFAULT NULL,
  `ba_lastname` varchar(50) DEFAULT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `bank_account_number` varchar(10) DEFAULT NULL,
  `admin_id` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`vet_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `vet_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `Admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vet`
--

LOCK TABLES `Vet` WRITE;
/*!40000 ALTER TABLE `Vet` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Video_Message`
--

DROP TABLE IF EXISTS `Video_Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Video_Message` (
  `message_id` varchar(100) DEFAULT NULL,
  `video_url` varchar(2048) DEFAULT NULL,
  KEY `message_id` (`message_id`),
  CONSTRAINT `video_message_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `Message` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Video_Message`
--

LOCK TABLES `Video_Message` WRITE;
/*!40000 ALTER TABLE `Video_Message` DISABLE KEYS */;
/*!40000 ALTER TABLE `Video_Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wallet`
--

DROP TABLE IF EXISTS `Wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Wallet` (
  `wallet_id` varchar(12) NOT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`wallet_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Client` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wallet`
--

LOCK TABLES `Wallet` WRITE;
/*!40000 ALTER TABLE `Wallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `Wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-12  0:28:58
