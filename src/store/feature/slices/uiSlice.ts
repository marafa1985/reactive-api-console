import type { ApplicationState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  sidebarOpen: boolean;
};

const initialState: UIState = {
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { setSidebarOpen } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

export const selectUIState = (state: ApplicationState) => state.ui;
