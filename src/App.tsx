import './App.css'
import { BookingTable } from './components/bookingTable/BookingTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/header/Header'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'

const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <BookingTable />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
