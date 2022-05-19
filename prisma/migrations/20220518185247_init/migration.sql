-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profile_picture` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `joined_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `status` ENUM('ACTIVE', 'SUSPENDED', 'BANNED') NOT NULL DEFAULT 'ACTIVE',
    `nickname` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('USER', 'ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `status` ENUM('ACTIVE', 'SUSPENDED', 'BANNED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `score_by_emoji` VARCHAR(191) NULL,
    `score_by_stars` DECIMAL(65, 30) NULL,
    `seen_mark` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `movie_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `film_description` TEXT NOT NULL,
    `movie_banner` VARCHAR(191) NOT NULL,
    `audience_score` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    `release_date` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `link_wiki` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `status` ENUM('ACTIVE', 'SUSPENDED', 'BANNED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `original_title` VARCHAR(191) NOT NULL,
    `romaji_title` VARCHAR(191) NULL,

    UNIQUE INDEX `titles_title_key`(`title`),
    UNIQUE INDEX `titles_original_title_key`(`original_title`),
    UNIQUE INDEX `titles_romaji_title_key`(`romaji_title`),
    UNIQUE INDEX `titles_movie_id_key`(`movie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `directors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `directors_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `musicians` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `musicians_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `writers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `writers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MoviesToMusicians` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MoviesToMusicians_AB_unique`(`A`, `B`),
    INDEX `_MoviesToMusicians_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MoviesToWriters` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MoviesToWriters_AB_unique`(`A`, `B`),
    INDEX `_MoviesToWriters_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DirectorsToMovies` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DirectorsToMovies_AB_unique`(`A`, `B`),
    INDEX `_DirectorsToMovies_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interactions` ADD CONSTRAINT `interactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interactions` ADD CONSTRAINT `interactions_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titles` ADD CONSTRAINT `titles_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoviesToMusicians` ADD CONSTRAINT `_MoviesToMusicians_A_fkey` FOREIGN KEY (`A`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoviesToMusicians` ADD CONSTRAINT `_MoviesToMusicians_B_fkey` FOREIGN KEY (`B`) REFERENCES `musicians`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoviesToWriters` ADD CONSTRAINT `_MoviesToWriters_A_fkey` FOREIGN KEY (`A`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoviesToWriters` ADD CONSTRAINT `_MoviesToWriters_B_fkey` FOREIGN KEY (`B`) REFERENCES `writers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DirectorsToMovies` ADD CONSTRAINT `_DirectorsToMovies_A_fkey` FOREIGN KEY (`A`) REFERENCES `directors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DirectorsToMovies` ADD CONSTRAINT `_DirectorsToMovies_B_fkey` FOREIGN KEY (`B`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
