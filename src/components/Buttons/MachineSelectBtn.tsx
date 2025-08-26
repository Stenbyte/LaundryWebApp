import { useCallback } from "react";
import { GenericButton } from "./GenericButton";

import { setMachine } from "../../reduxState/selectMachineSlice";
import { useAppDispatch, useAppSelector } from "../../reduxState/store";
import { Machine, MachineStatusEnum } from "../../constants";
import { Badge } from "@mui/material";

export function MachineSelectBtn({
  disabledBtnIfNoBookings,
  machine,
}: {
  disabledBtnIfNoBookings: MachineStatusEnum;
  machine: Partial<Machine>;
}) {
  const dispatch = useAppDispatch();

  const selectMachine = useCallback(() => {
    if (typeof machine._id === "string") {
      dispatch(setMachine({ _id: machine._id! }));
    }
  }, [dispatch, machine._id]);
  const selectedMachineId = useAppSelector((state) => state.selectMachine._id);
  return (
    <>
      {selectedMachineId === machine._id && (
        <Badge
          badgeContent=""
          variant="dot"
          color="secondary"
          sx={{ height: "20px" }}
        />
      )}
      <GenericButton
        className={
          disabledBtnIfNoBookings === MachineStatusEnum.maintenance
            ? "disabledMachineBtn"
            : "enabledMachineBtn"
        }
        disabled={
          disabledBtnIfNoBookings === MachineStatusEnum.maintenance
            ? true
            : false
        }
        testid="select-machine-btn"
        onClick={selectMachine}
      >
        {machine.status}
      </GenericButton>
    </>
  );
}
