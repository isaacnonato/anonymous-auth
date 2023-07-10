-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "identifier" TEXT NOT NULL PRIMARY KEY,
    "passwordHash" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "name" TEXT
);
INSERT INTO "new_User" ("identifier", "name", "passwordHash", "token") SELECT "identifier", "name", "passwordHash", "token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
