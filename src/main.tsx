import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UIProvider } from "./providers/UiProvider";
import { AxiosInterceptorProvider } from "./providers/AxiosInterceptorProvider";
import { AuthProvider } from "./providers/AuthProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AxiosInterceptorProvider>
        <AuthProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </AuthProvider>
      </AxiosInterceptorProvider>
    </QueryClientProvider>
  </StrictMode>
);
