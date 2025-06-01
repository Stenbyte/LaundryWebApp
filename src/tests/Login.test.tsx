import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "./test-util";
import { App } from "../App";
import userEvent from "@testing-library/user-event";


vi.mock("../../hooks/useAuth", () => ({
  useLogin: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
  }),
  useAuth: () => ({
    data: null,
  }),
}));


describe("Login", () => {
  it("submit email", async () => {
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
