import { describe, it, expect, vi } from "vitest";
import {
  createMockUseQueryResult,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
  afterEach,
  cleanup,
} from "./test-util";
import userEvent from "@testing-library/user-event";
import * as auth from "../hooks/auhtHooks";
import * as api from "../services/AxiosConfig";
import { Login } from "../components/login/Login";

describe("Login", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  it.skip("submit email", async () => {
    const mockedPost = vi.spyOn(api.default, "post").mockResolvedValue({
      data: { token: "token" },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return createMockUseQueryResult(null);
    });
    render(<Login />);

    const emailWrapper = await screen.findByTestId("login-email");
    const emailInput = within(emailWrapper).getByRole("textbox");
    await userEvent.type(emailInput, "test@test.com");

    const loginBtn = await screen.findByTestId("login-btn");
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(mockedPost).toHaveBeenCalledWith(
        expect.stringContaining("/auth/login"),
        expect.objectContaining({
          email: "test@test.com",
        })
      );
    });
  });
});
