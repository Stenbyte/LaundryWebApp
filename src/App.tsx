import "./App.css";
import { BookingTable } from "./components/bookingTable/BookingTable";
import { Header } from "./components/header/Header";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import { useAuth, useRefreshToken } from "./hooks/useAuth";
import { setupAxiosInterceptors } from "./services/AxiosConfig";
import { useQueryClient } from "@tanstack/react-query";


export function App() {
  const refreshMutation = useRefreshToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    setupAxiosInterceptors(queryClient, refreshMutation);
  }, [refreshMutation, queryClient]);
  const { data: user } = useAuth();
  const [isLogedIn, setIsLogedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Header setIsLogedIn={setIsLogedIn} isLogedIn={isLogedIn} user={user} />
      {user && <BookingTable user={user} />}
    </ThemeProvider>
  );
}

