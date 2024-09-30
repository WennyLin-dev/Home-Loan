import Link from "next/link";
import {
  formatDateToTimezone,
  checkIfExpiry,
} from "@/lib/utils/dateTimeHelper";
import { convertToCurrencyUnit } from "@/lib/utils/currencyHelper";

import {
  Tooltip,
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Colors } from "@/theme/color";
import StyledBox from "@/components/FlexBox";
import { Account } from "@prisma/client";

interface IProps {
  account: Account;
  hideRedirect?: boolean;
  hideWarning?: boolean;
}

export function AccountCard({
  account,
  hideRedirect = false,
  hideWarning = false,
}: IProps) {
  if (Object.keys(account).length < 1) {
    return null;
  }
  const accountDetail = `${account?.loanType} at ${account?.interestRate}%
     p.a. until ${account?.maturityDate}`;

  const isExpiry = checkIfExpiry(account?.effectiveDateEnd);

  return (
    <ListItem alignItems="center">
      <ListItemAvatar sx={{ marginRight: 2 }}>
        <Avatar src={account?.accountName || "/avatar.svg"} alt={""} />
      </ListItemAvatar>

      <StyledBox
        sx={{
          alignItems: "flex-start",
          flexDirection: "column",
          margin: "0 auto 0 0",
        }}
      >
        <ListItemText
          primary={
            <Typography color={"textSecondary"} variant="h4">
              {account.accountName}
            </Typography>
          }
        />
        <Typography variant="body1">
          <span>{account.accountNumber}</span> | <span>{accountDetail}</span>
        </Typography>
        <Typography sx={{ mt: 1.5 }}>
          Next repayment {account?.nextPaymentDate}
        </Typography>
        {!hideRedirect && (
          <Link href={`/dashboard/${account?.accountId}`}>
            <Typography sx={{ color: "text.secondary" }}>
              View more details
            </Typography>
          </Link>
        )}
      </StyledBox>

      <Box>
        {isExpiry && (
          <Link href={`/dashboard/${account?.accountId}/rate`}>
            {!hideWarning && (
              <StyledBox sx={{ color: Colors.Red }}>
                <Typography>Refix rates now</Typography>
                <Tooltip
                  title={`Your previous home loan will expire on ${formatDateToTimezone(
                    account?.effectiveDateEnd
                  )}, please refix new rates before that date.`}
                  arrow
                >
                  <InfoIcon sx={{ color: Colors.Red, ml: 1 }} />
                </Tooltip>
              </StyledBox>
            )}
          </Link>
        )}
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: "bold", mt: 1, textAlign: "right" }}>
              {convertToCurrencyUnit(account?.loanAmount)}
            </Typography>
          }
        />
      </Box>
    </ListItem>
  );
}
