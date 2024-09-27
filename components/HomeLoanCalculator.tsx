import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  setLoanAmount,
  setInterestRate,
  setLoanTermYears,
  setLoanTermMonths,
  calculateLoan,
  setAdjustedRepayment,
  calculateSavings,
} from '../store/calculatorSlices';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Slider,
  Grid,
  InputAdornment,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AdvancedHomeLoanCalculator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const calculator = useSelector((state: RootState) => state.calculator);

  useEffect(() => {
    dispatch(calculateLoan());
  }, [calculator.loanAmount, calculator.interestRate, calculator.loanTermYears, calculator.loanTermMonths, dispatch]);

  useEffect(() => {
    dispatch(calculateSavings());
  }, [calculator.adjustedRepayment, dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>SCENARIO 1</Typography>
          <Typography variant="h4" gutterBottom>
            ${calculator.monthlyRepayment.toFixed(2)} <Typography component="span" variant="body1">Monthly</Typography>
          </Typography>
          <Box sx={{ '& > :not(style)': { mb: 2 } }}>
            <TextField
              fullWidth
              label="Loan amount"
              type="number"
              value={calculator.loanAmount}
              onChange={(e) => dispatch(setLoanAmount(Number(e.target.value)))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Interest rate"
              type="number"
              value={calculator.interestRate}
              onChange={(e) => dispatch(setInterestRate(Number(e.target.value)))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    %
                    <Button color="primary">View ANZ rates</Button>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Select
                fullWidth
                value={calculator.loanTermYears}
                onChange={(e) => dispatch(setLoanTermYears(Number(e.target.value)))}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <MenuItem key={i} value={i}>{i} years</MenuItem>
                ))}
              </Select>
              <Select
                fullWidth
                value={calculator.loanTermMonths}
                onChange={(e) => dispatch(setLoanTermMonths(Number(e.target.value)))}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i}>{i} months</MenuItem>
                ))}
              </Select>
            </Box>
            <Button fullWidth variant="contained" color="primary" onClick={() => dispatch(calculateLoan())}>
              Calculate
            </Button>
          </Box>
          <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Your minimum repayments:</Typography>
            <Typography variant="h4" gutterBottom>${calculator.monthlyRepayment.toFixed(2)}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2">Loan amount:</Typography>
                <Typography variant="body1" fontWeight="bold">${calculator.loanAmount.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">Total interest:</Typography>
                <Typography variant="body1" fontWeight="bold">${calculator.totalInterest.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">Your total cost:</Typography>
                <Typography variant="body1" fontWeight="bold">${calculator.totalCost.toFixed(2)}</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                mr: 2,
              }}
            >
              ?
            </Box>
            <Typography variant="h5">Want to save money?</Typography>
          </Box>
          <Typography gutterBottom>By changing your monthly minimum repayments to:</Typography>
          <TextField
            fullWidth
            type="number"
            value={calculator.adjustedRepayment}
            onChange={(e) => dispatch(setAdjustedRepayment(Number(e.target.value)))}
            sx={{ mb: 2 }}
          />
          <Slider
            value={calculator.adjustedRepayment}
            min={calculator.monthlyRepayment}
            max={calculator.monthlyRepayment * 2}
            step={10}
            onChange={(_, value) => dispatch(setAdjustedRepayment(value as number))}
            sx={{ mb: 2 }}
          />
          <Typography gutterBottom>
            You could save up to <strong>${calculator.potentialSavings.toFixed(2)}</strong>
          </Typography>
          <Typography gutterBottom>
            and adjust your loan length to <strong>{calculator.adjustedTerm.years} years {calculator.adjustedTerm.months} months</strong>
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography>Loan amount: <strong>${calculator.loanAmount.toFixed(2)}</strong></Typography>
            <Typography>Total interest: <strong>${(calculator.totalCost - calculator.loanAmount).toFixed(2)}</strong></Typography>
            <Typography>Total cost: <strong>${calculator.totalCost.toFixed(2)}</strong></Typography>
          </Box>
          <Button fullWidth variant="outlined" startIcon={<AddCircleOutlineIcon />} sx={{ mb: 1 }}>
            Add this as a scenario
          </Button>
          <Button fullWidth variant="outlined" startIcon={<AddCircleOutlineIcon />}>
            Create a new scenario
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdvancedHomeLoanCalculator;