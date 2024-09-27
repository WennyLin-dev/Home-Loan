import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  loanTermMonths: number;
  monthlyRepayment: number;
  totalInterest: number;
  totalCost: number;
  adjustedRepayment: number;
  adjustedTerm: { years: number; months: number };
  potentialSavings: number;
}

const initialState: CalculatorState = {
  loanAmount: 200000,
  interestRate: 5.79,
  loanTermYears: 30,
  loanTermMonths: 0,
  monthlyRepayment: 0,
  totalInterest: 0,
  totalCost: 0,
  adjustedRepayment: 0,
  adjustedTerm: { years: 0, months: 0 },
  potentialSavings: 0,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setLoanAmount: (state, action: PayloadAction<number>) => {
      state.loanAmount = action.payload;
    },
    setInterestRate: (state, action: PayloadAction<number>) => {
      state.interestRate = action.payload;
    },
    setLoanTermYears: (state, action: PayloadAction<number>) => {
      state.loanTermYears = action.payload;
    },
    setLoanTermMonths: (state, action: PayloadAction<number>) => {
      state.loanTermMonths = action.payload;
    },
    calculateLoan: (state) => {
      const principal = state.loanAmount;
      const annualRate = state.interestRate / 100;
      const monthlyRate = annualRate / 12;
      const totalMonths = state.loanTermYears * 12 + state.loanTermMonths;

      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPaid = monthlyPayment * totalMonths;
      const totalInterestPaid = totalPaid - principal;

      state.monthlyRepayment = monthlyPayment;
      state.totalInterest = totalInterestPaid;
      state.totalCost = totalPaid;
      state.adjustedRepayment = monthlyPayment;
    },
    setAdjustedRepayment: (state, action: PayloadAction<number>) => {
      state.adjustedRepayment = action.payload;
    },
    calculateSavings: (state) => {
      const principal = state.loanAmount;
      const annualRate = state.interestRate / 100;
      const monthlyRate = annualRate / 12;
      const newMonthlyPayment = state.adjustedRepayment;

      let balance = principal;
      let months = 0;
      let totalInterestPaid = 0;

      while (balance > 0) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = newMonthlyPayment - interestPayment;
        balance -= principalPayment;
        totalInterestPaid += interestPayment;
        months++;
      }

      const newTotalPaid = newMonthlyPayment * months;
      const savings = state.totalCost - newTotalPaid;
      const newYears = Math.floor(months / 12);
      const newMonths = months % 12;

      state.adjustedTerm = { years: newYears, months: newMonths };
      state.potentialSavings = savings;
    },
  },
});

export const {
  setLoanAmount,
  setInterestRate,
  setLoanTermYears,
  setLoanTermMonths,
  calculateLoan,
  setAdjustedRepayment,
  calculateSavings,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;