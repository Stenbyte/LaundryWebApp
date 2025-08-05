import { AppBar, LinearProgress } from "@mui/material";
import { HeaderBar } from "./HeaderBar";
import { NotificationsDrawer } from "./NotificationsDrawer";
import { Login } from "../login/Login";
import { SignUp } from "../login/SignUp";
import { ToastContainer } from "react-toastify";
import { ReleaseNotesDialog } from "../releaseNotes/ReleaseNotesDialog";
import { useAuthContext } from "../../context/UseAuthContext";
import LoadingCircle from "../loadingCircle/LoadingCircle";

export function Header() {
  const notifications = [
    "Your laundry booking is confirmed for Monday.",
    "Reminder: Laundry slot for tomorrow at 14:00.",
    "New policy update: Max 3 bookings per week.",
  ];
  const metaData = {
    notifications,
  };
  const { data: user, isLoading } = useAuthContext();

  const showLogin = !isLoading && !user?.userId;

  return (
    <>
      <AppBar color="primary">
        <ToastContainer autoClose={2000} closeOnClick={true} />
        <HeaderBar data={metaData} />
        <NotificationsDrawer data={metaData} />
      </AppBar>
      {isLoading && (
        <LinearProgress
          sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
        />
      )}
      {isLoading && <LoadingCircle />}
      {showLogin && (
        <>
          <Login />
          <SignUp />
          <ReleaseNotesDialog />
        </>
      )}
    </>
  );
}
