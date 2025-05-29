import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RTLComponent } from "./theme";
import mainRoutes from "./routes/mainRoutes";
export default function App() {
  return (
    <RTLComponent>
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <mainRoutes />
      </ThemeProvider>
    </RTLComponent>
  );
}
