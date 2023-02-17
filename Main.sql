CREATE TABLE `userinfo` (
  `idUSerInfo` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `streetAddr` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `USerInfocol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUSerInfo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
CREATE TABLE `userlocations` (
  `idUserLocations` int NOT NULL,
  `idUser` int DEFAULT NULL,
  `idVenue` int DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `streetAddess` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUserLocations`),
  KEY `idUserInfo_idx` (`idUser`),
  KEY `idVenues_idx` (`idVenue`),
  CONSTRAINT `idUserInfo` FOREIGN KEY (`idUser`) REFERENCES `userinfo` (`idUSerInfo`),
  CONSTRAINT `idVenues` FOREIGN KEY (`idVenue`) REFERENCES `venues` (`idVenues`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
CREATE TABLE `venues` (
  `idVenues` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `streetAddr` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zipcode` varchar(45) DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`idVenues`),
  KEY `idVenueType_idx` (`type`),
  CONSTRAINT `idVenueType` FOREIGN KEY (`type`) REFERENCES `venuetypes` (`idVenueTypes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
CREATE TABLE `venuetypes` (
  `idVenueTypes` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idVenueTypes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
INSERT INTO `mydb`.`venuetypes`
(`idVenueTypes`,
`type`)INSERT INTO `mydb`.`venues`
(`idVenues`,
`name`,
`streetAddr`,
`city`,
`state`,
`zipcode`,
`type`)
VALUES
(<{idVenues: }>,
<{name: }>,
<{streetAddr: }>,
<{city: }>,
<{state: }>,
<{zipcode: }>,
<{type: }>);
INSERT INTO `mydb`.`userlocations`
(`idUserLocations`,
`idUser`,
`idVenue`,
`zipcode`,
`state`,
`city`,
`streetAddess`)
VALUES
(<{idUserLocations: }>,
<{idUser: }>,
<{idVenue: }>,
<{zipcode: }>,
<{state: }>,
<{city: }>,
<{streetAddess: }>);
INSERT INTO `mydb`.`userinfo`
(`idUSerInfo`,
`name`,
`streetAddr`,
`city`,
`state`,
`zipcode`,
`USerInfocol`)
VALUES
(<{idUSerInfo: }>,
<{name: }>,
<{streetAddr: }>,
<{city: }>,
<{state: }>,
<{zipcode: }>,
<{USerInfocol: }>);

VALUES
(<{idVenueTypes: }>,
<{type: }>);
