import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      "100": "#90ad94",
      main: "#46b646",
      "900": "#21642b",
    },
    secondary: {
      main: "#FFF",
    },
    error: {
      main: "#EB421C",
    },
    text: {
      primary: "#333", // Change this to your desired text color
    },
  },
});

export default theme;
