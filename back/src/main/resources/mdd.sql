CREATE TABLE `USERS` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(50),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `THEMES` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(50),
  `description` VARCHAR(2000),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `SUBSCRIBE` (
  `user_id` INT, 
  `theme_id` INT
);

CREATE TABLE `ARTICLES` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(50),
  `description` VARCHAR(2000),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `user_id` integer NOT NULL,
  `theme_id` integer NOT NULL
);

CREATE TABLE `COMMENTS` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `article_id` integer NOT NULL,
  `description` VARCHAR(2000),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE `SUBSCRIBE` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `SUBSCRIBE` ADD FOREIGN KEY (`theme_id`) REFERENCES `THEMES` (`id`);
ALTER TABLE `ARTICLES` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `ARTICLES` ADD FOREIGN KEY (`theme_id`) REFERENCES `THEMES` (`id`);
ALTER TABLE `COMMENTS` ADD FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`);
ALTER TABLE `COMMENTS` ADD FOREIGN KEY (`article_id`) REFERENCES `ARTICLES` (`id`);

INSERT INTO THEMES (title, description)
VALUES ('Titre du thème #1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium faucibus massa, quis varius enim consequat semper. Curabitur fringilla interdum risus id finibus. Donec accumsan at nisl sed vestibulum.'),
       ('Titre du thème #2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium faucibus massa, quis varius enim consequat semper. Curabitur fringilla interdum risus id finibus. Donec accumsan at nisl sed vestibulum.');
