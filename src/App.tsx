import { useState } from 'react'
import './App.css'
import { BookingTable } from './components/BookingTable'
import { Container, Paper } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="xl" component={Paper}>LB</Container>
      <BookingTable />
    </QueryClientProvider>
  )
}

export default App
