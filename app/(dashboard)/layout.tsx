'use client'

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "@/theme";
import Header from "@/components/dashboard/Header";
import Footer from "@/components/dashboard/Footer";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header/>
       {children}
       <Footer/>
      </ThemeProvider>
    </Provider>
  );
};