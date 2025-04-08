/*
  Warnings:

  - You are about to drop the column `amount` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `matchid` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `odds` on the `Bet` table. All the data in the column will be lost.
  - Added the required column `betAmount` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchId` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potentialWinnings` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bet" (
    "bet_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,
    "betAmount" REAL NOT NULL,
    "potentialWinnings" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "Bet_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bet" ("account_id", "bet_id", "status") SELECT "account_id", "bet_id", "status" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
