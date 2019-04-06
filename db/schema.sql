CREATE DATABASE whats_for_dinner;
  USE whats_for_dinner;

  CREATE TABLE `account` (
    `account_id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `payment_info` VARCHAR(50),
    `first_name` VARCHAR(50),
    `middle_name` VARCHAR(50),
    `last_name` VARCHAR(50),
    `sub_level` TINYINT NOT NULL,
    `confirmed` TINYINT NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`account_id`),
    UNIQUE KEY unique_email (`email`),
    UNIQUE KEY unique_username (`username`)
  );

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

  CREATE TABLE `meal_plan` (
    `meal_plan_id` INT NOT NULL AUTO_INCREMENT,
    `account_id` INT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`meal_plan_id`),
    FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`)
  );

  CREATE TABLE `recipe` (
    `recipe_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `image_url` VARCHAR(255),
    `cook_time` INT,
    `prep_time` INT,
    `caloric_est` INT,
    `prep_instructions` TEXT,
    `taste_rating` TINYINT,
    `difficulty_rating` TINYINT,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (`name`),
    PRIMARY KEY (`recipe_id`)
  );

  CREATE TABLE `personal_recipe` (
    `recipe_id` INT NOT NULL,
    `account_id` INT NOT NULL,
    `note` VARCHAR(255),
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`recipe_id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`),
    FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`)
  );

  CREATE TABLE `shared_recipe` (
    `recipe_id` INT NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`recipe_id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`)
  );

  CREATE TABLE `tag_type` (
    `tag_type_id` INT NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(15) NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`tag_type_id`),
    UNIQUE KEY unique_type_name (`type_name`)
  );

  CREATE TABLE `tag` (
    `tag_id` INT NOT NULL AUTO_INCREMENT,
    `tag_type_id` INT NOT NULL,
    `tag_name` VARCHAR(15) NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`tag_id`),
    UNIQUE KEY unique_tag_name (`tag_name`),
    FOREIGN KEY (`tag_type_id`) REFERENCES `tag_type`(`tag_type_id`)
  );


  CREATE TABLE `recipe_tag` (
    `recipe_id` INT NOT NULL,
    `tag_id` INT NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`recipe_id`, `tag_id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`),
    FOREIGN KEY (`tag_id`) REFERENCES `tag`(`tag_id`)
  );

  CREATE TABLE `measurement_unit` (
    `unit_id` INT NOT NULL AUTO_INCREMENT,
    `unit_name` VARCHAR(15) NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`unit_id`),
    UNIQUE KEY unique_unit_name (`unit_name`)
  );

  CREATE TABLE `ingredient` (
    `ingredient_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ingredient_id`),
    UNIQUE KEY unique_name (`name`)
  );

  CREATE TABLE `ingredient_count` (
    `recipe_id` INT NOT NULL,
    `ingredient_id` INT NOT NULL,
    `unit_id` INT NOT NULL,
    `measurement` FLOAT NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`recipe_id`, `ingredient_id`),
    FOREIGN KEY (`unit_id`) REFERENCES `measurement_unit`(`unit_id`)
  );

  CREATE TABLE `meal` (
    `meal_id` INT NOT NULL AUTO_INCREMENT,
    `meal_plan_id` INT NOT NULL,
    `meal_date_time` DATETIME NOT NULL,
    `servings_required` INT,
    `note` VARCHAR(255),
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`meal_id`),
    FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plan`(`meal_plan_id`)
  );

  CREATE TABLE `meal_recipe` (
    `meal_id` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`meal_id`, `recipe_id`),
    FOREIGN KEY (`meal_id`) REFERENCES `meal`(`meal_id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`)
  );

  CREATE TABLE `comment` (
    `comment_id` INT NOT NULL AUTO_INCREMENT,
    `recipe_id` INT NOT NULL,
    `account_id` INT NOT NULL,
    `comment_date` DATETIME NOT NULL,
    `comment_text` VARCHAR(255) NOT NULL,
    `created_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modified_on` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`comment_id`),
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe`(`recipe_id`),
    FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`)
  );