import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import AppRouter from "./AppRouter";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App
