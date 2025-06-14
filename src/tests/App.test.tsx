/* @vitest-environment jsdom */
import { screen, describe, it, expect, afterEach, vi } from "./test-util";
import { App } from "../App";
import axios from "axios";
import { cleanup, render as defaultRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialState } from "../context/UiProvider";
import { UiContext } from "../context/UiContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";

describe("App", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders the app component", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.spyOn(axios, "request").mockResolvedValue({ data: {} });
    vi.spyOn(axios, "post").mockResolvedValue({
      data: {},
    });

    // render(<App />);
    defaultRender(
      <QueryClientProvider client={queryClient}>
        <UiContext.Provider value={initialState}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </UiContext.Provider>
      </QueryClientProvider>
    );
    expect(screen.getByText("LB")).toBeDefined();
    expect(screen.getByTestId("logo")).toBeDefined();
    expect(screen.getByTestId("login-title")).toBeDefined();
    expect(screen.getByTestId("email")).toBeDefined();
    expect(screen.getByTestId("login-btn")).toBeDefined();
    expect(screen.getByText("Don't have an account ?")).toBeDefined();
    expect(screen.getByTestId("signup-btn")).toBeDefined();
  });
});
