-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 21, 2020 at 06:55 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `agent`
--

CREATE TABLE `agent` (
  `ag_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `nic_passport` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `reg_date` varchar(10) NOT NULL,
  `description` varchar(500) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `status` enum('ACTIVE','INACTIVE','REMOVED','BLOCKED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `blcked_agent`
--

CREATE TABLE `blcked_agent` (
  `block_id` int(11) NOT NULL,
  `ag_id` int(11) NOT NULL,
  `blocked_date` varchar(10) NOT NULL,
  `reason` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Table structure for table `blocked_client`
--

CREATE TABLE `blocked_client` (
  `block_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `blocked_date` varchar(10) NOT NULL,
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
-- Table structure for table `blocked_worker`
--

CREATE TABLE `blocked_worker` (
  `block_id` int(11) NOT NULL,
  `w_id` int(11) NOT NULL,
  `blocked_date` varchar(10) NOT NULL,
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
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `c_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `nic_passport` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `reg_date` varchar(10) NOT NULL,
  `description` varchar(500) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `status` enum('ACTIVE','INACTIVE','REMOVED','BLOCKED') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`c_id`, `index_no`, `nic_passport`, `name`, `reg_date`, `description`, `address`, `telephone`, `email`, `status`) VALUES
(17, 'C-20820-74655', '1111111', 'saman', '2020-08-25', 'saman', 'matara', '1111111', 'saman@gmail.com', 'ACTIVE');

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

--
-- Dumping data for table `machinery`
--

INSERT INTO `machinery` (`m_id`, `index_no`, `reg_id`, `reg_date`, `status`, `category`, `description`, `owner_index_no`) VALUES
(47, 'M-20820-870', '1111111', '2020-08-20', 'ACTIVE', 'VEHICLE', '1111111', 'C-20820-74655');

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

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`o_id`, `index_no`, `reg_date`, `status`, `address`, `telephone`, `email`, `description`, `reg_id`, `c_id`) VALUES
(7, 'O-20817-10326', '2020-08-17', 'ACTIVE', '234124242', '34545', '3453414', '234242', '32424', '12');

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
(5, 13, 'P-2082-192', '2020-08-02', 'DSAFs', '2020-08-28', 24, '2.00', 'PROPOSED', 5, 12, 18);

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `s_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `reg_date` date NOT NULL,
  `description` varchar(500) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `c_id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `site`
--

INSERT INTO `site` (`s_id`, `index_no`, `reg_date`, `description`, `address`, `telephone`, `email`, `c_id`, `status`) VALUES
(5, 'W-2082-192343', '2020-08-02', 'SADAD', 'SDFAF', '11111', 'ASDFA@DSF', 12, 'ACTIVE');

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
-- Table structure for table `worker`
--

CREATE TABLE `worker` (
  `w_id` int(11) NOT NULL,
  `index_no` varchar(20) NOT NULL,
  `nic_passport` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `reg_date` varchar(10) NOT NULL,
  `site` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `status` enum('ACTIVE','INACTIVE','REMOVED','BLOCKED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`ag_id`),
  ADD KEY `index_no` (`index_no`);

--
-- Indexes for table `agreement`
--
ALTER TABLE `agreement`
  ADD PRIMARY KEY (`a_id`),
  ADD KEY `customer_index_no` (`customer_index_no`);

--
-- Indexes for table `blcked_agent`
--
ALTER TABLE `blcked_agent`
  ADD PRIMARY KEY (`block_id`),
  ADD KEY `ag_id` (`ag_id`);

--
-- Indexes for table `blocked_agreement`
--
ALTER TABLE `blocked_agreement`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `blocked_client`
--
ALTER TABLE `blocked_client`
  ADD PRIMARY KEY (`block_id`),
  ADD KEY `c_id` (`c_id`);

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
-- Indexes for table `blocked_worker`
--
ALTER TABLE `blocked_worker`
  ADD PRIMARY KEY (`block_id`),
  ADD KEY `w_id` (`w_id`);

--
-- Indexes for table `blocked_workhouse`
--
ALTER TABLE `blocked_workhouse`
  ADD PRIMARY KEY (`w_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
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
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`w_id`),
  ADD KEY `index_no` (`index_no`),
  ADD KEY `site` (`site`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agent`
--
ALTER TABLE `agent`
  MODIFY `ag_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agreement`
--
ALTER TABLE `agreement`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `blcked_agent`
--
ALTER TABLE `blcked_agent`
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blocked_client`
--
ALTER TABLE `blocked_client`
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT for table `blocked_worker`
--
ALTER TABLE `blocked_worker`
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blocked_workhouse`
--
ALTER TABLE `blocked_workhouse`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222223;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `machinery`
--
ALTER TABLE `machinery`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `o_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `worker`
--
ALTER TABLE `worker`
  MODIFY `w_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agreement`
--
ALTER TABLE `agreement`
  ADD CONSTRAINT `agreement_ibfk_1` FOREIGN KEY (`customer_index_no`) REFERENCES `client` (`index_no`) ON DELETE CASCADE;

--
-- Constraints for table `blcked_agent`
--
ALTER TABLE `blcked_agent`
  ADD CONSTRAINT `blcked_agent_ibfk_1` FOREIGN KEY (`ag_id`) REFERENCES `agent` (`ag_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blocked_agreement`
--
ALTER TABLE `blocked_agreement`
  ADD CONSTRAINT `blocked_agreement_ibfk_1` FOREIGN KEY (`a_id`) REFERENCES `agreement` (`a_id`) ON DELETE CASCADE;

--
-- Constraints for table `blocked_client`
--
ALTER TABLE `blocked_client`
  ADD CONSTRAINT `blocked_client_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `client` (`c_id`) ON DELETE CASCADE;

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
-- Constraints for table `blocked_worker`
--
ALTER TABLE `blocked_worker`
  ADD CONSTRAINT `blocked_worker_ibfk_1` FOREIGN KEY (`w_id`) REFERENCES `worker` (`w_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `machinery`
--
ALTER TABLE `machinery`
  ADD CONSTRAINT `machinery_ibfk_1` FOREIGN KEY (`owner_index_no`) REFERENCES `client` (`index_no`);

--
-- Constraints for table `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `worker_ibfk_1` FOREIGN KEY (`site`) REFERENCES `site` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
