import { describe, it, expect, vi } from "vitest";
import {
  createMockUseQueryResult,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
  afterEach,
} from "./test-util";
import { App } from "../App";
import userEvent from "@testing-library/user-event";
import * as auth from "../hooks/useAuth";

describe("Login", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it.skip("submit email", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useLogin").mockImplementation((): any => {
      return createMockUseQueryResult({
        token: "token",
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return createMockUseQueryResult(null);
    });
    render(<App />);

    const emailWrapper = await screen.findByTestId("email");
    const emailInput = within(emailWrapper).getByRole("textbox");
    await userEvent.type(emailInput, "test@test.com");

    const loginBtn = await screen.findByTestId("login-btn");
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(emailInput).toHaveValue("test@test.com");
    });
  });
});
