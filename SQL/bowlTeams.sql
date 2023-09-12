USE bowlpool;
DROP TABLE IF EXISTS `bowlTeams`;
CREATE TABLE `bowlTeams` (
`version` int NOT NULL,
`teamId` int(8) NOT NULL,
`bowlId` int(9),
`year` VARCHAR(4),
`name` VARCHAR(255),
`isHome` VARCHAR(255),
`line` VARCHAR(255),
`record` VARCHAR(255),
`conference` VARCHAR(255),
`firstQuarterScore` INT(2),
`secondQuarterScore` INT(2),
`thirdQuarterScore` INT(2),
`fourthQuarterScore` INT(2),
`score` INT(3),
PRIMARY KEY (`teamId`)
);