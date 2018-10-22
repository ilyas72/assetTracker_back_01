-- create database addressbook;
-- use addressbook;

CREATE SCHEMA AssetTracker_LoanSystem;
use AssetTracker_LoanSystem;

CREATE TABLE user (
  user_id INT(11) NOT NULL AUTO_INCREMENT ,
  name VARCHAR(45) NOT NULL ,
  email VARCHAR(45) NOT NULL,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id)
);

CREATE TABLE asset (
  asset_id INT(11) NOT NULL ,
  asset_type VARCHAR(45) NOT NULL ,
  asset_name VARCHAR(45) NOT NULL ,
  asset_status enum('In','Out') NOT NULL,

  PRIMARY KEY(asset_id)
);

CREATE TABLE loan (
  loan_id INT(11) NOT NULL,
  asset_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,  
  loan_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  return_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  message VARCHAR(100) NOT NULL,
  
  PRIMARY KEY (loan_id),
  CONSTRAINT fk_loan_asset FOREIGN KEY (asset_id) REFERENCES asset(asset_id),
  CONSTRAINT fk_loan_user FOREIGN KEY (user_id) REFERENCES user(user_id)
);

