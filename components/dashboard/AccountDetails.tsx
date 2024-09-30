import { Fragment } from "react";
import { Typography, Box } from "@mui/material";

import { Account } from "@prisma/client";
import { formatDateToTimezone } from "@/lib/utils/dateTimeHelper";
import { convertToCurrencyUnit } from "@/lib/utils/currencyHelper";
import { camelCaseToTitleCase } from "@/lib/utils/helper";

import { Colors } from "@/theme/color";

type FieldTypes = { [key: string]: "shortDate" | "number" | "string" };

const accountSummary: FieldTypes = {
  accountName: "string",
  accountNumber: "string",
  effectiveDate: "shortDate",
  effectiveDateEnd: "shortDate",
  maturityDate: "shortDate",
  nextPaymentDate: "shortDate",
  lastPaymentDate: "shortDate",
  nextPaymentAmount: "number",
};

const AccountDetails = ({ account }: { account: Account }) => {
  // const symbol = useAppSelector((state) => state.client.currencySymbol);
  // const direction = useAppSelector((state) => state.client.currencyDirection);

  const formatValue = (key: string, value: any) => {
    const type = accountSummary[key];
    if (type === "shortDate") {
      return formatDateToTimezone(value);
    } else if (type === "number") {
      return convertToCurrencyUnit(value, '$', "LTR");
    } else if (type === "string") {
      return value;
    }
    return value;
  };

  return (
    <>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Account Details
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "10px 20px",
          padding: "10px",
          border: `1px solid ${Colors.Grey}`,
          borderRadius: "5px",
          marginBottom: "24px",
        }}
      >
        {Object.entries(account).map(([key, value], index) => {
          if (accountSummary[key]) {
            return (
              <Fragment key={key}>
                <Typography variant="body1" color="textSecondary">
                  {camelCaseToTitleCase(key)}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {formatValue(key, value)}
                </Typography>
              </Fragment>
            );
          } else return null;
        })}
      </Box>
    </>
  );
};

export default AccountDetails;
