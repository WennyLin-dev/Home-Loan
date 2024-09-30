import { Button, Box, Typography } from "@mui/material";
import Link from "next/link";
const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        margin: "auto",
        width: "500px",
        height: "500px",
      }}
    >
      <Typography variant="h1">Home Loan</Typography>
      <Link href={"/dashboard"}>
        <Button variant="contained">Go to Dashboard</Button>
      </Link>
    </Box>
  );
};

export default Home;
