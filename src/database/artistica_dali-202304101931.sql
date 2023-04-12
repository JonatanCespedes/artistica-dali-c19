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
INSERT INTO `categories` VALUES (1,'Escolar','cat_escolar.jpg'),(2,'ArtÃ­stica','cat_artistica.jpg'),(3,'Oficina','cat_oficina.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (15,5,71,5,'2021-11-18','2021-11-18');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,17,'PENDING','2021-11-17','2021-11-17'),(5,18,'PENDING','2021-11-18','2021-11-18');
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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (70,'Acuarelas Alba',500,10,'Unas muy lindas acuarelas\r\n',5,'2021-10-23 23:26:11','2021-10-23 23:26:11'),(71,'Oleos ',150,15,'Alto oleo',4,'2021-10-24 00:38:46','2021-10-24 00:38:46'),(72,'Set acuarelas',5000,12,'Alto set',5,'2021-10-24 00:39:17','2021-10-24 00:39:17'),(73,'Atril',6000,10,'Super atril',6,'2021-10-24 00:39:51','2021-10-24 00:39:51'),(74,'Barniz',50,16,'Re barato',16,'2021-10-24 00:40:18','2021-10-24 00:40:18'),(75,'Bastidor',6000,13,'No es un batidor\r\n',21,'2021-10-24 00:40:45','2021-10-24 00:40:45'),(76,'Bibliorato',600,10,'Coso de oficina\r\n',8,'2021-10-24 00:41:23','2021-10-24 00:41:23'),(77,'Caja archivadora',100,10,'Una simple y aburrida caja\r\n',20,'2021-10-24 00:42:01','2021-10-24 00:42:01'),(78,'Carpeta',50,10,'Carpeta aburrida\r\n',20,'2021-10-24 00:42:51','2021-10-24 00:42:51'),(79,'Carpeta Fornite',500,10,'Carpeta Gamer\r\n',11,'2021-10-24 00:44:34','2021-10-24 00:44:34'),(80,'Cartuchera',150,10,'',2,'2021-10-24 00:45:29','2021-10-24 00:45:29'),(81,'Cinta ',100,100,'',22,'2021-10-24 00:45:52','2021-10-24 00:45:52'),(82,'Compas',600,10,'',31,'2021-10-24 00:47:04','2021-10-24 00:47:04'),(83,'Cuaderno tapa dura',600,10,'',15,'2021-10-24 00:47:27','2021-10-24 00:47:27'),(84,'LÃ¡pices de colores',400,10,'',3,'2021-10-24 00:48:08','2021-10-24 00:48:08'),(85,'Marcadores Sharpie',5000,10,'Caritos los sharpies\r\n',10,'2021-10-24 00:48:40','2021-10-24 00:48:40'),(86,'Marcadores',150,1,'',10,'2021-10-24 00:49:03','2021-10-24 00:49:03'),(87,'Mochila spiderman',6000,10,'',1,'2021-10-24 00:49:36','2021-10-24 00:49:36');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (1,'1635031571585_img_.jpg',70),(2,'1635035926256_img_.jpg',71),(3,'1635035957988_img_.jpg',72),(4,'1635035991058_img_.jpg',73),(5,'1635036018721_img_.jpg',74),(6,'1635036045675_img_.jpg',75),(7,'1635036083342_img_.jpg',76),(8,'1635036121986_img_.jpg',77),(9,'1635036171515_img_.jpg',78),(10,'1635036274526_img_.jpg',79),(11,'1635036329078_img_.jpg',80),(12,'1635036352716_img_.jpg',81),(13,'1635036424206_img_.jpg',82),(14,'1635036447309_img_.jpg',83),(15,'1635036488384_img_.jpg',84),(16,'1635036520742_img_.jpg',85),(17,'1635036543104_img_.jpg',86),(18,'1635036576010_img_.jpg',87);
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
INSERT INTO `subcategories` VALUES (1,'Mochilas',1,NULL,NULL),(2,'Cartucheras',1,NULL,NULL),(3,'LÃ¡pices',1,NULL,NULL),(4,'Oleos',2,NULL,NULL),(5,'Acuarelas',2,NULL,NULL),(6,'Atriles',2,NULL,NULL),(8,'Biblioratos',3,NULL,NULL),(9,'Abrochadoras',3,NULL,NULL),(10,'Marcadores',2,NULL,NULL),(11,'Carpetas',1,NULL,NULL),(12,'AcrÃ­Â­licos',2,NULL,NULL),(13,'Pinceles',2,NULL,NULL),(14,'CompÃ¡s',2,NULL,NULL),(15,'Cuadernos',1,NULL,NULL),(16,'Barniz',2,NULL,NULL),(17,'Tintas',2,NULL,NULL),(18,'Gomas',1,NULL,NULL),(19,'Tijeras',1,NULL,NULL),(20,'Cajas',3,NULL,NULL),(21,'Bastidores',2,NULL,NULL),(22,'Cintas Adhesivas',3,NULL,NULL),(23,'Pizarras',3,NULL,NULL),(24,'Perforadoras',3,NULL,NULL),(25,'Sobres',3,NULL,NULL),(26,'Caballetes y atriles',2,NULL,NULL),(27,'Repuestos',1,NULL,NULL),(31,'CompÃ¡s',1,NULL,NULL);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'Jona','Jona','admin@mail.com','$2a$10$g9YXAsgvDDsFzEkSsqi3Fes8e/9mvviTSUYTs13llZf/5/YwpVncO','15151515',1,'2021-09-24 02:05:57','2021-09-24 02:48:31','1632450586832_img_.jpg'),(18,'Jona','Cespedes','user@mail.com','$2a$10$7kyZVLMgCjjfx1k123cKtelWFTc0XgNoBBOLDPeePAnU8IXiXVF4e',NULL,1,'2021-11-10 22:35:54','2021-11-10 22:35:54','default-image.png');
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

-- Dump completed on 2023-04-10 19:31:01
