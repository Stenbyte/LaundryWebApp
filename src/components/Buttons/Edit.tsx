import { Button } from "@mui/material";
import { Booking } from "../bookingTable/BookingTable";

export function EditBtn({
  props,
}: {
  props: {
    setDisabledBtn: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditSlot: React.Dispatch<React.SetStateAction<boolean>>;
    isEditSlot: boolean;
    bookings: Booking[] | undefined;
  };
}) {
  const disabledBtnIfNoBookings = props.bookings?.map((booking) =>
    booking.slots.some((slot) => slot.booked === true)
  )[0];

  return (
    <Button
      color="primary"
      size="small"
      variant="contained"
      disabled={!disabledBtnIfNoBookings}
      onClick={() => {
        return (
          props.setIsEditSlot(!props.isEditSlot), props.setDisabledBtn(!true)
        );
      }}
    >
      Edit
    </Button>
  );
}
