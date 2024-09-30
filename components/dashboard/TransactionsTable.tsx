'use client'
import React, { useEffect, useState } from "react";
import {
  TablePagination,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

import { Colors } from "@/theme/color";
import { Transaction } from "@/lib/definitions";
import { sortByKey } from "@/lib/utils/helper";
import { convertToCurrencyUnit } from "@/lib/utils/currencyHelper";
import { formatDateToTimezone } from "@/lib/utils/dateTimeHelper";
import { StyledTableCell, StyledTableRow } from "./StyledTable";
// import { useAppSelector } from "store/hooks";

function subtotal(items: readonly Transaction[]) {
  return items
    .map(({ paidAmount }) => paidAmount)
    .reduce((sum, i) => sum + i, 0);
}

const TransactionsTable = ({
  transaction,
  accountRemaining,
}: {
  transaction: Transaction[];
  accountRemaining: number;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentTransactions, setTranscations] = useState<Transaction[]>([]);
  // const symbol = useAppSelector((state) => state.client.currencySymbol);
  // const direction = useAppSelector((state) => state.client.currencyDirection);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    let data = sortByKey(transaction, "paidAt", "desc");
    // Calculate the slice of transaction for the current page
    const currentTransactions = data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
    setTranscations(currentTransactions);
  }, [transaction, page, rowsPerPage]);

  function ccyFormat(value: number) {
    return convertToCurrencyUnit(value, "$", "LTR");
  }
  return (
    <>
      <Typography variant="h3" sx={{ margin: "40px 0 10px" }}>
        Transactions
      </Typography>
      <Box
        sx={{
          padding: "10px",
          border: `1px solid ${Colors.Grey}`,
          borderRadius: "4px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Paid Date</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Payment Amount</StyledTableCell>
              <StyledTableCell align="right">Remaining Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTransactions.map((transaction) => (
              <StyledTableRow key={transaction.transactionId}>
                <StyledTableCell>
                  {formatDateToTimezone(transaction.paidAt)}
                </StyledTableCell>
                <StyledTableCell>{transaction.description}</StyledTableCell>
                <StyledTableCell align="right">
                  {ccyFormat(transaction.paidAmount)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {ccyFormat(transaction.remainingBalance)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell colSpan={1} />
              <StyledTableCell
                colSpan={1}
                align="right"
                sx={{ bgcolor: Colors.Blue, color: Colors.White }}
              >
                <strong>Totals for Period</strong>
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ bgcolor: Colors.MediumGrey }}
              >
                {ccyFormat(subtotal(transaction))}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ bgcolor: Colors.MediumGrey }}
              >
                {ccyFormat(accountRemaining)}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transaction.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default TransactionsTable;
