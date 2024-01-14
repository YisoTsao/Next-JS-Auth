/*
  Warnings:

  - Added the required column `actions` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `actions` VARCHAR(191) NOT NULL,
    ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `team` VARCHAR(191) NOT NULL;
