import { Toolbar, Typography, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MetaDataType } from "./Header";
import { UserMenu } from "../user/UserMenu";
import { useAuth } from "../../hooks/useAuth";

export function HeaderBar({
  data,
}: {
  data: Pick<
    MetaDataType,
    "notifications" | "setIsSidebarOpen" | "setIsLogedIn"
  >;
}) {
  const { notifications, setIsSidebarOpen } = data;
  const { data: user } = useAuth();

  return (
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        LB
      </Typography>
      {user && (
        <>
          <IconButton color="inherit" onClick={() => setIsSidebarOpen(true)}>
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
