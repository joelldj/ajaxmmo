-- phpMyAdmin SQL Dump
-- version 2.10.0.2
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: May 07, 2007 at 11:31 AM
-- Server version: 5.0.37
-- PHP Version: 5.2.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Database: `gameworld`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `player`
-- 

CREATE TABLE `player` (
  `id` int(11) NOT NULL auto_increment,
  `logon` varchar(50) collate latin1_general_ci NOT NULL,
  `hp` int(11) NOT NULL,
  `maxhp` int(11) NOT NULL,
  `tileid` int(11) NOT NULL,
  `tribeid` int(11) NOT NULL,
  `direction` varchar(50) collate latin1_general_ci NOT NULL default 'nowhere',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=3 ;

-- 
-- Dumping data for table `player`
-- 

INSERT INTO `player` VALUES (1, 'joseph', 200, 500, 5, 1, 'nowhere');