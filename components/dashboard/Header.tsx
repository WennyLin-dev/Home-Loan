import { AppBar, Box, Toolbar, Typography, Avatar } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { prisma } from "@/lib/prisma";

const Header = async () => {
  const client = await prisma.client.findUnique({
    where: { clientId: "123e4567-e89b-12d3-a456-426614174000" },
  });
  return (
    <AppBar position="sticky">
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            Bank Name
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <Avatar
            src={client?.avatar || "/avatar.svg"}
            alt={`${client?.clientName}'s avatar`}
          />
          <Typography variant="h6" noWrap sx={{ fontWeight: 500 }}>
            {client?.clientName}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
