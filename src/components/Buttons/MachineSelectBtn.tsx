import { useCallback } from "react";
import { GenericButton } from "./GenericButton";

import { setMachine } from "../../reduxState/selectMachineSlice";
import { useAppDispatch, useAppSelector } from "../../reduxState/store";
import { Machine, MachineNameEnum, MachineStatusEnum } from "../../constants";
import { Badge } from "@mui/material";

export function MachineSelectBtn({
  disabledBtnIfNoBookings,
  machine,
}: {
  disabledBtnIfNoBookings: MachineStatusEnum;
  machine: Machine;
}) {
  const dispatch = useAppDispatch();

  const selectMachine = useCallback(() => {
    if (
      typeof machine._id === "string" &&
      Object.values(MachineStatusEnum).includes(machine.status) &&
      Object.values(MachineNameEnum).includes(machine.name) &&
      typeof machine.buildingId === "string"
    ) {
      dispatch(
        setMachine({
          _id: machine._id!,
          name: machine.name,
          buildingId: machine.buildingId,
          status: machine.status,
        })
      );
    }
  }, [dispatch, machine]);
  const selectedMachineId = useAppSelector((state) => state.selectMachine);
  console.log(selectedMachineId, "ooooopppps");
  return (
    <>
      {selectedMachineId.some((m) => m?._id === machine._id) && (
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
