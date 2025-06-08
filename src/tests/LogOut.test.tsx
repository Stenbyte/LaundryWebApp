import { describe, it, expect, vi } from "vitest";
import { createMockUseQueryResult, render, screen } from "./test-util";
import * as auth from "../hooks/useAuth";
import * as bookingService from "../services/BookingService";
import { App } from "../App";

describe("LogOut", () => {
  it("log out from platform", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return createMockUseQueryResult({
        userId: "user",
        email: "test@tes.com",
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(bookingService, "useFetchBookings").mockImplementation((): any => {
      return createMockUseQueryResult([]);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return createMockUseQueryResult({
        userId: null,
      });
    });
    render(<App />);

    expect(screen.getByText("LB")).toBeDefined();
    expect(screen.getByTestId("logo")).toBeDefined();
    expect(screen.getByTestId("login-title")).toBeDefined();
    expect(screen.getByTestId("email")).toBeDefined();
    expect(screen.getByTestId("login-btn")).toBeDefined();
    expect(screen.getByText("Don't have an account ?")).toBeDefined();
    expect(screen.getByTestId("signup-btn")).toBeDefined();
  });
});
