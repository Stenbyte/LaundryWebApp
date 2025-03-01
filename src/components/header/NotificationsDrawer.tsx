import {
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MetaDataType } from "./Header";

export function NotificationsDrawer({
  data,
}: {
  data: Pick<
    MetaDataType,
    "notifications" | "setIsSidebarOpen" | "isSidebarOpen"
  >;
}) {
  const { setIsSidebarOpen, isSidebarOpen, notifications } = data;
  return (
    <Drawer
      anchor="right"
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    >
      <List sx={{ width: 300 }}>
        <ListItem>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notifications
          </Typography>
          <IconButton onClick={() => setIsSidebarOpen(false)}>
            <CloseIcon />
          </IconButton>
        </ListItem>
        {notifications.map((notif, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={notif} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
