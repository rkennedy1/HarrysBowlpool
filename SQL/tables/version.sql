USE bowlpool;
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version` (
  `year` int NOT NULL,
  `currentVersion` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`year`))