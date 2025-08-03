import { Typography, Chip, Divider, Modal, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { news } from "./releaseNotes";

export function ReleaseNotesDialog() {
  const newsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current: news } = newsRef;
    news?.focus();
  }, []);

  if (!open) return null;

  return (
    <>
      <Modal
        open={true}
        style={{ width: "30vw" }}
        hideBackdrop={true}
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
      >
        <Box
          sx={{
            maxHeight: "35vh",
            overflowY: "auto",
            width: "300px",
            margin: "auto",
            marginTop: "30vh",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography sx={{ m: 0, p: 2 }}>📝 News</Typography>
          {news.map((n, i) => {
            return (
              <div key={i} style={{ margin: "10px 10px" }}>
                <Chip
                  label={n.date}
                  ref={newsRef}
                  id="news-dialog-description"
                  tabIndex={-1}
                />
                <Typography>{n.change}</Typography>
                <Divider />
              </div>
            );
          })}
        </Box>
      </Modal>
    </>
  );
}
