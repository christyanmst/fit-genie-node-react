-- AlterTable
ALTER TABLE `users` ADD COLUMN `height` DECIMAL(65, 30) NULL,
    ADD COLUMN `weight` DECIMAL(65, 30) NULL;

-- CreateTable
CREATE TABLE `training_sheets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `training_sheets_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `training_sheet_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `repetitions` INTEGER NOT NULL,
    `series` INTEGER NOT NULL,
    `link` VARCHAR(250) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `training_sheets` ADD CONSTRAINT `training_sheets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `training_sheets_items` ADD CONSTRAINT `training_sheets_items_training_sheet_id_fkey` FOREIGN KEY (`training_sheet_id`) REFERENCES `training_sheets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
