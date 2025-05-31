import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RTLComponent } from "./theme";
import MainRoutes from "./routes/mainRoutes";
import { useAppSelector } from "./redux/store";
import { lightTheme } from "./theme";
import { darkTheme } from "./theme";

export default function App() {
  const themeMode = useAppSelector((state) => state.appConfigs.themeMode);

  return (
    <RTLComponent>
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <MainRoutes />
      </ThemeProvider>
    </RTLComponent>
  );
}
