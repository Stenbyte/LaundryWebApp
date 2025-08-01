import { Typography, Chip, Divider, Modal, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAuthContext } from "../../context/UseAuthContext";
import { news } from "./releaseNotes";

export function ReleaseNotesDialog() {
  const userData = useAuthContext();
  let showLogin = true;
  if (userData?.userId) {
    showLogin = false;
  }

  const newsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showLogin) {
      const { current: news } = newsRef;
      news?.focus();
    }
  }, [showLogin]);

  if (!open) return null;

  return (
    <>
      <Modal
        open={showLogin}
        style={{ marginRight: "-70vw", background: "red", width: "30vw" }}
        hideBackdrop={true}
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
      >
        <Box
          sx={{
            maxHeight: "30vh",
            overflowY: "auto",
            width: "250px",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography sx={{ m: 0, p: 2 }}>📝 News</Typography>
          {news.map((n) => {
            return (
              <>
                <Chip
                  label={n.date}
                  ref={newsRef}
                  id="news-dialog-description"
                  tabIndex={-1}
                />
                <Divider />
              </>
            );
          })}
        </Box>
      </Modal>
    </>
  );
}
