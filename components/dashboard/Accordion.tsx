"use client";
import { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Colors } from "@/theme/color";
import StyledBox from "@/components/FlexBox";
import { Account } from "@prisma/client";
import { AccountCard } from "@/components/dashboard/AccountCard";

import { convertToCurrencyUnit} from "@/lib/utils/currencyHelper";

function Home({ data }: { data: Account[] }) {
  const loanTotalValue = data.reduce((total, account) => {
    return total + account.remainingBalance;
  }, 0);
  return (
    <Accordion
      defaultExpanded
      sx={{
        padding: "30px",
        margin: "40px 0 !important",
        minWidth: "640px",
      }}
    >
      <AccordionSummary
        id="panel1-header"
        expandIcon={<ExpandMoreIcon sx={{ margin: "0px 8px" }} />}
        aria-controls="panel1-content"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledBox
          sx={{
            alignItems: "center",
            gap: 2,
          }}
        >
          <HomeOutlinedIcon
            fontSize={"large"}
            sx={{
              color: Colors.Blue,
              borderRadius: "50%",
              border: `2px solid ${Colors.Grey}`,
              padding: 2,
              mr: 1,
              boxSizing: "content-box",
            }}
          />
          <Box>
            <Typography color={"textSecondary"} variant="h4">
              Your Home Loans
            </Typography>
            <Typography>{data.length} home loans</Typography>
          </Box>
        </StyledBox>
        <StyledBox
          sx={{
            flexDirection: "column",
            margin: "0 0 0 auto",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Typography>
            <strong>Total of current home loans</strong>
          </Typography>
          <Typography>
            <strong>{convertToCurrencyUnit(loanTotalValue, "$", "LTR")}</strong>
          </Typography>
        </StyledBox>
      </AccordionSummary>
      <AccordionDetails>
        <Divider variant="fullWidth" />
        <List>
          {data.map((account) => {
            return (
              <Fragment key={account.accountId}>
                <AccountCard account={account} />
                <Divider variant="fullWidth" />
              </Fragment>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export default Home;
