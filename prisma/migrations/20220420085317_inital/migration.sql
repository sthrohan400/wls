-- CreateTable
CREATE TABLE "contestants" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "contestants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotteries" (
    "id" SERIAL NOT NULL,
    "drawDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lotteries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotteriesContestants" (
    "id" SERIAL NOT NULL,
    "ticket" TEXT NOT NULL,
    "lotteryId" INTEGER NOT NULL,
    "contestantId" INTEGER NOT NULL,

    CONSTRAINT "lotteriesContestants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotteriesWinners" (
    "ticket" TEXT NOT NULL,
    "winnerId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "contestants_email_key" ON "contestants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lotteries_drawDate_key" ON "lotteries"("drawDate");

-- CreateIndex
CREATE UNIQUE INDEX "lotteriesContestants_ticket_key" ON "lotteriesContestants"("ticket");

-- CreateIndex
CREATE UNIQUE INDEX "lotteryid_contestantid_unique_constraint" ON "lotteriesContestants"("lotteryId", "contestantId");

-- CreateIndex
CREATE UNIQUE INDEX "lotteriesWinners_ticket_key" ON "lotteriesWinners"("ticket");

-- AddForeignKey
ALTER TABLE "lotteriesContestants" ADD CONSTRAINT "lotteriesContestants_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "contestants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotteriesContestants" ADD CONSTRAINT "lotteriesContestants_lotteryId_fkey" FOREIGN KEY ("lotteryId") REFERENCES "lotteries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotteriesWinners" ADD CONSTRAINT "lotteriesWinners_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "lotteriesContestants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
