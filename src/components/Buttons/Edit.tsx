import { Button } from "@mui/material";

export function EditBtn({
  setDisabledBtn,
  setIsEditSlot,
  isEditSlot,
  disabledBtnIfNoBookings,
}: {
  setDisabledBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditSlot: React.Dispatch<React.SetStateAction<boolean>>;
  isEditSlot: boolean;
  disabledBtnIfNoBookings: boolean;
}) {
  return (
    <Button
      color="primary"
      size="small"
      variant="contained"
      disabled={!disabledBtnIfNoBookings}
      onClick={() => {
        return (
          setIsEditSlot(!isEditSlot), setDisabledBtn(!true)
        );
      }}
    >
      Edit
    </Button>
  );
}
