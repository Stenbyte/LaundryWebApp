import { useCallback } from "react";
import { GenericButton } from "./GenericButton";

import { setMachine } from "../../reduxState/selectMachineSlice";
import { useAppDispatch } from "../../reduxState/store";
import { Machine } from "../../constants";

export function MachineSelectBtn({
  disabledBtnIfNoBookings,
  machine,
}: {
  disabledBtnIfNoBookings: boolean;
  machine: Partial<Machine>;
}) {
  const dispatch = useAppDispatch();

  const selectMachine = useCallback(() => {
    if (typeof machine._id === "string") {
      dispatch(setMachine({ _id: machine._id! }));
    }
  }, [dispatch, machine._id]);

  return (
    <GenericButton
      className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledBtn"}
      disabled={!disabledBtnIfNoBookings}
      testid="select-machine-btn"
      onClick={selectMachine}
    >
      {machine.status}
    </GenericButton>
  );
}
