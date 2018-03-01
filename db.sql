-- MySQL dump 10.13  Distrib 5.7.20, for osx10.13 (x86_64)
--
-- Host: localhost    Database: chatRoom
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abcdef`
--

DROP TABLE IF EXISTS `abcdef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abcdef` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abcdef`
--

LOCK TABLES `abcdef` WRITE;
/*!40000 ALTER TABLE `abcdef` DISABLE KEYS */;
INSERT INTO `abcdef` VALUES (5,1);
/*!40000 ALTER TABLE `abcdef` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hi`
--

DROP TABLE IF EXISTS `hi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hi` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hi`
--

LOCK TABLES `hi` WRITE;
/*!40000 ALTER TABLE `hi` DISABLE KEYS */;
INSERT INTO `hi` VALUES (5,2);
/*!40000 ALTER TABLE `hi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hifi`
--

DROP TABLE IF EXISTS `hifi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hifi` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hifi`
--

LOCK TABLES `hifi` WRITE;
/*!40000 ALTER TABLE `hifi` DISABLE KEYS */;
INSERT INTO `hifi` VALUES (7,3);
/*!40000 ALTER TABLE `hifi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holi`
--

DROP TABLE IF EXISTS `holi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holi` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holi`
--

LOCK TABLES `holi` WRITE;
/*!40000 ALTER TABLE `holi` DISABLE KEYS */;
INSERT INTO `holi` VALUES (1,0);
/*!40000 ALTER TABLE `holi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jfckdshn`
--

DROP TABLE IF EXISTS `jfckdshn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jfckdshn` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jfckdshn`
--

LOCK TABLES `jfckdshn` WRITE;
/*!40000 ALTER TABLE `jfckdshn` DISABLE KEYS */;
INSERT INTO `jfckdshn` VALUES (1,0),(0,0),(2,0),(4,0);
/*!40000 ALTER TABLE `jfckdshn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sads`
--

DROP TABLE IF EXISTS `sads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sads` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sads`
--

LOCK TABLES `sads` WRITE;
/*!40000 ALTER TABLE `sads` DISABLE KEYS */;
INSERT INTO `sads` VALUES (19,0),(1,1);
/*!40000 ALTER TABLE `sads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sdasds`
--

DROP TABLE IF EXISTS `sdasds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sdasds` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sdasds`
--

LOCK TABLES `sdasds` WRITE;
/*!40000 ALTER TABLE `sdasds` DISABLE KEYS */;
INSERT INTO `sdasds` VALUES (20,2),(2,3),(3,4),(4,5),(5,6),(6,0),(0,1),(1,0);
/*!40000 ALTER TABLE `sdasds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `connections` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'x@y.com','$2a$10$LkBytIIcGCHPeeT4fP.Gs.dTOPwgsHyWNwy48rco5nNsPiXDYNU8u','2018-01-12 14:51:52','2018-01-12 14:51:52',NULL),(2,'c@d.com','$2a$10$EFj5.RGtunfitF1SqTwEqeznCiyZD8RE1aZvWEzao2o3e7MPcB62u','2018-01-12 14:52:11','2018-01-12 14:52:11',NULL),(3,'l@p.com','$2a$10$WNkBYSte1FWE/mn9hxenlOv4V5XG48MfQ1FP2B9Zo6BetE7BQYVJO','2018-01-12 14:52:26','2018-01-12 14:52:26',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-02  0:41:40
