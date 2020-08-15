-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2020 at 09:03 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database`
--

-- --------------------------------------------------------

--
-- Table structure for table `agreement`
--

CREATE TABLE `agreement` (
  `a_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `reg_date` date NOT NULL,
  `reg_id` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('ACTIVE','REMOVED','BLOCKED','EXPIRED') NOT NULL DEFAULT 'ACTIVE',
  `customer_index_no` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `agreement`
--

INSERT INTO `agreement` (`a_id`, `index_no`, `reg_date`, `reg_id`, `description`, `start_date`, `end_date`, `status`, `customer_index_no`) VALUES
(18, 'A-2082-192249', '2020-08-02', '32413', 'fdasdasd', '2020-08-07', '2020-08-27', 'ACTIVE', 'C-2082-192224');

-- --------------------------------------------------------

--
-- Table structure for table `blocked_agreement`
--

CREATE TABLE `blocked_agreement` (
  `a_id` int(11) NOT NULL,
  `blocked_date` date NOT NULL,
  `reason` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blocked_customer`
--

CREATE TABLE `blocked_customer` (
  `c_id` int(11) NOT NULL,
  `blocked_date` date NOT NULL,
  `reason` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blocked_machinery`
--

CREATE TABLE `blocked_machinery` (
  `m_id` int(11) NOT NULL,
  `blocked_date` date NOT NULL,
  `reason` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blocked_organization`
--

CREATE TABLE `blocked_organization` (
  `o_id` int(11) NOT NULL,
  `blocked_date` date NOT NULL,
  `reason` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blocked_workhouse`
--

CREATE TABLE `blocked_workhouse` (
  `w_id` int(11) NOT NULL,
  `blocked_date` date NOT NULL,
  `reason` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `c_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nic_passport` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `description` varchar(500) NOT NULL,
  `reg_date` date NOT NULL,
  `status` enum('ACTIVE','REMOVED','BLOCKED') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`c_id`, `index_no`, `name`, `nic_passport`, `address`, `telephone`, `email`, `description`, `reg_date`, `status`) VALUES
(12, 'C-2082-192224', 'hfhkhg', '6164', 'dfsvsd', '324234', 'dsfs@efe', 'asdfaf', '2020-08-02', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `machinery`
--

CREATE TABLE `machinery` (
  `m_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `reg_id` varchar(100) NOT NULL,
  `reg_date` date NOT NULL,
  `status` enum('ACTIVE','REMOVED','BLOCKED','') NOT NULL DEFAULT 'ACTIVE',
  `category` enum('VEHICLE','TOOL') DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `owner_index_no` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `o_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `reg_date` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `description` varchar(500) NOT NULL,
  `reg_id` varchar(20) NOT NULL,
  `c_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `p_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `index_no` varchar(10) NOT NULL,
  `reg_date` date NOT NULL,
  `description` varchar(200) NOT NULL,
  `estimated_start` date NOT NULL,
  `estimated_days` smallint(6) NOT NULL,
  `estimated_value` decimal(15,2) NOT NULL,
  `status` enum('PROPOSED','STARTED','DONE','CANCEL','PAYED') NOT NULL DEFAULT 'PROPOSED',
  `workhouse_id` int(11) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `agreement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`p_id`, `owner_id`, `index_no`, `reg_date`, `description`, `estimated_start`, `estimated_days`, `estimated_value`, `status`, `workhouse_id`, `agent_id`, `agreement_id`) VALUES
(5, 12, 'P-2082-192', '2020-08-02', 'DSAF', '2020-08-20', 2, '0.00', 'PROPOSED', 5, 12, 18);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(3, 'AA', 'WLsRnDVROkUdJNwg7w6QMeyFs1v8kZ0mPn5dmGiQnLU=');

-- --------------------------------------------------------

--
-- Table structure for table `workhouse`
--

CREATE TABLE `workhouse` (
  `w_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `reg_date` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `description` varchar(500) NOT NULL,
  `c_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workhouse`
--

INSERT INTO `workhouse` (`w_id`, `index_no`, `reg_date`, `status`, `address`, `telephone`, `email`, `description`, `c_id`) VALUES
(5, 'W-2082-192343', '2020-08-02', 'ACTIVE', 'SDFAF', 'SDAFA', 'ASDFA@DSF', 'SADAD', '12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agreement`
--
ALTER TABLE `agreement`
  ADD PRIMARY KEY (`a_id`),
  ADD KEY `customer_index_no` (`customer_index_no`);

--
-- Indexes for table `blocked_agreement`
--
ALTER TABLE `blocked_agreement`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `blocked_customer`
--
ALTER TABLE `blocked_customer`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `blocked_machinery`
--
ALTER TABLE `blocked_machinery`
  ADD PRIMARY KEY (`m_id`);

--
-- Indexes for table `blocked_organization`
--
ALTER TABLE `blocked_organization`
  ADD PRIMARY KEY (`o_id`);

--
-- Indexes for table `blocked_workhouse`
--
ALTER TABLE `blocked_workhouse`
  ADD PRIMARY KEY (`w_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`c_id`,`index_no`),
  ADD KEY `index_no` (`index_no`);

--
-- Indexes for table `machinery`
--
ALTER TABLE `machinery`
  ADD PRIMARY KEY (`m_id`),
  ADD KEY `owner_index_no` (`owner_index_no`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`o_id`),
  ADD KEY `c_id` (`c_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workhouse`
--
ALTER TABLE `workhouse`
  ADD PRIMARY KEY (`w_id`),
  ADD KEY `c_id` (`c_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agreement`
--
ALTER TABLE `agreement`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `blocked_customer`
--
ALTER TABLE `blocked_customer`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `blocked_machinery`
--
ALTER TABLE `blocked_machinery`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `blocked_organization`
--
ALTER TABLE `blocked_organization`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blocked_workhouse`
--
ALTER TABLE `blocked_workhouse`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222223;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `machinery`
--
ALTER TABLE `machinery`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `workhouse`
--
ALTER TABLE `workhouse`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agreement`
--
ALTER TABLE `agreement`
  ADD CONSTRAINT `agreement_ibfk_1` FOREIGN KEY (`customer_index_no`) REFERENCES `customer` (`index_no`) ON DELETE CASCADE;

--
-- Constraints for table `blocked_agreement`
--
ALTER TABLE `blocked_agreement`
  ADD CONSTRAINT `blocked_agreement_ibfk_1` FOREIGN KEY (`a_id`) REFERENCES `agreement` (`a_id`) ON DELETE CASCADE;

--
-- Constraints for table `blocked_customer`
--
ALTER TABLE `blocked_customer`
  ADD CONSTRAINT `blocked_customer_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `customer` (`c_id`) ON DELETE CASCADE;

--
-- Constraints for table `blocked_machinery`
--
ALTER TABLE `blocked_machinery`
  ADD CONSTRAINT `blocked_machinery_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `machinery` (`m_id`) ON DELETE CASCADE;

--
-- Constraints for table `blocked_organization`
--
ALTER TABLE `blocked_organization`
  ADD CONSTRAINT `blocked_organization_ibfk_1` FOREIGN KEY (`o_id`) REFERENCES `organization` (`o_id`) ON DELETE CASCADE;

--
-- Constraints for table `machinery`
--
ALTER TABLE `machinery`
  ADD CONSTRAINT `machinery_ibfk_1` FOREIGN KEY (`owner_index_no`) REFERENCES `customer` (`index_no`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
