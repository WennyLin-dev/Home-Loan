import AccountSummary from "@/components/dashboard/AccountSummary";

export default function DashboardLayout({
  children,
  params, 
}: Readonly<{
  children: React.ReactNode;
  params: { id: string }; 
}>) {
  return (
    <>
      <AccountSummary params={params}/>
      {children}
    </>
  );
}
