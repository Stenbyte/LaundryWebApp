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
import { useUIContext } from "../../context/UseUIContext";

export function NotificationsDrawer({
  data,
}: {
  data: Pick<MetaDataType, "notifications">;
}) {
  const { notifications } = data;
  const { dispatch, isSidebarOpen } = useUIContext();
  return (
    <Drawer
      anchor="right"
      open={isSidebarOpen}
      onClose={() => dispatch({ type: "SET_SIDEBAR", payload: false })}
    >
      <List sx={{ width: 300 }}>
        <ListItem>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notifications
          </Typography>
          <IconButton
            onClick={() => dispatch({ type: "SET_SIDEBAR", payload: false })}
          >
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
