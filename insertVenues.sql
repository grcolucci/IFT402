DELETE FROM `illness`.`Venues`
WHERE IDVenues >= 0;
INSERT INTO `illness`.`Venues`
(`idVenues`,
`name`,
`streetAddr`,
`city`,
`state`,
`zipcode`,
`countrycode`,
`type`)
VALUES
(1,
"SOFI Stadium",
"Somewhere in LA",
"Los Angeles",
"CA",
"95459",
"USA",
3);

INSERT INTO `illness`.`Venues`
(
`name`,
`streetAddr`,
`city`,
`state`,
`zipcode`,
`countrycode`,
`type`)
VALUES
("Giants Stadium",
"some highway",
"East Rutherford",
"NJ",
"07463",
"USA",
3),
("Clydes Restaurant",
"123 Broadlands Blvd",
"Ashburn",
"VA",
"20147",
"USA",
1)
;
