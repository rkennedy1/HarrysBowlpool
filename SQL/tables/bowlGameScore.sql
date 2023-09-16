USE bowlpool;
DROP TABLE IF EXISTS `bowlGameScore`;
CREATE TABLE `bowlGameScore` (
`gameId` int(9) NOT NULL,
`homeFirstQuarterScore` int(3),
`homeSecondQuarterScore` int(3),
`homeThirdQuarterScore` int(3),
`homeFourthQuarterScore` int(3),
`awayFirstQuarterScore` int(3),
`awaySecondQuarterScore` int(3),
`awayThirdQuarterScore` int(3),
`awayFourthQuarterScore` int(3),
`version` int NOT NULL,
PRIMARY KEY (`gameId`)
);