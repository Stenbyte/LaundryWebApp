import "./App.css";
import { Header } from "./components/header/Header";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BookingTable } from "./components/bookingTable/BookingTable";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <BookingTable />
    </ThemeProvider>
  );
}
