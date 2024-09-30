import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getAccountsByClientId } from "@/lib/data";
import { clientId } from "@/lib/settings";
import Accordion from "@/components/dashboard/Accordion";

const Home = async () => {
  const data = await getAccountsByClientId(clientId);

  return (
    <>
      <Box sx={{ padding: "20px", flexGrow: 1 }}>
        <Typography variant="h1">Your Accounts</Typography>
        <Accordion data={data}/>
      </Box>
    </>
  );
};

export default Home;
