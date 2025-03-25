import { Button } from "@mui/material";

export function EditBtn({
  props,
}: {
  props: {
    setDisabledBtn: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditSlot: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) {
  return (
    <Button
      color="primary"
      size="small"
      variant="contained"
      onClick={() => {
        return props.setIsEditSlot(true), props.setDisabledBtn(!true);
      }}
    >
      Edit
    </Button>
  );
}
