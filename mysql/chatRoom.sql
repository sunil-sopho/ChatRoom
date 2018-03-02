-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 12, 2018 at 07:51 PM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatRoom`
--

-- --------------------------------------------------------

--
-- Table structure for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fhj`
--

CREATE TABLE `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fhj` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjgj`
--

CREATE TABLE `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjgj` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjgj`
--

INSERT INTO `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjgj` (`id`, `roomnum`) VALUES
(3, 4),
(6, 0),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjhj`
--

CREATE TABLE `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjhj` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjhj`
--

INSERT INTO `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjhj` (`id`, `roomnum`) VALUES
(2, 3),
(3, 0),
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjhk`
--

CREATE TABLE `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fjhk` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fR2`
--

CREATE TABLE `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fR2` (
  `id` int(32) NOT NULL,
  `roomnum` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fR2`
--

INSERT INTO `$2a$10$K3i8IKdmw6ipxnU84vfCne8Dz7yU0yBQEHDy4Rsf8yohNYK3x8fR2` (`id`, `roomnum`) VALUES
(1, 32),
(1, 32),
(2, 0),
(0, 0),
(8, 0),
(32, 0);

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `email` char(100) NOT NULL,
  `link` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
