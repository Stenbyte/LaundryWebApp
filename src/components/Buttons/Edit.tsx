import { GenericButton } from "./GenericButton";

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
    <GenericButton
      className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledBtn"}
      disabled={!disabledBtnIfNoBookings}
      onClick={() => {
        return setIsEditSlot(!isEditSlot), setDisabledBtn(!true);
      }}
    >
      Edit
    </GenericButton>
  );
}
