USE bowlpool;
DROP TABLE IF EXISTS `bowlTeams`;
CREATE TABLE `bowlTeams` (
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

USE bowlpool;
DROP TABLE IF EXISTS `bowlGames`;
CREATE TABLE `bowlGames` (
`gameId` int(9) NOT NULL,
`startTime` datetime,
`homeTeam` int(9),
`awayTeam` int(9),
`bowlName` VARCHAR(255),
PRIMARY KEY (`gameId`)
);

USE bowlpool;
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players` (
`playerId` int(9) NOT NULL,
`name` VARCHAR(255),
`points` int(3),
`year` int(4), 
PRIMARY KEY (`playerId`)
);

USE bowlpool;
DROP TABLE IF EXISTS `playerPicks`;
CREATE TABLE `playerPicks` (
`pickId` BIGINT(13) NOT NULL,
`playerId` int(9) NOT NULL,
`gameId` int(9) NOT NULL,
`isHome` boolean,
PRIMARY KEY (`pickId`)
);