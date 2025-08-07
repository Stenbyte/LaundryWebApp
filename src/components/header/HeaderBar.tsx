import { Toolbar, Typography } from "@mui/material";

import { UserMenu } from "../user/UserMenu";
import { useAuthContext } from "../../context/UseAuthContext";
import Notifications from "../notifications/Notifications";

export function HeaderBar() {
  const { data: userData } = useAuthContext();
  return (
    <Toolbar style={{ background: "#5E506F" }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }} data-testid="logo">
        LB
      </Typography>
      {userData?.userId && (
        <>
          <Notifications />
          <UserMenu />
        </>
      )}
    </Toolbar>
  );
}
