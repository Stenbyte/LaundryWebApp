import { useGlobalContext } from "../../context/UseGlobalContext";
import { GenericButton } from "./GenericButton";

export function EditBtn({
  disabledBtnIfNoBookings,
}: {
  disabledBtnIfNoBookings: boolean;
}) {
  const { dispatch } = useGlobalContext();
  return (
    <GenericButton
      className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledBtn"}
      disabled={!disabledBtnIfNoBookings}
      onClick={() => {
        return dispatch({ type: "SET_DISABLED_BTN", payload: !true });
      }}
    >
      Edit
    </GenericButton>
  );
}
