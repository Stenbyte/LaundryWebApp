/* @vitest-environment jsdom */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "./test-util";
import { BookingTable } from "../components/bookingTable/BookingTable";
import * as auth from "../hooks/useAuth";
import * as bookingService from "../services/BookingService";
import { UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";

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
    expect(screen.getByTestId("time-slot")).toBeDefined();
    expect(screen.getAllByTestId("day-time")).to.have.length(7);
    expect(screen.getAllByTestId("time-slot-row")).to.have.length(4);

    expect(screen.getAllByTestId("reservation-slot-2-2")).toBeDefined();

    expect(screen.getAllByTestId("expired-slot-0-0")).toBeDefined();
    expect(screen.getAllByTestId("reserve-slot-3-6")).toBeDefined();
  });

  it("should render booking table booked component", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return createMockUseQueryResult({
        userId: "user",
        email: "test@tes.com",
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(bookingService, "useFetchBookings").mockImplementation((): any => {
      return createMockUseQueryResult([
        {
          userId: "user",
          slots: [
            {
              day: dayjs().add(1, "day"),
              timeSlots: ["08:00-11:00"],
              booked: true,
              id: "slotId",
            },
          ],
          id: "bookingId",
        },
      ]);
    });
    render(<BookingTable />);
    expect(screen.getAllByTestId("booked-slot-0-1")).toBeDefined();
  });
});
