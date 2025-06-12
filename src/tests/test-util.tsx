import { ReactNode, useReducer } from "react";
import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";
import { initialState, reducer } from "../context/UiProvider";
import { UiContext } from "../context/UiContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";

// eslint-disable-next-line react-refresh/only-export-components
export function createMockUseQueryResult<T>(
  data: T
): Partial<UseQueryResult<T, Error>> {
  return {
    data,
    isLoading: false,
  };
}

export const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QueryClientProvider client={queryClient}>
      <UiContext.Provider value={{ ...state, dispatch }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </UiContext.Provider>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactNode, options?: RenderOptions) => {
  render(ui, { wrapper: ProviderWrapper, ...options });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
// eslint-disable-next-line react-refresh/only-export-components
export * from "vitest";
// eslint-disable-next-line react-refresh/only-export-components
export { customRender as render };
