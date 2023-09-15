USE bowlpool;
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players` (
`version` int NOT NULL,
`playerId` int(9) NOT NULL,
`name` VARCHAR(255),
`points` int(3),
`year` int(4), 
PRIMARY KEY (`playerId`)
);