// / <reference types="react" />
import {
  Box,
  FormControlLabel,
  FormGroup,
  Paper,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { TradeBtn } from "../Buttons/Trade";
import { EditBtn } from "../Buttons/Edit";
import { CancelBtn } from "../Buttons/Cancel";
import { ReportBtn } from "../Buttons/Report";
import "../../App.css";
import { useAuthContext } from "../../context/UseAuthContext";
import { Booking, constants, Machine } from "../../constants";
import { useCallback, useState } from "react";

export function BookingHeader({
  data,
}: {
  data: {
    bookings: Booking[] | undefined;
  };
}) {
  const [machineLabel, setMachineLabel] = useState(constants.washingMachine);
  const { data: userData } = useAuthContext();
  const reservationCount = data.bookings?.find(
    (booking) => booking.userId === userData?.userId
  )?.reservationsLeft;

  const disabledBtnIfNoBookings = useCallback(() => {
    return (
      data.bookings?.some(
        (booking) =>
          booking.userId.toString() === userData?.userId.toString() &&
          booking.slots.some((slot) => slot.booked === true)
      ) ?? false
    );
  }, [data.bookings, userData?.userId]);

  const dummyData: Machine[] = [
    { id: "123", name: 0, status: 0, buildingId: "123" },
    { id: "124", name: 0, status: 0, buildingId: "123" },
    { id: "125", name: 1, status: 0, buildingId: "123" },
  ];

  return (
    <>
      <Paper sx={{ display: "flex" }}>
        <Box>
          <Tooltip title="Available Machines" className="infoIcon">
            <InfoIcon />
          </Tooltip>
          <FormGroup>
            <Typography>Machines:</Typography>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onChange={() => {
                    if (machineLabel === constants.washingMachine) {
                      setMachineLabel(constants.dryerMachine);
                    } else {
                      setMachineLabel(constants.washingMachine);
                    }
                  }}
                />
              }
              label={machineLabel}
            />
          </FormGroup>
          {dummyData.map((d) => {
            return (
              <Box>
                <Typography>Status{d.status}</Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>
      <Box className="booking-counter-mainBox">
        <Box className="booking-counter-resesrvation">
          <Tooltip
            title="Number of reservations that can be used per week"
            className="infoIcon"
            placement="top-start"
          >
            <InfoIcon />
          </Tooltip>
          <Typography>Reservations left: {reservationCount}</Typography>
        </Box>
        <Box className="booking-counter-edit-cancel-btn">
          <EditBtn disabledBtnIfNoBookings={disabledBtnIfNoBookings} />
          <CancelBtn disabledBtnIfNoBookings={disabledBtnIfNoBookings} />
          <ReportBtn />
        </Box>
        <TradeBtn />
      </Box>
    </>
  );
}
