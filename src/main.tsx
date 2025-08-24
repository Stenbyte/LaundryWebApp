import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UIProvider } from "./providers/UiProvider";
import { AxiosInterceptorProvider } from "./providers/AxiosInterceptorProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./reduxState/store";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AxiosInterceptorProvider>
        <AuthProvider>
          <UIProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </UIProvider>
        </AuthProvider>
      </AxiosInterceptorProvider>
    </QueryClientProvider>
  </StrictMode>
);
