/* @vitest-environment jsdom */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "./test-util";
import { BookingTable } from "../components/bookingTable/BookingTable";
import * as auth from "../hooks/useAuth";
import * as bookingService from "../services/BookingService";
import { UseQueryResult } from "@tanstack/react-query";

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe("BookingTable", () => {
  function createMockUseQueryResult<T>(
    data: T
  ): Partial<UseQueryResult<T, Error>> {
    return {
      data,
      isLoading: false,
    };
  }

  it("should render booking table component", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
     return createMockUseQueryResult({
        userId: "user",
        email: "test@tes.com",
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(bookingService, "useFetchBookings").mockImplementation((): any => {
      return [];
    });
    render(<BookingTable />);
    expect(screen.getByTestId("booking-skeleton")).toBeDefined();
  });
});
