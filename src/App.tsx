import "./App.css";
import { Header } from "./components/header/Header";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useEffect } from "react";
import React from "react";
import { useRefreshToken } from "./hooks/useAuth";
import { setupAxiosInterceptors } from "./services/AxiosConfig";
import { useQueryClient } from "@tanstack/react-query";
import { BookingTable } from "./components/bookingTable/BookingTable";

export function App() {
  const refreshMutation = useRefreshToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    setupAxiosInterceptors(queryClient, refreshMutation);
  }, [refreshMutation, queryClient]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <BookingTable />
    </ThemeProvider>
  );
}
