CREATE TABLE `users`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `full_name`  VARCHAR(100) NOT NULL,
    `role`       VARCHAR(100) NOT NULL,
    `efficiency` INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
);
