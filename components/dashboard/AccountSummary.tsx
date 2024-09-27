import { Box, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Colors } from "@/theme/color";

import { Account } from "@/lib/definitions";

import StyledBox from "@/components/FlexBox";
// import StyledLink from "component/styledLink";
import { AccountCard } from "@/components/dashboard/AccountCard";

const Head = ({ account }: { account?: Account }) => {
  const data = account|| {};
  return (
    <Box
      sx={{
        backgroundImage: `url('/default.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "240px",
        position: "relative",
      }}
    >
      <StyledBox
        sx={{
          bgcolor: "white",
          width: "70%",
          minWidth: "500px",
          borderRadius: "4px",
          margin: "40px auto",
        }}
      >
        <AccountCard account={data} hideRedirect={true} />
      </StyledBox>
      {/* <StyledLink path={"/"}>
        <StyledBox
          sx={{
            width: "max-content",
            gap: "10px",
            position: "absolute",
            right: "40px",
          }}
        >
          <HomeOutlinedIcon sx={{ color: Colors.White }} />
          <Typography component={"span"} sx={{ color: Colors.White }}>
            Back To Home
          </Typography>
        </StyledBox>
      </StyledLink> */}
    </Box>
  );
};

export default Head;
