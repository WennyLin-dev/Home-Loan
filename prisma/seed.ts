import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const interestRates = [
    {
    //   rateId: "unique-rate-id-1",
      fixedRate: 7.8,
      startDate: "2024-03-01",
      endDate: "2029-03-01",
      rateType: "Fixed Rate",
      currency: "NZD",
      period: 1,
      description: "1-year fixed rate at 7.8% for home loan",
      status: "Active"
    },
    {
    //   rateId: "unique-rate-id-2",
      fixedRate: 7.3,
      startDate:"2024-03-01",
      endDate:"2029-03-01",
      rateType: "Fixed Rate",
      currency: "NZD",
      period: 1.5,
      description: "18-months fixed rate at 7.3% for home loan",
      status: "Active"
    },
    {
    //   rateId: "unique-rate-id-3",
      fixedRate: 7.0,
      startDate:"2024-03-01",
      endDate: "2029-03-01",
      rateType: "Fixed Rate",
      currency: "NZD",
      period: 2,
      description: "2-year fixed rate at 7.0% for home loan",
      status: "Active"
    },
    {
    //   rateId: "unique-rate-id-4",
      fixedRate: 6.6,
      startDate:"2024-05-01",
      endDate:"2029-05-01",
      rateType: "Fixed Rate",
      currency: "NZD",
      period: 3,
      description: "3-year fixed rate at 6.6% for investment account",
      status: "Active"
    },
    {
    //   rateId: "unique-rate-id-5",
      fixedRate: 6.2,
      startDate: "2024-01-01",
      endDate: "2029-01-01",
      rateType: "Fixed Rate",
      currency: "NZD",
      period: 5,
      description: "5-year fixed rate at 6.2% for home loan",
      status: "Active"
    }
  ];

  for (const rate of interestRates) {
    await prisma.interestRate.create({
      data: rate,
    });
  }

  console.log("Seeded data successfully!");

  const clientData = {
    clientId: "123e4567-e89b-12d3-a456-426614174000",
    clientName: "John Albert",
    dob: "1985-06-15",
    irdNumber: "123-456-789",
    citizenship: "New Zealand",
    phoneNumber: "+64 21 123 4567",
    email: "john.albert@example.com",
    status: "Active",
    salutation: "he/him",
    country: "NZ",
    currency: "NZD",
    avatar: "",
    timeZone: "Pacific/Auckland"
  };

  await prisma.client.create({
    data: clientData,
  });

  console.log("Client data seeded successfully!");

  const loanAccounts = [
    {
      accountId: "550e8400-e29b-41d4-a716-446655440001",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      loanId: "loan-001",
      accountType: "Home Loan",
      accountName: "John's Home Loan - Monthly",
      accountNumber: "88848858-1000",
      status: "Active",
      loanAmount: 20000000,
      remainingBalance: 14700000,
      interestRate: 3.5,
      effectiveDate: "2024-01-01T00:00:00Z",
      effectiveDateEnd: "2024-09-30T00:00:00Z",
      maturityDate: "2054-01-01T00:00:00Z",
      paymentFrequency: "Monthly",
      nextPaymentDate: "2024-10-01T00:00:00Z",
      nextPaymentAmount: 120000,
      lastPaymentDate: "2024-09-01T00:00:00Z",
      lastPaymentAmount: 150000,
      loanType: "Fixed Rate",
      period: 1,
      currency: "NZD",
      requireRefix: true,
    },
    {
      accountId: "550e8400-e29b-41d4-a716-446655440002",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      loanId: "loan-002",
      accountType: "Home Loan",
      accountName: "John's Home Loan - Fortnightly 1",
      accountNumber: "88848858-1002",
      status: "Active",
      loanAmount: 25000000,
      remainingBalance: 18000000,
      interestRate: 3.8,
      effectiveDate: "2024-02-01T00:00:00Z",
      effectiveDateEnd: "2026-02-01T00:00:00Z",
      maturityDate: "2054-02-01T00:00:00Z",
      paymentFrequency: "Monthly",
      nextPaymentDate: "2024-09-01T00:00:00Z",
      nextPaymentAmount: 60000,
      lastPaymentDate: "2024-08-01T00:00:00Z",
      lastPaymentAmount: 60000,
      period: 2,
      loanType: "Variable Rate",
      currency: "NZD",
      requireRefix: false,
    },
    {
      accountId: "550e8400-e29b-41d4-a716-446655440003",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      loanId: "loan-003",
      accountType: "Home Loan",
      accountName: "John's Home Loan - Fortnightly 2",
      accountNumber: "88848858-1003",
      status: "Active",
      loanAmount: 18000000,
      remainingBalance: 14000000,
      interestRate: 3.2,
      effectiveDate: "2024-03-01T00:00:00Z",
      effectiveDateEnd: "2027-03-01T00:00:00Z",
      maturityDate: "2054-03-01T00:00:00Z",
      paymentFrequency: "Fortnightly",
      nextPaymentDate: "2024-09-10T00:00:00Z",
      nextPaymentAmount: 55000,
      lastPaymentDate: "2024-08-10T00:00:00Z",
      lastPaymentAmount: 55500,
      period: 3,
      loanType: "Fixed Rate",
      currency: "NZD",
      requireRefix: false,
    },
  ];

  for (const loan of loanAccounts) {
    await prisma.account.create({
      data: loan,
    });
  }

  console.log("Loan account data seeded successfully!");

  const transactions = [
    {
      transactionId: "d4c56b8d-24f8-4d5a-9f95-4a5d477fe3f4",
      accountId: "550e8400-e29b-41d4-a716-446655440001",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 1500000,
      currency: "NZD",
      transactionDate: "2024-09-01",
      paidAt: "2024-09-01T00:00:00Z",
      status: "Completed",
      description: "Monthly mortgage payment",
      remainingBalance: 14700000,
      referenceId: "ref001",
    },
    {
      transactionId: "d4c56b8d-24f8-4d5a-9f95-4a5d477fe3f2",
      accountId: "550e8400-e29b-41d4-a716-446655440001",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 1500000,
      currency: "NZD",
      transactionDate: "2024-08-01",
      paidAt: "2024-08-01T00:00:00Z",
      status: "Completed",
      description: "Monthly mortgage payment",
      remainingBalance: 14850000,
      referenceId: "ref001",
    },
    {
      transactionId: "e8a5a0b4-4f3d-4118-b9b2-11f3d53d8a7e",
      accountId: "550e8400-e29b-41d4-a716-446655440001",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 1200000,
      currency: "NZD",
      transactionDate: "2024-07-01",
      paidAt: "2024-07-01T00:00:00Z",
      status: "Completed",
      description: "Monthly mortgage payment",
      remainingBalance: 14970000,
      referenceId: "ref002",
    },
    {
      transactionId: "f7b1c2d3-4a5e-6f7g-8h9i-10jklmnopqr7",
      accountId: "550e8400-e29b-41d4-a716-446655440001",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 1200000,
      currency: "NZD",
      transactionDate: "2024-06-01",
      paidAt: "2024-06-01T00:00:00Z",
      status: "Completed",
      description: "Monthly mortgage payment",
      remainingBalance: 14910000,
      referenceId: "ref003",
    },
    {
      transactionId: "f7b1c2d3-4a5e-6f7g-8h9i-10jklmnopqr5",
      accountId: "550e8400-e29b-41d4-a716-446655440001",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 1200000,
      currency: "NZD",
      transactionDate: "2024-05-01",
      paidAt: "2024-05-01T00:00:00Z",
      status: "Completed",
      description: "Monthly mortgage payment",
      remainingBalance: 15030000,
      referenceId: "ref003",
    },
    {
      transactionId: "f7b1c2d3-4a5e-6f7g-8h9i-10jklmnopqr3",
      accountId: "550e8400-e29b-41d4-a716-446655440001",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 1200000,
      currency: "NZD",
      transactionDate: "2024-04-01",
      paidAt: "2024-04-01T00:00:00Z",
      status: "Completed",
      description: "Monthly mortgage payment",
      remainingBalance: 15150000,
      referenceId: "ref003",
    },
    {
      transactionId: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3g4h5i6j",
      accountId: "550e8400-e29b-41d4-a716-446655440002",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 60000,
      currency: "NZD",
      transactionDate: "2024-08-15",
      paidAt: "2024-08-15T00:00:00Z",
      status: "Completed",
      description: "Fortnightly mortgage payment",
      remainingBalance: 17940000,
      referenceId: "ref004",
    },
    {
      transactionId: "b2c3d4e5-6f7a-8b9c-0d1e-2f3g4h5i6j7k",
      accountId: "550e8400-e29b-41d4-a716-446655440002",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 60000,
      currency: "NZD",
      transactionDate: "2024-08-01",
      paidAt: "2024-08-01T00:00:00Z",
      status: "Completed",
      description: "Fortnightly mortgage payment",
      remainingBalance: 18000000,
      referenceId: "ref005",
    },
    {
      transactionId: "c3d4e5f6-7a8b-9c0d-1e2f-3g4h5i6j7k8l",
      accountId: "550e8400-e29b-41d4-a716-446655440002",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 60000,
      currency: "NZD",
      transactionDate: "2024-07-15",
      paidAt: "2024-07-15T00:00:00Z",
      status: "Completed",
      description: "Fortnightly mortgage payment",
      remainingBalance: 18060000,
      referenceId: "ref006",
    },
    {
      transactionId: "d4e5f6g7-8a9b-0c1d-2e3f-4g5h6i7j8k9l",
      accountId: "550e8400-e29b-41d4-a716-446655440003",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 55000,
      currency: "NZD",
      transactionDate: "2024-08-10",
      paidAt: "2024-08-10T00:00:00Z",
      status: "Completed",
      description: "Fortnightly mortgage payment",
      remainingBalance: 13945000,
      referenceId: "ref007",
    },
    {
      transactionId: "e5f6g7h8-9a0b-1c2d-3e4f-5g6h7i8j9k02",
      accountId: "550e8400-e29b-41d4-a716-446655440003",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 55000,
      currency: "NZD",
      transactionDate: "2024-07-25",
      paidAt: "2024-07-25T00:00:00Z",
      status: "Completed",
      description: "Fortnightly mortgage payment",
      remainingBalance: 14000000,
      referenceId: "ref008",
    },
    {
      transactionId: "f6g7h8i9-0a1b-2c3d-4e5f-6g7h8i9j0k14",
      accountId: "550e8400-e29b-41d4-a716-446655440003",
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      transactionType: "Payment",
      paidAmount: 55000,
      currency: "NZD",
      transactionDate: "2024-07-10",
      paidAt: "2024-07-10T00:00:00Z",
      status: "Completed",
      description: "Fortnightly mortgage payment",
      remainingBalance: 14055000,
      referenceId: "ref009",
    },
  ];

  for (const transaction of transactions) {
    await prisma.transaction.create({ data: transaction });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
