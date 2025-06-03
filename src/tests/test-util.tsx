import { ReactNode } from "react";
import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialState, UiStateType } from "../context/UiProvider";
import { vi } from "vitest";
import { UiContext } from "../context/UiContext";



export const renderWithProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const mockState: UiStateType = {
    ...initialState,
    dispatch: vi.fn(),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UiContext.Provider value={mockState}>{children}</UiContext.Provider>
    </QueryClientProvider>
  );
};

const customRender = (ui: React.ReactNode, options?: RenderOptions) => {
  render(ui, { wrapper: renderWithProvider, ...options });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render };
