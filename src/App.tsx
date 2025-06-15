import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RTLComponent } from "./theme";
import MainRoutes from "./routes/mainRoutes";
import { useAppSelector } from "./redux/store";
import { selectTheme } from "./redux/slices/themeSlice"; 
import { lightTheme, darkTheme } from "./theme";
import ResponsiveAppBar from "./pages/navbar/ResponsiveAppBar";

export default function App() {
  const { mode } = useAppSelector(selectTheme); 

  return (
    <RTLComponent>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <MainRoutes />
      </ThemeProvider>
    </RTLComponent>
  );
}
