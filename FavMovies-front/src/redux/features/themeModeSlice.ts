import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";

export type ThemeState = {
  themeMode: ThemeMode;
};

const initialState: ThemeState = {
  themeMode: "dark",
};

export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
