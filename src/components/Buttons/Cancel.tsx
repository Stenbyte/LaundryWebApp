import { toast } from "react-toastify";
import { GenericButton } from "./GenericButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAllBookings } from "../../services/BookingService";

export function CancelBtn({
  disabledBtnIfNoBookings,
}: {
  disabledBtnIfNoBookings: boolean;
}) {
  const queryClient = useQueryClient();

  const cancelMutationFunction = () => {
    return cancelAllBookings();
  };

  const cancelMutation = useMutation({
    mutationFn: cancelMutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      if (error.message === "You can not add new reservation") {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    },
  });
  const cancelBookings = async () => {
    try {
      await cancelMutation.mutateAsync();
      toast.success("Canceled bookings successfully!");
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <GenericButton
      className={!disabledBtnIfNoBookings ? "disabledBtn" : "enabledCancelBtn"}
      disabled={!disabledBtnIfNoBookings}
      onClick={() => cancelBookings()}
    >
      Cancel
    </GenericButton>
  );
}
