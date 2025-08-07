import { AppBar } from "@mui/material";
import { HeaderBar } from "./HeaderBar";
import { ToastContainer } from "react-toastify";

export function Header() {
  return (
    <>
      <AppBar color="primary">
        <ToastContainer autoClose={2000} closeOnClick={true} />
        <HeaderBar />
      </AppBar>
    </>
  );
}
