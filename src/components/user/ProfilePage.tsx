import { useState } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth, useLogOut } from "../../hooks/useAuth";

export function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate } = useLogOut();
  const { data: user } = useAuth();
  return (
    <Box>
      <IconButton onClick={handleClick} color="inherit">
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: { width: 150 },
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={async () => await mutate(user?.email)}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
