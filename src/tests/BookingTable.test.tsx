/* @vitest-environment jsdom */
import {
  createMockUseQueryResult,
  screen,
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeEach,
} from "./test-util";
import { cleanup, render as defaultRender } from "@testing-library/react";
import { BookingTable } from "../components/bookingTable/BookingTable";
import * as auth from "../hooks/auhtHooks";
import * as bookingService from "../services/BookingService";
import dayjs from "dayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialState } from "../context/UiProvider";
import { UiContext } from "../context/UiContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";

describe("BookingTable", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(auth, "useAuth").mockImplementation((): any => {
      return createMockUseQueryResult({
        userId: "user",
        email: "test@tes.com",
      });
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });

  it("should render booking table component", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
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

    defaultRender(
      <QueryClientProvider client={queryClient}>
        <UiContext.Provider value={initialState}>
          <ThemeProvider theme={theme}>
            <BookingTable />
          </ThemeProvider>
        </UiContext.Provider>
      </QueryClientProvider>
    );
    expect(screen.getByTestId("booking-skeleton")).toBeDefined();
    expect(screen.getByTestId("time-slot")).toBeDefined();
    expect(screen.getAllByTestId("day-time")).to.have.length(7);
    expect(screen.getAllByTestId("time-slot-row")).to.have.length(4);

    expect(screen.getAllByTestId("reservation-slot-2-2")).toBeDefined();

    expect(screen.getAllByTestId("reserve-slot-3-6")).toBeDefined();
  });

  it("should render expired components", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(bookingService, "isTimeSlotInPast").mockImplementation((): any => {
      return true;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(bookingService, "useFetchBookings").mockImplementation((): any => {
      return createMockUseQueryResult([]);
    });

    defaultRender(
      <QueryClientProvider client={queryClient}>
        <UiContext.Provider value={initialState}>
          <ThemeProvider theme={theme}>
            <BookingTable />
          </ThemeProvider>
        </UiContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getAllByTestId("expired-slot-0-0")[0]).toBeDefined();
  });

  it("should render booking table booked component", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
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

    defaultRender(
      <QueryClientProvider client={queryClient}>
        <UiContext.Provider value={initialState}>
          <ThemeProvider theme={theme}>
            <BookingTable />
          </ThemeProvider>
        </UiContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getAllByTestId("booked-slot-0-1")[0]).toBeDefined();
  });

  it("should edit booked component", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
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
            {
              day: dayjs().add(1, "day"),
              timeSlots: ["11:00-14:00"],
              booked: true,
              id: "slotId2",
            },
          ],
          id: "user",
        },
      ]);
    });
    const state = {
      ...initialState,
      disabledBtn: false,
    };

    defaultRender(
      <QueryClientProvider client={queryClient}>
        <UiContext.Provider value={state}>
          <ThemeProvider theme={theme}>
            <BookingTable />
          </ThemeProvider>
        </UiContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getAllByTestId("edit-btn")[0]).to.have.toHaveClass(
      "enabledBtn"
    );
    expect(screen.getAllByTestId("booked-slot-0-1")[0]).to.have.toHaveClass(
      "bookedEditSlot"
    );

    expect(screen.getAllByTestId("booked-slot-0-1")[0]).toBeDefined();
  });
});
