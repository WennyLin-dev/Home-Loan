import AccountSummary from "@/components/dashboard/AccountSummary";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return (
   <>
    <AccountSummary />
    {children}
   </>
      
    
  );
};