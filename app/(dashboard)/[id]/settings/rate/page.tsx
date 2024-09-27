import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
// import { setInterestRate } from '../store/calculatorSlice';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052A4',
    },
  },
});

const RateCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    // boxShadow: theme.shadows[4],
  },
}));

const RateTypography = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const rates = [
  { term: '1 year', rate: 6.35 },
  { term: '18 months', rate: 5.99 },
  { term: '2 year', rate: 5.79 },
];

const SelectRatePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSelectRate = (rate: number) => {
    // dispatch(setInterestRate(rate));
    // router.push('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Special interest rates
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {rates.map((rateInfo) => (
              <Grid item xs={12} md={4} key={rateInfo.term}>
                <RateCard>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {rateInfo.term} fixed-rate special*
                    </Typography>
                    <RateTypography variant="h3">
                      {rateInfo.rate}%
                    </RateTypography>
                    <Typography variant="subtitle1" color="text.secondary">
                      P.A.
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => handleSelectRate(rateInfo.rate)}
                    >
                      Select this rate
                    </Button>
                  </Box>
                </RateCard>
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" color="text.secondary">
            * Special interest rate requires minimum 20% equity and an ANZ transaction account with salary direct credited, otherwise standard rate applies. Not available with package discounts.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SelectRatePage;