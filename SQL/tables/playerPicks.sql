USE bowlpool;
DROP TABLE IF EXISTS `playerPicks`;
CREATE TABLE `playerPicks` (
`pickId` BIGINT(13) NOT NULL,
`playerId` int(9) NOT NULL,
`gameId` int(9) NOT NULL,
`isHome` boolean,
`version` int NOT NULL,
PRIMARY KEY (`pickId`)
);