-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 27. Jun 2025 um 02:18
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `fussballapp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `location_id`) VALUES
(16, 8, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `image_url_1` varchar(255) DEFAULT NULL,
  `image_url_2` varchar(255) DEFAULT NULL,
  `place_type` varchar(50) DEFAULT NULL,
  `tribune` tinyint(1) DEFAULT NULL,
  `barrier_free` tinyint(1) DEFAULT NULL,
  `cost_type` varchar(30) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `quality` varchar(30) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `locations`
--

INSERT INTO `locations` (`id`, `name`, `city`, `rating`, `size`, `latitude`, `longitude`, `address`, `opening_hours`, `image_url_1`, `image_url_2`, `place_type`, `tribune`, `barrier_free`, `cost_type`, `parking`, `quality`, `approved`) VALUES
(1, 'MEWA Arena', 'Mainz', 2, 'Groß', 49.9839442, 8.2243816, 'Eugen-Salomon-Straße 1, 55128 Mainz, Deutschland', 'Montag bis Freitag von 10:00 bis 18:30 Uhr und Samstag von 10:00 bis 14:00 Uhr', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npN6K7QAAXa2BEXwnnruDC-pWefDRVWwUgSNdLAxSaOd2uFYtJ1XPcd9VFlzMgcGQEbc75GMBMCEEts8XuZAyl4AGEWPPtf6jub5lIeUU95DektdrkSGrY5MPf9_-UTQgwp37wL=s1360-w1360-h1020-rw', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqIi2v-P6DJcn2QLihHBYGnzxEtyRk85vHvs_B13yCME0grpJAjD9oxh0pQSF-OJeF5hz0u_-KK-UoY-cucWVrJpGaO8waIig23BAMeDG1GeH6K8kiUl60wLhOdtEUG2pktf0BrHrPNngg8=s1360-w1360-h1020-rw', 'Bolzplatz', 1, 1, 'Gebühren', 1, 'Premium', 1),
(2, 'Bolzplatz Windmühlenstraße', 'Mainz', 3, 'Klein', 49.9937625, 8.2729069, 'Windmühlenstraße 12, 55116 Mainz, Deutschland', 'Open 24 hours', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrc2WX52lHtBBzKTxsOGQdxorxdktaA0ULiZmJ__OXRJ9bZUAlGiz53CeCYx7oITKlhd5N7zEUgTFRN-Eul5qrTTthI3nsQP3xEf_vUAEwzyrmaI1os_svpVzI3RIUD0Ctt30_lWg=s1360-w1360-h1020-rw', NULL, 'Bolzplatz', 0, 0, 'kostenlos', 0, 'normal', 1),
(3, 'Stadion an der Bleichstraße', 'Mainz', 4, 'Mittel', 49.9762033, 8.2946624, 'Friedrich-Ebert-Straße 18, 55130 Mainz, Deutschland', 'Täglich: 07:00–22:00', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noAOb8wupj_nbgRvKhHgJb37gMcapeyrx5-KEcity9GRPrnZVPGf33FarBW8SCkft6N1DhCXNP-3IY2eyAeN7kzl_DGmKEs5qve1KqLcBmdEYkBWkmECDTfUReAivYambIIZAyV=s1360-w1360-h1020-rw', NULL, 'Bolzplatz', 0, 1, 'kostenlos', 1, 'normal', 1),
(4, 'Bezirkssportanlage Mainz-Weisenau', 'Mainz', 4, 'Mittel', 49.9762674, 8.2944807, 'Friedrich-Ebert-Straße 18, 55130 Mainz, Deutschland', 'Mo–Fr: 08:00–18:00, Sa–So: 10:00–14:00', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrQ925kn5P0R7W1EU0X-ErTnIh5JdLakLOUSSr2YYguX53SNtPWIfWd7ntzhSiEng-NKZPaeCrJf8yc0TxyR362vW3OJQFho-QsI24e2OUSSUn2ATp3I4clopmgYiwMs9e43wzJHw=s1360-w1360-h1020-rw', NULL, 'Bolzplatz', 0, 1, 'kostenlos', 1, 'normal', 1),
(5, 'Bolzplatz An der Kirschhecke', 'Mainz', 3, 'Klein', 49.9574584, 8.2265748, '55127 Mainz, Deutschland', 'Open 24 hours', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrnxFjhEx-YcfLkhbDvTeFMGCrCoXyrAdyUNKJal-ujlLp7GL9gmKs2okc-oX15mGW_Gwa5MmvM8XL4012aieMgNmZXVnZgnfHlrY-lB1ZAlgmoyiXIYL6BQV8dDRzRhfqxng213w=s1360-w1360-h1020-rw', NULL, 'Bolzplatz', 0, 1, 'kostenlos', 0, 'normal', 1),
(6, 'Bolzplatz Am alten Sportplatz', 'Mainz', 3, 'Klein', 49.9791237, 8.1949976, '55127 Mainz, Deutschland', 'Open 24 hours', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noAQdc8MxEhgvIk-o6Q3zlaW9FyOpadz2L1ET4IXlGfY4l89_32dLDzTCgsDZcoobhNfj1aSpqb7vSRR6uY1x5g-epDL--Sw-zPAcQiqdRBW0Vkd21RQqUjPbm9nfFEnjnx6QTe=s1360-w1360-h1020-rw', NULL, 'Bolzplatz', 0, 1, 'kostenlos', 1, 'einfach', 1),
(7, 'Bruchwegstadion', 'Mainz', 3, 'Groß', 50.0009593, 8.2456943, 'Dr.-Martin-Luther-King-Weg 15, 55122 Mainz, Deutschland', 'Dienstag und Donnerstag von 10:00 bis 12:00 Uhr und von 15:00 bis 18:00 Uhr / Montag und Mittwoch von 15:00 bis 17:00 / Freitag von 10:00 bis 12:00 Uhr', 'https://lh3.googleusercontent.com/p/AF1QipNq2Mf136HOjUT19Cj6p3EVLkTem7rLyTSO0nrn=s1360-w1360-h1020-rw', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqIicdSxk6A9of1OOBMQrmWoGncl2mMbWQIgbHFEFEz-I-nNidT9xno8JYww9Facx2AvL2spJy1qTFkkHu5FnBEIWf980TtDfCJwBOirVxRfQZTBQRGXKxzeECTODX79pzBXJu_=s1360-w1360-h1020-rw', 'Bolzplatz', 1, 1, 'Gebühren', 1, 'Premium', 1),
(8, 'Turn- und Sportgemeinde Drais 1876 e.V.', 'Mainz', 4, 'Mittel', 49.9742277, 8.1868207, 'Hesslerweg 30, 55127 Mainz, Deutschland', 'Täglich geöffnet bis 23:00 Uhr', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrw-0mVsdJI4BytW9kIUfuB1q9MfGgiN-wBKq5an3gB62qEmNnEjEXs3VDDGnYzzj9d4HKsTqTDreH7fxMFhWw7leNcdQ1EvFsz1qPaUxVWha6ZXQTBTGWsv_jfGYbYfJvTRvGU=s1360-w1360-h1020-rw', NULL, 'Bolzplatz', 0, 1, 'kostenlos', 1, 'normal', 1),
(9, 'TSG 1846 Mz Bretzenheim football field', 'Mainz', 4, 'Mittel', 49.979283, 8.250707, '55128 Mainz, Deutschland', 'Open 24 hours', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nos27pZ9gnbOT-_CaP6LqOMYg0V0URFWyYEqSgQ4UlEyOUoYyKXhQO2n2DyXv1h4SQ4fbJGLldCVwwASXG1FSx_eAw8aqs-1o9TfmUoFEBll2I-Q0gMJZ0u_l3gLyd47yNwY_oF=s1360-w1360-h1020-rw', NULL, 'Rasen', 0, 1, 'kostenlos', 0, 'normal', 1),
(10, 'Sportplatz VfL Fontana Finthen', 'Mainz', 3, 'Mittel', 49.9950532, 8.1713722, 'Waldthausenstraße 87, 55126 Mainz, Deutschland', 'Täglich: 07:00–22:00', 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqpNz0OM9PhLBWYoOj6S3Yqq2WoIUCccuzbCHxEjK8qaA8oroMwTQnhV-9O7ooWyHeoqKE9RavbjBGFgEVbOW_jl3sYlzZcbgUUBnt92WAb3UGVRfhCe_B_J2cTKkfXGjdD5ATdmA=s1360-w1360-h1020-rw', NULL, 'Rasen', 0, 1, 'kostenlos', 1, 'normal', 1),
(11, 'Plaka', 'Mainz', 4, 'Mittel', 49.988019, 8.245166, 'Albert-Schweitzer-Straße 19, 55128 Mainz', '', 'https://www.scmoguntia1896.de/s/cc_images/cache_27858579.jpg', '', 'Kunstrasen', 0, 0, 'kostenlos', 0, 'normal', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `location_id`, `rating`) VALUES
(44, 9, 10, 3),
(47, 9, 10, 2),
(48, 9, 1, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('guest','user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(5, 'hana', '$2b$10$yK2o3OyJiWJMKgOhSjFlAu6M2jV.xXqzqTsrR1JgzHSV8.IngOgvm', 'user', '2025-06-23 17:09:52'),
(8, 'lukas', '$2b$10$r7j.DefPprNLceTcK/RZEOkuQviCW.lfZaDXw7iX0.2D6X41SJTvS', 'admin', '2025-06-25 23:11:38'),
(9, 'test', '$2b$10$g2D3pw/lsvq.tZQs3DN1Nuqh2RXgJ7M06jeU.bQqhxhBUyQW.6bSm', 'user', '2025-06-26 22:10:48');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indizes für die Tabelle `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT für Tabelle `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Constraints der Tabelle `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
