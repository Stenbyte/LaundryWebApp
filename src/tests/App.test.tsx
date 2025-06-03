/* @vitest-environment jsdom */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "./test-util";
import { App } from "../App";
import { BookingTable } from "../components/bookingTable/BookingTable";
import * as auth from "../hooks/useAuth";
import { UseQueryResult } from "@tanstack/react-query";
afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe("App", () => {
  //   it("renders the app component", () => {
  //     render(<App />);
  //     expect(screen.getByText("LB")).toBeDefined();
  //     expect(screen.getByTestId("logo")).toBeDefined();
  //     expect(screen.getByTestId("login-title")).toBeDefined();
  //     expect(screen.getByTestId("email")).toBeDefined();
  //     expect(screen.getByTestId("login-btn")).toBeDefined();
  //     expect(screen.getByText("Don't have an account ?")).toBeDefined();
  //     expect(screen.getByTestId("signup-btn")).toBeDefined();
  //   });

  it("renders the booking table component", async () => {
    // vi.mock("../../hooks/useAuth", () => ({
    //   useAuth: () => ({
    //     data: { userId: "user" },
    //   }),
    // }));

    const spyM = vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return {
        data: { userId: "user", email: "test@tes.com" },
      };
    });
    render(<BookingTable />);
    expect(screen.getByTestId("booking-skeleton")).toBeDefined();
  });
});
