"use client";

import { Box, Button, TextField, Typography } from "@mui/material";

const LoginForm = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#182237",
        color: "white",
      }}
    >
      <Box
        component="form"
        sx={{
          backgroundColor: "#182237",
          padding: "50px",
          borderRadius: "10px",
          width: "500px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5">Login</Typography>
        <TextField
          id="username"
          label="Username"
          name="username"
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: "5px",
            backgroundColor: "#151c2c",
            padding: "10px",
          }}
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: "5px",
            padding: "10px",
            backgroundColor: "#151c2c",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            padding: "15px",
            backgroundColor: "teal",
            color: "white",
            borderRadius: "5px",
          }}
          // onClick={authenticate}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
