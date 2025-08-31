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
import { Booking, MachineNameEnum } from "../../constants";
import { useMemo, useState } from "react";
import { MachineSelectBtn } from "../Buttons/MachineSelectBtn";
import { useFetchMachines } from "../../hooks/ machineHooks";

export function BookingHeader({
  data,
}: {
  data: {
    bookings: Booking[] | undefined;
  };
}) {
  const [machineLabel, setMachineLabel] = useState<MachineNameEnum>(
    MachineNameEnum.washing
  );
  const { data: userData } = useAuthContext();
  const { data: machines } = useFetchMachines();


  const reservationCount = data.bookings?.find(
    (booking) => booking.userId === userData?.userId
  )?.reservationsLeft;

  const disabledBtnIfNoBookings = useMemo(() => {
    return (
      data.bookings?.some(
        (booking) =>
          booking.userId.toString() === userData?.userId.toString() &&
          booking.slots.some((slot) => slot.booked === true)
      ) ?? false
    );
  }, [data.bookings, userData?.userId]);


  function ShowMachinesNameAndCounts() {
    const getMachinesCount = machines?.filter((machine) => {
      if (machineLabel === MachineNameEnum.washing) {
        return machine.name === MachineNameEnum.washing;
      } else {
        return machine.name === MachineNameEnum.dryer;
      }
    }).length;
    return machineLabel + getMachinesCount;
  }

  return (
    <>
      <Paper elevation={20} className="booking-header-paper">
        <Box className="booking-header-box">
          <Tooltip
            title="Select machine, bookings will be displayed based on selected machine"
            className="infoIcon"
            placement="top"
          >
            <InfoIcon />
          </Tooltip>
          <Box className="booking-header-box-1">
            <Typography>Machines:</Typography>
            <FormGroup>
              <FormControlLabel
                className="form-control-label"
                control={
                  <Switch
                    className="machines-switch "
                    onChange={() => {
                      if (machineLabel === MachineNameEnum.washing) {
                        setMachineLabel(MachineNameEnum.dryer);
                      } else {
                        setMachineLabel(MachineNameEnum.washing);
                      }
                    }}
                  />
                }
                label={ShowMachinesNameAndCounts()}
              />
            </FormGroup>
          </Box>
          <Box className="booking-machines-status-box">
            {machines
              ?.filter((m) => m.name === machineLabel)
              .map((machine, index) => {
                return (
                  <Box
                    sx={{
                      width: "100px",
                    }}
                    key={machine._id ?? index}
                  >
                    <MachineSelectBtn
                      disabledBtnIfNoBookings={machine.status}
                      machine={machine}
                    />
                  </Box>
                );
              })}
          </Box>
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
