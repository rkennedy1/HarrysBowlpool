USE bowlpool;
DROP TABLE IF EXISTS `bowlGames`;
CREATE TABLE `bowlGames` (
`gameId` int(9) NOT NULL,
`startTime` datetime,
`homeTeam` int(9),
`awayTeam` int(9),
`bowlName` VARCHAR(255),
`version` int NOT NULL,
PRIMARY KEY (`gameId`)
);