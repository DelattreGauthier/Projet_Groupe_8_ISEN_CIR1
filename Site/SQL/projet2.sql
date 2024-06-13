-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 13, 2024 at 09:13 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projet2`
--

-- --------------------------------------------------------

--
-- Table structure for table `adherents`
--

CREATE TABLE `adherents` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `profilepic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adherents`
--

INSERT INTO `adherents` (`id`, `username`, `email`, `mot_de_passe`, `profilepic`) VALUES
(1, 'Gauthier', 'gauthier.delattre@student.junia.com', '$2y$10$DdFYi/AB16G3UQNos9iuGeY5MedRGk5VjBDfg96VXRNt91/ZBSNNS', 'uploads/default.jpg'),
(2, 'LoutreDor', 'loic.desry@student.junia.com', '$2y$10$08H1XiHVtxViv3pekZKkbehN822kblOlzBMOL3IELUurHWJTldTai', 'uploads/default.jpg'),
(3, 'cdk', 'jeannin.paul04@gmail.com', '$2y$10$poxg/gex1EL8fte6/Mt.p.hH2Bawd06K4DnvMyW4AjU4yLtzFrB0C', 'uploads/default.jpg'),
(4, 'Brasko93', 'brasko93@gmail.com', '$2y$10$6TH82yTw908y1pwTcAvP7OPC3EAr7Zy7TVBneQJLvc78Bq6QanFN6', 'uploads/default.jpg'),
(5, 'brakata', 'brakata93@gmail.com', '$2y$10$knr3GBCkgUxn3wokV86cx.uUlEnYs1emMPkWO0TWgoGSu4MDOvHBq', 'uploads/default.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `concepteur`
--

CREATE TABLE `concepteur` (
  `IdJeu` int(11) NOT NULL,
  `IdJoueur` int(11) NOT NULL,
  `couleur` varchar(10) NOT NULL,
  `taille` int(2) NOT NULL,
  `pattern` varchar(400) NOT NULL,
  `road_pattern` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `concepteur`
--

INSERT INTO `concepteur` (`IdJeu`, `IdJoueur`, `couleur`, `taille`, `pattern`, `road_pattern`) VALUES
(1, 2, 'cuivre', 8, '\"E,E,D,E,E,E,E,E,E,E,E,E,C,S,S,S,C,E,E,E,E,E,E,E,E,E,C,T,C,E,E,E,E,E,E,E,E,T,T,E,E,E,E,E,E,E,E,C,T,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,C,S,S,S,C,E,E,E,E,C,C,E,E,E,E,E,E,C,S,C,E,E,E,E,E,E,E,A,E,E,E,E,E,E,E,E\"', '\"0,0,1,0,0,0,0,0,0,0,0,0,3,1,1,1,1,0,0,0,0,0,0,0,0,0,3,1,1,0,0,0,0,0,0,0,0,4,2,0,0,0,0,0,0,0,0,3,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,4,1,1,1,2,0,0,0,0,4,2,0,0,0,0,0,0,4,1,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0\"'),
(2, 1, 'cuivre', 8, '\"E,D,E,E,E,E,E,E,E,E,E,S,E,C,S,C,E,E,E,E,E,S,E,S,E,S,E,E,E,E,E,S,E,S,E,S,E,E,E,E,E,S,E,S,E,S,E,E,E,E,E,S,E,S,E,S,E,E,E,E,E,S,E,S,E,S,E,E,E,E,E,S,E,S,E,S,E,E,E,E,E,C,S,C,E,C,S,S,C,E,E,E,E,E,E,E,E,E,A,E\"', '\"0,1,0,0,0,0,0,0,0,0,0,2,0,4,1,1,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,3,1,2,0,3,1,1,1,0,0,0,0,0,0,0,0,0,1,0\"'),
(3, 2, 'vert', 4, '\"E,E,D,E,E,E,E,C,T,E,E,E,E,C,T,C,E,E,E,E,E,T,C,E,E,E,C,T,C,E,E,E,A,E,E,E\"', '\"0,0,1,0,0,0,0,4,2,0,0,0,0,3,3,1,0,0,0,0,0,4,1,0,0,0,4,3,2,0,0,0,1,0,0,0\"'),
(4, 1, 'noir', 10, '\"E,E,E,E,E,D,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,A,E,E,E,E,E,E\"', '\"0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0\"'),
(5, 2, 'vert', 6, '\"E,E,E,E,D,E,E,E,E,E,E,C,T,E,E,E,E,E,E,C,T,C,E,E,E,E,E,E,E,C,C,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,C,S,S,S,C,E,E,E,A,E,E,E,E,E\"', '\"0,0,0,0,1,0,0,0,0,0,0,4,2,0,0,0,0,0,0,3,3,1,0,0,0,0,0,0,0,3,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,4,1,1,1,2,0,0,0,1,0,0,0,0,0\"'),
(6, 1, 'vert', 6, '\"E,E,E,D,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,A,E,E,E,E\"', '\"0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0\"'),
(7, 2, 'bleu', 4, '\"E,E,E,D,E,E,E,E,E,C,C,E,E,E,E,E,S,E,E,E,E,C,C,E,E,C,S,C,E,E,E,A,E,E,E,E\"', '\"0,0,0,1,0,0,0,0,0,3,1,0,0,0,0,0,2,0,0,0,0,4,2,0,0,4,1,2,0,0,0,1,0,0,0,0\"'),
(8, 3, 'bleu', 4, '\"E,D,E,E,E,E,E,C,S,S,C,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,A,E\"', '\"0,1,0,0,0,0,0,3,1,1,1,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,1,0\"'),
(9, 3, 'noir', 8, '\"E,D,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,A,E,E,E,E,E,E,E,E\"', '\"0,1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0\"'),
(10, 3, 'noir', 8, '\"E,D,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,A,E,E,E,E,E,E,E,E\"', '\"0,1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0\"'),
(11, 3, 'bleu', 4, '\"E,E,E,D,E,E,E,E,E,C,C,E,E,E,E,E,S,E,E,E,E,C,C,E,E,C,S,C,E,E,E,A,E,E,E,E\"', '\"0,0,0,1,0,0,0,0,0,3,1,0,0,0,0,0,2,0,0,0,0,4,2,0,0,4,1,2,0,0,0,1,0,0,0,0\"'),
(12, 1, 'vert', 6, '\"E,E,E,D,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,A,E,E,E,E\"', '\"0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0\"'),
(13, 1, 'vert', 6, '\"E,E,E,E,D,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,A,E,E,E\"', '\"0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0\"'),
(14, 1, 'bleu', 4, '\"E,E,D,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,A,E,E,E\"', '\"0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0\"'),
(15, 1, 'bleu', 4, '\"E,E,D,E,E,E,E,E,T,T,C,E,E,C,T,T,C,E,E,S,E,E,E,E,E,C,C,E,E,E,E,E,A,E,E,E\"', '\"0,0,1,0,0,0,0,0,4,1,1,0,0,4,3,3,2,0,0,2,0,0,0,0,0,3,1,0,0,0,0,0,1,0,0,0\"'),
(16, 2, 'cuivre', 6, '\"E,E,D,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,C,S,C,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,A,E,E,E\"', '\"0,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0\"'),
(17, 2, 'cuivre', 6, '\"E,E,D,E,E,E,E,E,E,E,C,S,C,E,E,E,E,E,E,E,C,C,E,E,E,E,E,E,E,C,C,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,C,S,C,E,E,E,E,E,A,E,E,E\"', '\"0,0,1,0,0,0,0,0,0,0,3,1,1,0,0,0,0,0,0,0,3,1,0,0,0,0,0,0,0,3,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,4,1,2,0,0,0,0,0,1,0,0,0\"'),
(18, 1, 'bleu', 4, '\"E,E,E,D,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,S,E,E,E,E,E,A,E,E\"', '\"0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,1,0,0\"'),
(19, 2, 'vert', 6, '\"E,E,E,E,D,E,E,E,E,E,E,E,T,T,C,E,E,E,E,E,T,T,C,E,E,E,E,C,C,E,E,E,E,C,S,C,E,E,E,E,E,S,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,A,E,E,E,E,E,E\"', '\"0,0,0,0,1,0,0,0,0,0,0,0,4,1,1,0,0,0,0,0,4,3,2,0,0,0,0,4,2,0,0,0,0,4,1,2,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0\"'),
(20, 1, 'bleu', 4, '\"E,D,E,E,E,E,E,S,E,E,E,E,E,C,C,E,E,E,E,E,S,E,E,E,E,C,C,E,E,E,E,A,E,E,E,E\"', '\"0,1,0,0,0,0,0,2,0,0,0,0,0,3,1,0,0,0,0,0,2,0,0,0,0,4,2,0,0,0,0,1,0,0,0,0\"'),
(21, 1, 'cuivre', 8, '\"E,D,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,C,S,C,E,E,C,S,C,E,E,E,E,S,E,E,S,E,S,E,E,E,E,C,C,E,S,E,S,E,E,E,E,E,C,T,C,E,S,E,E,E,E,E,E,C,S,S,T,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,A,E\"', '\"0,1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,3,1,1,0,0,4,1,1,0,0,0,0,2,0,0,2,0,2,0,0,0,0,3,1,0,2,0,2,0,0,0,0,0,3,1,2,0,2,0,0,0,0,0,0,3,1,1,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1,0\"'),
(22, 1, 'noir', 10, '\"E,E,E,E,E,E,E,E,E,D,E,E,E,E,E,E,C,S,S,S,S,C,E,E,E,E,C,T,T,E,E,E,E,E,E,E,E,E,C,T,T,S,T,C,E,E,E,E,E,E,E,E,E,E,T,T,E,E,E,E,E,E,E,E,E,E,C,T,S,S,C,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,C,T,T,E,E,E,E,E,E,E,E,E,C,T,T,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,S,E,E,E,E,E,E,E,E,E,E,E,A,E\"', '\"0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,4,1,1,1,1,2,0,0,0,0,4,1,2,0,0,0,0,0,0,0,0,0,3,3,3,1,1,1,0,0,0,0,0,0,0,0,0,0,4,2,0,0,0,0,0,0,0,0,0,0,3,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,4,1,2,0,0,0,0,0,0,0,0,0,3,3,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,1,0\"');

-- --------------------------------------------------------

--
-- Table structure for table `player_score`
--

CREATE TABLE `player_score` (
  `IdJoueur` int(11) NOT NULL,
  `IdJeu` int(11) NOT NULL,
  `Score` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_score`
--

INSERT INTO `player_score` (`IdJoueur`, `IdJeu`, `Score`) VALUES
(1, 1, 13),
(1, 2, 12),
(1, 3, 8),
(1, 4, 1),
(1, 5, 9),
(1, 6, 0),
(1, 7, 5),
(1, 8, 4),
(1, 9, 2),
(1, 10, 3),
(1, 11, 6),
(1, 12, 0),
(1, 13, 0),
(1, 14, 0),
(1, 15, 11),
(1, 16, 6),
(1, 17, 13),
(1, 21, 15),
(2, 1, 29),
(2, 2, 21),
(2, 3, 13),
(2, 5, 12),
(2, 6, 0),
(2, 16, 6),
(2, 17, 17),
(2, 19, 14),
(3, 8, 5);

-- --------------------------------------------------------

--
-- Table structure for table `recuperation`
--

CREATE TABLE `recuperation` (
  `id` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `code` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recuperation`
--

INSERT INTO `recuperation` (`id`, `mail`, `code`) VALUES
(1, 'gauthier.delattre@student.junia.com', 68116896),
(2, 'gauthier.delattre@student.junia.com', 16821371),
(3, 'gauthier.delattre@student.junia.com', 97009196),
(4, 'gauthier.delattre@student.junia.com', 85585923);

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `IdJoueur` int(11) NOT NULL,
  `Lv1_score` int(3) DEFAULT NULL,
  `Lv2_score` int(3) DEFAULT NULL,
  `Lv3_score` int(3) DEFAULT NULL,
  `Lv4_score` int(3) DEFAULT NULL,
  `Lv5_score` int(3) DEFAULT NULL,
  `Lv6_score` int(3) DEFAULT NULL,
  `Lv7_score` int(3) DEFAULT NULL,
  `Lv8_score` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`IdJoueur`, `Lv1_score`, `Lv2_score`, `Lv3_score`, `Lv4_score`, `Lv5_score`, `Lv6_score`, `Lv7_score`, `Lv8_score`) VALUES
(1, 16, 16, 18, 37, 53, 59, 95, 111),
(2, 16, 997, 18, 37, 997, 59, NULL, 999),
(3, 16, 20, 204, NULL, NULL, NULL, NULL, NULL),
(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adherents`
--
ALTER TABLE `adherents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_username` (`username`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indexes for table `concepteur`
--
ALTER TABLE `concepteur`
  ADD PRIMARY KEY (`IdJeu`);

--
-- Indexes for table `player_score`
--
ALTER TABLE `player_score`
  ADD PRIMARY KEY (`IdJoueur`,`IdJeu`);

--
-- Indexes for table `recuperation`
--
ALTER TABLE `recuperation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`IdJoueur`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adherents`
--
ALTER TABLE `adherents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `concepteur`
--
ALTER TABLE `concepteur`
  MODIFY `IdJeu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `recuperation`
--
ALTER TABLE `recuperation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
