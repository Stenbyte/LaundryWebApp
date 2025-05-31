import { useUIContext } from "../../context/UseUIContext";
import { GenericButton } from "./GenericButton";

export function EditBtn({
  disabledBtnIfNoBookings,
}: {
  disabledBtnIfNoBookings: boolean;
}) {
  const { dispatch, disabledBtn } = useUIContext();
  return (
    <GenericButton
      className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledBtn"}
      disabled={!disabledBtnIfNoBookings}
      onClick={() => {
        return dispatch({ type: "SET_DISABLED_BTN", payload: !disabledBtn });
      }}
    >
      Edit
    </GenericButton>
  );
}
