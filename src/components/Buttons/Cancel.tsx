import { GenericButton } from "./GenericButton";

export function CancelBtn({
  disabledBtnIfNoBookings,
  cancelBookings
}: {
  disabledBtnIfNoBookings: boolean;
  cancelBookings: ()=> Promise<void>;
}) {
  return (
    <GenericButton
     className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledCancelBtn"}
      disabled={!disabledBtnIfNoBookings}
      onClick={()=> cancelBookings()}
    >
      Cancel
    </GenericButton>
  );
}
