/* @vitest-environment jsdom */
import {
  screen,
  describe,
  it,
  expect,
  afterEach,
  vi,
  createMockUseQueryResult,
} from "./test-util";
import { App } from "../App";
import { cleanup, render as defaultRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialState } from "../context/UiProvider";
import { UiContext } from "../context/UiContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import * as auth from "../hooks/auhtHooks";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return createMockUseQueryResult(null);
    });

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
