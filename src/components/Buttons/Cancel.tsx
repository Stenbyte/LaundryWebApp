import { Button } from "@mui/material";

export function CancelBtn({
  disabledBtnIfNoBookings,
  cancelBookings
}: {
  disabledBtnIfNoBookings: boolean;
  cancelBookings: ()=> Promise<void>;
}) {
  return (
    <Button
      color="secondary"
      size="small"
      variant="outlined"
      disabled={!disabledBtnIfNoBookings}
      onClick={()=> cancelBookings()}
    >
      Cancel
    </Button>
  );
}
