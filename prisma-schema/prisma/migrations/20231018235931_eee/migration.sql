-- CreateTable
CREATE TABLE `Aaa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `role` ENUM('BBB', 'CCC', 'DDD') NOT NULL DEFAULT 'CCC',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
