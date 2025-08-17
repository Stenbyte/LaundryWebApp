import { toast } from "react-toastify";
import { GenericButton } from "./GenericButton";

import { useCallback } from "react";
import { useCancel } from "../../hooks/bookingsHooks";

export function CancelBtn({
  disabledBtnIfNoBookings,
}: {
  disabledBtnIfNoBookings: boolean;
}) {
  const cancelAction = useCancel();
  const cancelBookings = useCallback(async () => {
    try {
      await cancelAction.mutateAsync();
      toast.success("Canceled bookings successfully!");
    } catch (error) {
      toast.error(`${error}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancelAction.mutateAsync]);
  return (
    <GenericButton
      className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledCancelBtn"}
      disabled={!disabledBtnIfNoBookings}
      onClick={cancelBookings}
      testid="cancel-btn"
    >
      Cancel
    </GenericButton>
  );
}
