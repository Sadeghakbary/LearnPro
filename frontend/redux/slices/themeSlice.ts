import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ThemeState {
  mode: "light" | "dark";
}

const savedTheme = localStorage.getItem("mode") as "light" | "dark" | null;

const initialState: ThemeState = {
  mode: savedTheme || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      state.mode = newMode;
      localStorage.setItem("mode", newMode);
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
      localStorage.setItem("mode", action.payload);
    },
  },
});

export const { changeTheme, setTheme } = themeSlice.actions;


export const selectTheme = (state: RootState) => state.theme;


export default themeSlice.reducer;
