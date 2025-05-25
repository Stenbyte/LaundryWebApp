import { useState } from "react";
import { AppBar } from "@mui/material";

import { HeaderBar } from "./HeaderBar";
import { NotificationsDrawer } from "./NotificationsDrawer";
import { Login } from "../login/Login";
import { SignUp } from "../login/SignUp";
import { UserData } from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";

export type MetaDataType = {
  notifications: string[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  setIsSignupOpen: (open: boolean) => void;
};

export function Header({ user }: { user: UserData | null | undefined }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const notifications = [
    "Your laundry booking is confirmed for Monday.",
    "Reminder: Laundry slot for tomorrow at 14:00.",
    "New policy update: Max 3 bookings per week.",
  ];
  const metaData = {
    notifications,
    isSidebarOpen,
    setIsSidebarOpen,
    isLoginOpen,
    isSignupOpen,
    setIsLoginOpen,
    setIsSignupOpen,
  };

  return (
    <AppBar position="static" color="primary">
      <ToastContainer autoClose={2000} closeOnClick={true} />
      <HeaderBar data={metaData} />
      <NotificationsDrawer data={metaData} />
      {!user?.userId && <Login data={metaData} />}
      <SignUp data={metaData} />
    </AppBar>
  );
}
