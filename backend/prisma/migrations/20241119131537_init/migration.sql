-- CreateTable
CREATE TABLE "Account" (
    "account_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "avatar" TEXT,
    "delta" REAL NOT NULL,
    "solde" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Bet" (
    "bet_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "matchid" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "odds" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Bet_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BetDelta" (
    "delta_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "solde" REAL NOT NULL,
    CONSTRAINT "BetDelta_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("account_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_nickname_key" ON "Account"("nickname");
