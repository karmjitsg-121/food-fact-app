import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },

    secondary: {
      main: "#ff9800",
    },
  },

  typography: {
    fontFamily: "Arial, sans-serif",
    h4: {
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 10,
  },
});

export default theme;