import Box from "@mui/material/Box";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";

import { getAccountsByClientId } from "@/lib/data";
import { clientId } from "@/lib/settings";
import { prisma } from "@/lib/prisma";
import StepContainer from "@/components/calculator/StepHeader";
import ReviewLoan from "@/components/calculator/ReviewLoan"

const Page = async ({ params }: { params: { id: string } }) => {
  const accounts = await getAccountsByClientId(clientId);
  const rateOptions = await prisma.interestRate.findMany();
  const { id } = params;
  const account = accounts.find((acc) => acc.accountId === id);

  return (
    <Box sx={{ padding: "40px" }}>
      <StepContainer stepName="Review your home loan per month">
        <LooksTwoOutlinedIcon />
      </StepContainer>
      <ReviewLoan account={account} rateOptions={rateOptions}/>
    </Box>
  );
};

export default Page;
