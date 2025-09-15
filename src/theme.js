import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0E2148" },
    secondary: { main: "#948979" },
    custom: {
      primaryLight: "#393E46",
      secondaryLight: "#DFD0B8",
    },
  },
});

export default theme;
