import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";
import { Grid2 } from "@mui/material";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid2 container width={"100%"} flexDirection={"column"} minHeight={"100vh"}>
      <Header />
      {children}
      <Footer />
    </Grid2>
  );
}
