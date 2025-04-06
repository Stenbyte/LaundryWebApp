/// <reference types="react" />
import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { TradeBtn } from "../buttons/Trade";
import { EditBtn } from "../buttons/Edit";
import { CancelBtn } from "../buttons/Cancel";
import { ReportBtn } from "../buttons/Report";
import "../../App.css";
import { Booking } from "./BookingTable";
import { UserData } from "../../hooks/useAuth";

export function BookingHeader({
  data,
}: {
  data: {
    setDisabledBtn: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditSlot: React.Dispatch<React.SetStateAction<boolean>>;
    cancelBookings: () => Promise<void>;
    isEditSlot: boolean;
    bookings: Booking[] | undefined;
    user: UserData | null | undefined;
  };
}) {
  const reservationCount = data.bookings?.find(
    (booking) => booking.userId === data.user?.userId
  )?.reservationsLeft;

  const disabledBtnIfNoBookings =
    data.bookings?.some((booking) =>
      booking.slots.some((slot) => slot.booked === true)
    ) ?? false;

  const extendedData = {
    ...data,
    disabledBtnIfNoBookings,
  };
  return (
    <Box className="booking-counter-mainBox">
      <Box className="booking-counter-resesrvation">
        <Tooltip
          title="Number of reservations that can be used per week"
          color="info"
          placement="top-start"
        >
          <InfoIcon />
        </Tooltip>
        <Typography>Reservations left: {reservationCount}</Typography>
      </Box>
      <Box className="booking-counter-edit-cancel-btn">
        <EditBtn {...extendedData} />
        <CancelBtn {...extendedData} />
        <ReportBtn />
      </Box>
      <TradeBtn />
    </Box>
  );
}
