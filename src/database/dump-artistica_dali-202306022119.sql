-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: artistica_dali
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `banner` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Escolar','cat_escolar.jpg'),(2,'ArtÃƒÂ­stica','cat_artistica.jpg'),(3,'Oficina','cat_oficina.jpg'),(4,'Prueba','cat_escolar.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_items_un` (`id`),
  KEY `order_items_FK` (`productId`),
  KEY `order_items_FK_1` (`orderId`),
  CONSTRAINT `order_items_FK` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_FK_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_un` (`id`),
  KEY `orders_FK` (`userId`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `subcategory_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `subcategory_idx` (`subcategory_id`),
  CONSTRAINT `subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (70,'Acuarelas Giotto',5000,10,'Unas muy lindas acuarelas\r\n',5,'2021-10-23 23:26:11','2023-05-21 17:00:38'),(71,'Oleos ',150,15,'Alto oleo',4,'2021-10-24 00:38:46','2023-05-21 18:25:58'),(72,'Set acuarelas',5000,12,'Alto set',5,'2021-10-24 00:39:17','2023-05-21 18:26:55'),(73,'Atril',6000,10,'Super atril',6,'2021-10-24 00:39:51','2023-05-21 18:27:13'),(74,'Barniz',50,16,'Re barato',16,'2021-10-24 00:40:18','2023-05-21 18:27:34'),(75,'Bastidor',6000,13,'No es un batidor\r\n',21,'2021-10-24 00:40:45','2023-05-21 18:27:59'),(76,'Bibliorato',600,10,'Coso de oficina\r\n',8,'2021-10-24 00:41:23','2023-05-21 18:28:16'),(77,'Caja archivadora',100,10,'Una simple y aburrida caja\r\n',20,'2021-10-24 00:42:01','2023-05-21 18:28:38'),(78,'Carpeta',50,10,'Carpeta aburrida\r\n',11,'2021-10-24 00:42:51','2023-05-21 18:29:09'),(79,'Carpeta Fornite',500,10,'Carpeta Gamer\r\n',11,'2021-10-24 00:44:34','2023-05-21 18:29:42'),(80,'Cartuchera',150,10,'',2,'2021-10-24 00:45:29','2023-05-21 18:30:11'),(81,'Cinta ',100,100,'',22,'2021-10-24 00:45:52','2023-05-21 18:30:39'),(82,'Compas',600,10,'',31,'2021-10-24 00:47:04','2023-05-21 18:31:10'),(83,'Cuaderno tapa dura',600,10,'',15,'2021-10-24 00:47:27','2023-05-21 18:31:37'),(84,'LÃƒÂ¡pices de colores',400,10,'',3,'2021-10-24 00:48:08','2023-05-21 18:32:00'),(85,'Marcadores Sharpie',5000,10,'Caritos los sharpies\r\n',4,'2021-10-24 00:48:40','2023-05-21 18:32:24'),(86,'Marcadores',15000,1,'Set de marcadores distintas marcas',10,'2021-10-24 00:49:03','2023-05-21 18:34:07'),(87,'Mochila spiderman',6000,10,'',1,'2021-10-24 00:49:36','2023-05-21 18:33:12'),(102,'Bastidor',1500,10,'El mejor bastidor',6,'2023-05-22 00:05:33','2023-05-22 00:05:33'),(103,'Bibliorato Horrible',1500,10,'Los biblioratos son aburridos',8,'2023-05-22 22:31:13','2023-05-22 22:31:13');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_images_FK` (`product_id`),
  CONSTRAINT `products_images_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (52,'1684688438085_img_.jpg',70),(53,'1684693558871_img_.jpg',71),(54,'1684693615876_img_.jpg',72),(55,'1684693633520_img_.jpg',73),(56,'1684693654749_img_.jpg',74),(57,'1684693679722_img_.jpg',75),(58,'1684693696840_img_.jpg',76),(59,'1684693718902_img_.jpg',77),(60,'1684693749418_img_.jpg',78),(61,'1684693782508_img_.jpg',79),(62,'1684693811615_img_.jpg',80),(63,'1684693839072_img_.jpg',81),(64,'1684693870580_img_.jpg',82),(65,'1684693897345_img_.jpg',83),(66,'1684693920833_img_.jpg',84),(67,'1684693944427_img_.jpg',85),(69,'1684693992913_img_.jpg',87),(70,'1684694047678_img_.jpg',86),(71,'1684694047685_img_.jpg',86),(72,'1684694047687_img_.jpg',86),(74,'1684713933235_img_.jpg',102),(75,'1684794673268_img_.jpg',103);
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoria_idx` (`category_id`),
  CONSTRAINT `categoria` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Mochilas',1,NULL,NULL),(2,'Cartucheras',1,NULL,NULL),(3,'LÃƒÂ¡pices',1,NULL,NULL),(4,'Oleos',2,NULL,NULL),(5,'Acuarelas',2,NULL,NULL),(6,'Atriles',2,NULL,NULL),(8,'Biblioratos',3,NULL,NULL),(9,'Abrochadoras',3,NULL,NULL),(10,'Marcadores',2,NULL,NULL),(11,'Carpetas',1,NULL,NULL),(12,'AcrÃƒÂ­Ã‚Â­licos',2,NULL,NULL),(13,'Pinceles',2,NULL,NULL),(14,'CompÃƒÂ¡s',2,NULL,NULL),(15,'Cuadernos',1,NULL,NULL),(16,'Barniz',2,NULL,NULL),(17,'Tintas',2,NULL,NULL),(18,'Gomas',1,NULL,NULL),(19,'Tijeras',1,NULL,NULL),(20,'Cajas',3,NULL,NULL),(21,'Bastidores',2,NULL,NULL),(22,'Cintas Adhesivas',3,NULL,NULL),(23,'Pizarras',3,NULL,NULL),(24,'Perforadoras',3,NULL,NULL),(25,'Sobres',3,NULL,NULL),(26,'Caballetes y atriles',2,NULL,NULL),(27,'Repuestos',1,NULL,NULL),(31,'CompÃƒÂ¡s',1,NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(70) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `rol` int(2) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `googleId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'Jona','Jona','admin@mail.com','$2a$10$g9YXAsgvDDsFzEkSsqi3Fes8e/9mvviTSUYTs13llZf/5/YwpVncO','15151515',1,'2021-09-24 02:05:57','2021-09-24 02:48:31','1632450586832_img_.jpg',NULL),(18,'Jona','Cespedes','user@mail.com','$2a$10$7kyZVLMgCjjfx1k123cKtelWFTc0XgNoBBOLDPeePAnU8IXiXVF4e',NULL,1,'2021-11-10 22:35:54','2021-11-10 22:35:54','default-image.png',NULL),(19,'Jona','Jona','jona@mail.com','$2a$12$ipA0/kwBPAX88xQKgAxlWuHmaWljo.gRXPZaEG0fMt0wCpwYjy0Jq','',1,'2023-04-12 22:22:24','2023-04-12 22:22:24','default-image.png',NULL),(20,'Tomas','Luque','prueba@mail.com','123456','123123',1,'2023-05-16 23:14:39','2023-05-16 23:14:39',NULL,NULL),(21,'Tomas','Luque','prueba2@mail.com','$2b$10$YW1ETCu6iMwq5YWf/dwj..mbKJCWEbVMzMNDRRYm96LWjbgz1oIQq','123123',1,'2023-05-16 23:53:02','2023-05-16 23:53:02',NULL,NULL),(22,'Jona','Nuevo','nuevo@mail.com','$2a$12$wJzixFcTkLpKhRNxbgURDutGJDpEj3e.68UQFmGP/FpEQiZd1C/lq','',0,'2023-05-21 22:11:04','2023-05-21 22:11:04','1684707064444_avatar_.jpg',NULL),(23,'Jona','Nuevo','test@mail.com','$2a$12$bnB9a8B6evY1K4HwETq1O.c.xHWrv.0gDP.rEK.0qqmrMTIt1K7wG','',0,'2023-05-21 23:59:23','2023-05-21 23:59:23','default-image.png',NULL),(24,'Jonatan','Céspedes','develop.jec@gmail.com','artistica','',0,'2023-06-03 00:12:46','2023-06-03 00:12:46',NULL,'110062698584413771426'),(25,'Formar','Comision19','formar.comision19@gmail.com','artistica','',0,'2023-06-03 00:15:09','2023-06-03 00:15:09',NULL,'106862316777301585007');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'artistica_dali'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-02 21:19:10
