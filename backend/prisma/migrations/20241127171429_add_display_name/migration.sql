-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "account_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "avatar" TEXT,
    "delta" REAL NOT NULL,
    "solde" REAL NOT NULL,
    "last_daily_gift" DATETIME,
    "displayName" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Account" ("account_id", "avatar", "birth_date", "delta", "last_daily_gift", "mail", "nickname", "password", "solde") SELECT "account_id", "avatar", "birth_date", "delta", "last_daily_gift", "mail", "nickname", "password", "solde" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_nickname_key" ON "Account"("nickname");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
