/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "identifier" TEXT NOT NULL PRIMARY KEY,
    "passwordHash" TEXT NOT NULL DEFAULT 'a',
    "name" TEXT
);
INSERT INTO "new_User" ("identifier", "name") SELECT "identifier", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
