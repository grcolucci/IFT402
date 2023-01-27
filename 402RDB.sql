-- MySQL Script generated by MySQL Workbench
-- Thu Jan 26 10:53:54 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`VenueTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`VenueTypes` ;

CREATE TABLE IF NOT EXISTS `mydb`.`VenueTypes` (
  `idVenueTypes` INT NOT NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`idVenueTypes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Venues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Venues` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Venues` (
  `idVenues` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `streetAddr` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NULL,
  `type` INT NULL,
  PRIMARY KEY (`idVenues`),
  INDEX `idVenueType_idx` (`type` ASC) VISIBLE,
  CONSTRAINT `idVenueType`
    FOREIGN KEY (`type`)
    REFERENCES `mydb`.`VenueTypes` (`idVenueTypes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UserInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`UserInfo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`UserInfo` (
  `idUSerInfo` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `streetAddr` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NULL,
  `USerInfocol` VARCHAR(45) NULL,
  PRIMARY KEY (`idUSerInfo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`UserLocations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`UserLocations` ;

CREATE TABLE IF NOT EXISTS `mydb`.`UserLocations` (
  `idUserLocations` INT NOT NULL,
  `idUser` INT NULL,
  `idVenue` INT NULL,
  `zipcode` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `streetAddess` VARCHAR(45) NULL,
  PRIMARY KEY (`idUserLocations`),
  INDEX `idUserInfo_idx` (`idUser` ASC) VISIBLE,
  INDEX `idVenues_idx` (`idVenue` ASC) VISIBLE,
  CONSTRAINT `idUserInfo`
    FOREIGN KEY (`idUser`)
    REFERENCES `mydb`.`UserInfo` (`idUSerInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idVenues`
    FOREIGN KEY (`idVenue`)
    REFERENCES `mydb`.`Venues` (`idVenues`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
