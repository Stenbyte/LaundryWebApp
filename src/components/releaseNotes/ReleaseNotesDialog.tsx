import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useAuthContext } from "../../context/UseAuthContext";

export function ReleaseNotesDialog() {
  const [notes, setNotes] = useState("");
  const userData = useAuthContext();

  const handleReleaseNotes = async () => {
    try {
      fetch("/releaseNotes.md")
        .then((res) => res.text())
        .then(setNotes)
        .catch((err) => {
          console.error("Failed to load release notes:", err);
          setNotes("Failed to load release notes.");
        });
    } catch (err) {
      console.error(`Failed to fetch release notes: ${err}`);
    }
  };

  handleReleaseNotes();
  let showLogin = true;
  if (userData?.userId) {
    showLogin = false;
  }
  if (!open) return null;

  return (
    <Dialog
      open={showLogin}
      maxWidth="md"
      style={{ marginRight: "-70vw" }}
      hideBackdrop={false}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>📝 News</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Typography component="div" sx={{ "& p": { margin: 0 } }}>
          <ReactMarkdown>{notes}</ReactMarkdown>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
