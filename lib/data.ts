import { prisma } from "@/lib/prisma";
import { formatDateToTimezone } from "./utils/dateTimeHelper";

export async function getAccountsByClientId(clientId:string) {
    try {
      const accounts = await prisma.account.findMany({
        where: { clientId: clientId },
      });
  
      // Format the response
      const formattedResponse = accounts.map(account => ({
        ...account,
        loanAmount: account.loanAmount,
        remainingBalance: account.remainingBalance,
        interestRate: account.interestRate,
        effectiveDate: formatDateToTimezone(account.effectiveDate), // Format as ISO string
        maturityDate: formatDateToTimezone(account.maturityDate),   // Format as ISO string
      }));
  
      return formattedResponse;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw new Error("Could not fetch accounts");
    }
  }

  export async function getTransactionByAccountId(accountId:string) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { accountId: accountId },
      });
  
      return transactions;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw new Error("Could not fetch accounts");
    }
  }