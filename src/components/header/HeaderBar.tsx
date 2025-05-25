import { Toolbar, Typography, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MetaDataType } from "./Header";
import { UserMenu } from "../user/UserMenu";
import { useGlobalContext } from "../../context/UseGlobalContext";

export function HeaderBar({
  data,
}: {
  data: Pick<MetaDataType, "notifications">;
}) {
  const { notifications } = data;
  const { dispatch, user } = useGlobalContext();
  return (
    <Toolbar style={{ background: "#5E503F" }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        LB
      </Typography>
      {user && (
        <>
          <IconButton
            color="inherit"
            onClick={() => dispatch({ type: "SET_SIDEBAR", payload: true })}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <UserMenu {...user} />
        </>
      )}
    </Toolbar>
  );
}
