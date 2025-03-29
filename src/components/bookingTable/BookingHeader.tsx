import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { TradeBtn } from "../buttons/Trade";
import { EditBtn } from "../buttons/Edit";
import { CancelBtn } from "../buttons/Cancel";
import { ReportBtn } from "../buttons/Report";
import "../../App.css";
import { Booking } from "./BookingTable";

export function BookingHeader({
  data,
}: {
  data: {
    setDisabledBtn: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditSlot: React.Dispatch<React.SetStateAction<boolean>>;
    isEditSlot: boolean;
    bookings: Booking[] | undefined;
  };
}) {
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
        <Typography>Reservations left: 3</Typography>
      </Box>
      <Box className="booking-counter-edit-cancel-btn">
        <EditBtn props={data} />
        <CancelBtn />
        <ReportBtn />
      </Box>
      <TradeBtn />
    </Box>
  );
}
