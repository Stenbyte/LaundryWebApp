import { Toolbar, Typography, IconButton, Badge, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { JSX } from "react";
import { MetaDataType } from "./Header";

export function HeaderBar({
  data,
}: {
  data: Pick<
    MetaDataType,
    "notifications" | "setIsSidebarOpen" | "setIsLoginOpen"
  >;
}): JSX.Element {
  const { notifications, setIsSidebarOpen, setIsLoginOpen } = data;
  return (
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        LB
      </Typography>

      <IconButton color="inherit" onClick={() => setIsSidebarOpen(true)}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Button
        color="inherit"
        variant="outlined"
        onClick={() => setIsLoginOpen(true)}
      >
        Login
      </Button>
    </Toolbar>
  );
}
