'use client'
import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Account, Rate } from "@/lib/definitions";

import {
  calculateRepayment,
  HomeLoan,
  calculateYearsBetweenDates,
  calculateLoanTermYears,
  calculateEndDate,
} from "@/lib/utils/loanHelper";
import { convertToUnit } from "@/lib/utils/currencyHelper";
import InputSlider from "@/components/calculator/Adjust";
import RepaymentCard from "@/components/calculator/Card";
import StyledBox from "@/components/FlexBox";

export interface LoanSummary {
  fixedRate: number;
  startDate: string;
  endDate: string;
  rateType: string;
  loanAmount: number;
  maturityDate: string;
  repaymentAmount?: number;
  period: number;
}

interface IProps {
  handleSubmit: (currentRepayment: LoanSummary) => void;
  handlePreviousStep: () => void;
  account: Account | undefined;
  formValue: Record<string, any>;
  rateOptions: Rate[];
}

const initialState: LoanSummary = {
  fixedRate: 0,
  startDate: "",
  endDate: "",
  maturityDate: "",
  rateType: "",
  loanAmount: 0,
  period: 0,
};

const ReviewForm = ({
  handleSubmit,
  handlePreviousStep,
  account,
  formValue,
  rateOptions,
}: IProps) => {
  const previousSummary: LoanSummary = {
    fixedRate: account?.interestRate ?? 0,
    startDate: account?.effectiveDate ?? "",
    endDate: account?.effectiveDateEnd ?? "",
    maturityDate: account?.maturityDate ?? "",
    rateType: account?.loanType ?? "",
    loanAmount: account?.remainingBalance ?? 0,
    period: account?.period ?? 0,
  };

  const [currentRepayment, setCurrentRepayment] =
    useState<LoanSummary>(initialState);

  const [minimalRepay, setMinimalRepay] = useState(0);
  const [maximumRepay, setMaximumlRepay] = useState(0);

  const calculateRepaymentInfo = (targetRate: Rate) => {
    const diffYear = calculateYearsBetweenDates(
      account?.effectiveDateEnd ?? "",
      account?.maturityDate ?? "",
    );
    const monthlyRepayment = calculateRepayment({
      loanAmount: account?.remainingBalance ?? 0,
      loanTermYears: diffYear,
      fixedRate: targetRate.fixedRate ?? 0,
      lastPaymentDate: account?.effectiveDateEnd ?? "",
    } as HomeLoan);

    setMinimalRepay(monthlyRepayment * 100);
    setCurrentRepayment({
      fixedRate: targetRate.fixedRate ?? 0,
      startDate: account?.effectiveDateEnd ?? "",
      endDate: calculateEndDate(
        account?.effectiveDateEnd ?? "",
        targetRate.period,
      ),
      maturityDate: account?.maturityDate ?? "",
      rateType: account?.loanType ?? "",
      loanAmount: account?.remainingBalance ?? 0,
      repaymentAmount: monthlyRepayment * 100 ?? 0,
      period: targetRate.period,
    });
  };

  useEffect(() => {
    if (rateOptions.length > 0 && formValue?.rateId) {
      let targetRate = rateOptions.find(
        (rate) => rate.rateId === formValue?.rateId,
      );
      if (targetRate) {
        calculateRepaymentInfo(targetRate);
      }
    }
  }, [formValue?.rateId, rateOptions.length]);

  // Calculate maximum repayment when currentRepayment is updated
  useEffect(() => {
    if (currentRepayment.endDate) {
      calculateMax();
    }
  }, [currentRepayment?.endDate]);

  const calculateMax = () => {
    const diffYear = calculateYearsBetweenDates(
      currentRepayment.startDate,
      currentRepayment.endDate,
    );
    const monthlyRepayment = calculateRepayment({
      loanAmount: account?.remainingBalance || 0,
      loanTermYears: diffYear,
      fixedRate: currentRepayment.fixedRate,
      lastPaymentDate: account?.effectiveDateEnd,
    } as HomeLoan);
    setMaximumlRepay(monthlyRepayment * 100);
  };

  const handleNewPayment = (repay: number | undefined) => {
    let repayValue = repay
      ? repay * 100
      : currentRepayment?.repaymentAmount || 0;
    return setCurrentRepayment({
      ...currentRepayment,
      repaymentAmount: repayValue,
      maturityDate: calculateLoanTermYears(
        account?.remainingBalance || 0,
        repayValue,
        currentRepayment?.fixedRate,
        currentRepayment?.startDate,
      ),
    });
  };

  return (
 <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "strecth",
          gap: 1,
        }}
      >
        <RepaymentCard
          loan={previousSummary}
          title={"Previous"}
          isNew={false}
        />
        <StyledBox sx={{ justifyContent: "center" }}>
          <ArrowForwardIcon
            sx={{
              height: { xs: "40px", sm: "50px" },
              width: { xs: "40px", sm: "50px" },
            }}
          />
        </StyledBox>
        <RepaymentCard
          loan={currentRepayment}
          title={"Current Selected"}
          isNew={true}
        />
      </Box>
      <Box>
        <InputSlider
          minimalValue={convertToUnit(minimalRepay)}
          maximumValue={convertToUnit(maximumRepay)}
          handleNewRepayment={handleNewPayment}
        />
      </Box>
      <Box sx={{ mt: 5, ml: "auto", mr: 0, textAlign: "center" }}>
        <Button variant="contained" onClick={handlePreviousStep} sx={{ mr: 3 }}>
          Previous Step
        </Button>
        <Button
          variant="contained"
          color={"success"}
          onClick={() => handleSubmit(currentRepayment)}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ReviewForm;
