import { useState } from 'react'
import './App.css'
import { BookingTable } from './components/bookingTable/BookingTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/header/Header'

const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <BookingTable />
    </QueryClientProvider>
  )
}

export default App
