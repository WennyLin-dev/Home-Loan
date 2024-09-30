import { Box, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Colors } from "@/theme/color";

import StyledBox from "@/components/FlexBox";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { getAccountsByClientId } from "@/lib/data";
import { clientId } from "@/lib/settings";
import Link from "next/link";

const Summary = async ({ params }: { params: { id: string } }) => {
  const data = await getAccountsByClientId(clientId);
  const account = data.find((item) => item.accountId === params.id) || null;
  return (
    <Box
      sx={{
        backgroundImage: `url('/default.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "240px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        gap:2
      }}
    >
      <StyledBox
        sx={{
          bgcolor: "white",
          width: "70%",
          minWidth: "500px",
          borderRadius: "4px",
        }}
      >
        {account && <AccountCard account={account} hideRedirect={true} />}
      </StyledBox>
      <Link href={"/dashboard"}>
        <StyledBox
          sx={{
            width: "max-content",
            gap:1
          }}
        >
          <HomeOutlinedIcon sx={{ color: Colors.White }} />
          <Typography component={"span"} sx={{ color: Colors.White }}>
            Back To Home
          </Typography>
        </StyledBox>
      </Link>
    </Box>
  );
};

export default Summary;
