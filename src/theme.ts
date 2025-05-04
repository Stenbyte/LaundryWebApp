import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#007bff",
          padding: 0,
          margin: 0,
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
