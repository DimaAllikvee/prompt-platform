-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2025 at 10:11 AM
-- Server version: 11.7.2-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `promptsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `prompts`
--

CREATE TABLE `prompts` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(160) NOT NULL,
  `title` varchar(160) NOT NULL,
  `type` enum('video','storyboard','text') NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tags`)),
  `rating` float DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `prompt` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `prompts`
--

INSERT INTO `prompts` (`id`, `slug`, `title`, `type`, `tags`, `rating`, `likes`, `prompt`, `created_at`) VALUES
(1, 'anime-video-intro', 'Anime Video Intro', 'video', '[\"anime\",\"intro\"]', 0, 0, 'Your {{style}} intro of {{duration}} seconds', '2025-10-21 05:51:42'),
(2, 'landscape-scenic-view', 'Scenic Landscape Video', 'video', '[\"landscape\",\"nature\",\"scenery\",\"cinematic\",\"Sora2\"]', 0, 0, 'A breathtaking {{time_of_day}} landscape shot featuring {{landscape_type}}. The camera slowly {{camera_movement}} revealing {{key_elements}}. {{weather_condition}} with {{lighting_style}} lighting. Cinematic composition, {{color_palette}} color grading, photorealistic quality, 4K detail', '2025-10-21 06:05:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prompts`
--
ALTER TABLE `prompts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prompts`
--
ALTER TABLE `prompts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
