import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider } from "./context/ContextProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </QueryClientProvider>
  </StrictMode>
);
