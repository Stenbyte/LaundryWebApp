import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationsDrawer } from "./NotificationsDrawer";
import { useUIContext } from "../../context/UseUIContext";

export default function Notifications() {
      const notifications = [
    "Your laundry booking is confirmed for Monday.",
    "Reminder: Laundry slot for tomorrow at 14:00.",
    "New policy update: Max 3 bookings per week.",
  ];
  const { dispatch } = useUIContext();
  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => dispatch({ type: "SET_SIDEBAR", payload: true })}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
       <NotificationsDrawer notifications={notifications} />
    </>
  );
}
