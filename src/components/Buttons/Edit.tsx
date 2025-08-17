import { useCallback } from "react";
import { useUIContext } from "../../context/UseUIContext";
import { GenericButton } from "./GenericButton";

export function EditBtn({
  disabledBtnIfNoBookings,
}: {
  disabledBtnIfNoBookings: boolean;
}) {
  const { dispatch, disabledBtn } = useUIContext();

  const enabledBtn = useCallback(() => {
    dispatch({ type: "SET_DISABLED_BTN", payload: !disabledBtn });
  }, [disabledBtn, dispatch]);
  return (
    <GenericButton
      className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledBtn"}
      disabled={!disabledBtnIfNoBookings}
      testid="edit-btn"
      onClick={enabledBtn}
    >
      Edit
    </GenericButton>
  );
}
