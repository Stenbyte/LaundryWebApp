import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UIProvider } from "./providers/UiProvider";
import { AxiosInterceptorProvider } from "./providers/AxiosInterceptorProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AxiosInterceptorProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </AxiosInterceptorProvider>
    </QueryClientProvider>
  </StrictMode>
);
