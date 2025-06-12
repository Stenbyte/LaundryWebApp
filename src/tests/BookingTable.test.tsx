/* @vitest-environment jsdom */
import {
  createMockUseQueryResult,
  render,
  screen,
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeEach,
} from "./test-util";
import { BookingTable } from "../components/bookingTable/BookingTable";
import * as auth from "../hooks/useAuth";
import * as bookingService from "../services/BookingService";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useUIContext } from "../context/UseUIContext";

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
  });

  it("should render booking table component", () => {
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
    expect(screen.getByTestId("booking-skeleton")).toBeDefined();
    expect(screen.getByTestId("time-slot")).toBeDefined();
    expect(screen.getAllByTestId("day-time")).to.have.length(7);
    expect(screen.getAllByTestId("time-slot-row")).to.have.length(4);

    expect(screen.getAllByTestId("reservation-slot-2-2")).toBeDefined();

    expect(screen.getAllByTestId("reserve-slot-3-6")).toBeDefined();
  });

  it("should render expired components", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(bookingService, "isTimeSlotInPast").mockImplementation((): any => {
      return true;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(bookingService, "useFetchBookings").mockImplementation((): any => {
      return createMockUseQueryResult([]);
    });
    render(<BookingTable />);

    expect(screen.getAllByTestId("expired-slot-0-0")[0]).toBeDefined();
  });

  it("should render booking table booked component", () => {
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

    expect(screen.getAllByTestId("booked-slot-0-1")[0]).toBeDefined();
  });

  it.skip("should edit booked component", () => {
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

    const Wrapper = () => {
      const { disabledBtn, dispatch } = useUIContext();

      useEffect(() => {
        dispatch({ type: "SET_DISABLED_BTN", payload: !disabledBtn });
      }, [disabledBtn, dispatch]);

      return <BookingTable />;
    };
    render(<Wrapper />);
    expect(screen.getAllByTestId("edit-btn")[0]).to.have.toHaveClass(
      "enabledBtn"
    );
    expect(screen.getAllByTestId("booked-slot-0-1")[0]).to.have.toHaveClass(
      "bookedUserSlot"
    );

    expect(screen.getAllByTestId("booked-slot-0-1")[0]).toBeDefined();
  });
});
