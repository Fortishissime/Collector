-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bet" (
    "bet_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "matchId" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,
    "betAmount" REAL NOT NULL,
    "potentialWinnings" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "Bet_nickname_fkey" FOREIGN KEY ("nickname") REFERENCES "Account" ("nickname") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bet" ("betAmount", "bet_id", "date", "matchId", "nickname", "potentialWinnings", "status", "teamName") SELECT "betAmount", "bet_id", "date", "matchId", "nickname", "potentialWinnings", "status", "teamName" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
