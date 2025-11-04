-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2025 at 09:51 AM
-- Server version: 10.4.32-MariaDB
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
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `prompts`
--

INSERT INTO `prompts` (`id`, `slug`, `title`, `type`, `tags`, `rating`, `likes`, `prompt`, `created_at`, `user_id`) VALUES
(1, 'anime-video-intro', 'Anime Video Intro', 'video', '[\"anime\",\"intro\"]', 0, 0, 'Your {{style}} intro of {{duration}} seconds', '2025-10-21 05:51:42', NULL),
(2, 'landscape-scenic-view', 'Scenic Landscape Video', 'video', '[\"landscape\",\"nature\",\"scenery\",\"cinematic\",\"Sora2\"]', 0, 0, 'A breathtaking {{time_of_day}} landscape shot featuring {{landscape_type}}. The camera slowly {{camera_movement}} revealing {{key_elements}}. {{weather_condition}} with {{lighting_style}} lighting. Cinematic composition, {{color_palette}} color grading, photorealistic quality, 4K detail', '2025-10-21 06:05:49', NULL),
(6, 'TEST', 'TEST', 'video', '[\"TEST\"]', 0, 0, 'TEST', '2025-10-28 08:54:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'test', 'test@asd.com', 'test'),
(2, 'test1', 'test1asd@sad', 'test'),
(3, 'testnew', 'test1@asd.com', 'test'),
(4, 'new', 'new@gmail.com', 'new');

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_users_username` (`username`),
  ADD UNIQUE KEY `uq_users_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prompts`
--
ALTER TABLE `prompts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
