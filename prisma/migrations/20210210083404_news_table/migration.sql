-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "newsTitle" TEXT,
    "newsDetails" TEXT,
    "newsImage" TEXT,
    "newsUrl" TEXT,
    "newsType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
