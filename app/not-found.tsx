import React from "react";
import { Button, Box, Typography } from "@mui/material";

import { Colors } from "@/theme/color";

import StyledBox from "@/components/FlexBox";
import Link from "next/link";

interface IErrorInfo {
  title: string;
  message: React.ReactNode;
  image: string;
  hasUniqLink?: boolean;
  uniqLink?: string | React.ReactNode;
}

interface IProps {
  errorType: string;
  children?: React.ReactNode;
}

const errorPageInfo: Record<string, IErrorInfo> = {
  "_404": {
    title: "Page Not Found",
    message: "Unfortunately, we couldn't find the page you're looking for.",
    image: "/error.svg",
  },
};

const ErrorPage: React.FC<IProps> = ({ errorType, children }) => {
  const data = errorPageInfo[errorType];
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          bgcolor: Colors.Orange,
          height: "100px",
          boxShadow: " 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        }}
      />
      <StyledBox
        sx={{
          justifyContent: "center",
          p: 7,
          flexDirection: "column",
          mt: 4,
        }}
      >
        <Typography variant="h1" sx={{ color: Colors.Orange, mb: 4 }}>
          {data.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.message}
        </Typography>
        <Box
          component="img"
          src={data.image}
          sx={{ width: "360px", height: "360px" }}
        />
        {data.hasUniqLink && <>{data.uniqLink}</>}
        {!data.hasUniqLink && (
          <Link href="/dashboard">
            <Button variant="contained" color="primary" sx={{ mt: 5 }}>
              Back to Home
            </Button>
          </Link>
        )}
        {children}
      </StyledBox>
    </Box>
  );
};

const Error404 = () => <ErrorPage errorType="_404" />;

export default Error404;