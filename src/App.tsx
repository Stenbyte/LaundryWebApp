import "./App.css";
import { BookingTable } from "./components/bookingTable/BookingTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/header/Header";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header setIsLogedIn={setIsLogedIn} isLogedIn={isLogedIn} />
        {isLogedIn && <BookingTable />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
