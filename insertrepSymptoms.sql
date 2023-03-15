INSERT INTO `illness`.`repSymptoms`
(`repIllnessID`,
`bodyLocation`,
`symptom1`,
`stmptom2`)
VALUES
(28,
"head",
true,
false);

SELECT `repSymptoms`.`idrepSymptoms`,
    `repSymptoms`.`repIllnessID`,
    `repSymptoms`.`bodyLocation`,
    `repSymptoms`.`symptom1`,
    `repSymptoms`.`stmptom2`,
    `repSymptoms`.`symptom3`,
    `repSymptoms`.`symptom4`,
    `repSymptoms`.`symptom5`,
    `repSymptoms`.`symptom6(`,
    `repSymptoms`.`symptom7`,
    `repSymptoms`.`symptom8`
FROM `illness`.`repSymptoms`;

