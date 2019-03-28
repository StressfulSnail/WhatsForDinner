CREATE TABLE `account_invitation` (
  `invitation_id` INT NOT NULL AUTO_INCREMENT,
  `account_id` INT NOT NULL,
  `invitation_key` VARCHAR(255) NOT NULL,
  `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`invitation_id`),
  UNIQUE KEY unique_invitation_key (`invitation_key`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`)
);