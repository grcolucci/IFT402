DELETE FROM `illness`.`VenueTypes`
WHERE IDVenueTypes >= 0;
INSERT INTO `illness`.`VenueTypes`
(`IDVenueTypes`,
`type`)
VALUES
(0,"Restaurant"),(1,"School"),(2,"Stadium");
