-- CreateTable
CREATE TABLE "Client" (
    "clientId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "irdNumber" TEXT NOT NULL,
    "citizenship" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "salutation" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "avatar" TEXT,
    "timeZone" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "Account" (
    "accountId" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "remainingBalance" INTEGER NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "effectiveDate" TEXT NOT NULL,
    "effectiveDateEnd" TEXT NOT NULL,
    "maturityDate" TEXT NOT NULL,
    "paymentFrequency" TEXT NOT NULL,
    "nextPaymentDate" TEXT NOT NULL,
    "nextPaymentAmount" INTEGER NOT NULL,
    "lastPaymentDate" TEXT NOT NULL,
    "lastPaymentAmount" INTEGER NOT NULL,
    "loanType" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "requireRefix" BOOLEAN NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "paidAmount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "transactionDate" TEXT NOT NULL,
    "paidAt" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "remainingBalance" INTEGER NOT NULL,
    "referenceId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "InterestRate" (
    "rateId" TEXT NOT NULL,
    "fixedRate" DOUBLE PRECISION NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "rateType" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "InterestRate_pkey" PRIMARY KEY ("rateId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientId_key" ON "Client"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_irdNumber_key" ON "Client"("irdNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountId_key" ON "Account"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_loanId_key" ON "Account"("loanId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountNumber_key" ON "Account"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "Transaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "InterestRate_rateId_key" ON "InterestRate"("rateId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
