import { Container } from "@mui/material";

import { clientId } from "@/lib/settings";
import { getAccountsByClientId, getTransactionByAccountId } from "@/lib/data";
import AccountDetails from "@/components/dashboard/AccountDetails";
import TransactionTable from "@/components/dashboard/TransactionsTable";

const LoanDetails = async ({ params }: { params: { id: string } }) => {
  const accountId = params.id;
  let account = null, transactions = null;

  const [accountResult, transactionResult] = await Promise.allSettled([
    getAccountsByClientId(clientId),
    getTransactionByAccountId(accountId),
  ]);
  if (accountResult.status === "fulfilled") {
    account = accountResult.value.find((item) => item.accountId === params.id);
  }
  if (transactionResult.status === "fulfilled") {
    transactions = transactionResult.value;
  }

  return (
    <>
      <Container sx={{ mt: 4 }}>
        {account && <AccountDetails account={account} />}
        {transactions && (
          <TransactionTable
            transaction={transactions}
            accountRemaining={account?.remainingBalance || 0}
          />
        )}
      </Container>
    </>
  );
};

export default LoanDetails;
