-- CreateTable
CREATE TABLE `test_test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aaa` TEXT NOT NULL,
    `bbb2` TINYINT NOT NULL,
    `ccc` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `test_test_ccc_key`(`ccc`),
    INDEX `test_test_bbb2_ccc_idx`(`bbb2`, `ccc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
