import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#007bff",
          color: "white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        },
      },
    },
  },
});
