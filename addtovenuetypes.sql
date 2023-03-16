DELETE FROM `illness`.`VenueTypes`
WHERE IDVenueTypes >= 0;
INSERT INTO `illness`.`VenueTypes`
(`IDVenueTypes`,
`type`)
VALUES
(1,"Restaurant"),(2,"School"),(3,"Stadium");
