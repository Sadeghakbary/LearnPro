import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RTLComponent } from "./theme";
import MainRoutes from "./routes/mainRoutes";
import { useAppSelector } from "./redux/store";
import { lightTheme } from "./theme";
import { darkTheme } from "./theme";
import ResponsiveAppBar from "./pages/navbar/ResponsiveAppBar";

export default function App() {
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <RTLComponent>
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <ResponsiveAppBar/>
        <MainRoutes />
      </ThemeProvider>
    </RTLComponent>
  );
}
