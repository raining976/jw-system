-- 创建数据库
CREATE DATABASE IF NOT EXISTS `jw_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `jw_system`;

-- 删除并创建 `course` 表
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `teacher` VARCHAR(45) NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2024 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 删除并创建 `student` 表
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` INT NOT NULL COMMENT '主键',
  `name` VARCHAR(45) NOT NULL COMMENT '姓名',
  `sex` INT NOT NULL COMMENT '性别',
  `speciality` VARCHAR(10) NOT NULL COMMENT '专业',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 删除并创建 `sc` 表
DROP TABLE IF EXISTS `sc`;
CREATE TABLE `sc` (
  `stu_id` INT NOT NULL,
  `cou_id` INT NOT NULL,
  PRIMARY KEY (`stu_id`, `cou_id`),
  KEY `cou_id_idx` (`cou_id`),
  KEY `stu_id_idx` (`stu_id`),
  CONSTRAINT `fk_cou_id` FOREIGN KEY (`cou_id`) REFERENCES `course` (`id`),
  CONSTRAINT `fk_stu_id` FOREIGN KEY (`stu_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;