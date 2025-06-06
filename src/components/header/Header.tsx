import { AppBar } from "@mui/material";
import { HeaderBar } from "./HeaderBar";
import { NotificationsDrawer } from "./NotificationsDrawer";
import { Login } from "../login/Login";
import { SignUp } from "../login/SignUp";
import { ToastContainer } from "react-toastify";

export type MetaDataType = {
  notifications: string[];
};

export function Header() {
  const notifications = [
    "Your laundry booking is confirmed for Monday.",
    "Reminder: Laundry slot for tomorrow at 14:00.",
    "New policy update: Max 3 bookings per week.",
  ];
  const metaData = {
    notifications,
  };

  return (
    <AppBar position="static" color="primary">
      <ToastContainer autoClose={2000} closeOnClick={true} />
      <HeaderBar data={metaData} />
      <NotificationsDrawer data={metaData} />
      <Login />
      <SignUp />
    </AppBar>
  );
}
