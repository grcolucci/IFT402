DELETE FROM `illness`.`venueTypes`
WHERE ID >= 0;
INSERT INTO `illness`.`venueTypes`
(`ID`,
`type`)
VALUES
(0,"Restaurant"),(1,"School"),(2,"Stadium");
