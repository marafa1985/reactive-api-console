import type { ApplicationState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type DragState = {
  isDragging: boolean;
  draggedApiId: string | null;
  dragOverApiId: string | null;
};

type SetDragStatePayload = Partial<DragState>;

type UIState = {
  sidebarOpen: boolean;
  selectedPanel: string | null;
  dragState: DragState;
};

const initialState: UIState = {
  sidebarOpen: true,
  selectedPanel: null,
  dragState: {
    isDragging: false,
    draggedApiId: null,
    dragOverApiId: null,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSelectedPanel: (state, action: PayloadAction<string | null>) => {
      state.selectedPanel = action.payload;
    },
    togglePanel: (state, action: PayloadAction<string>) => {
      const panelId = action.payload;
      state.selectedPanel = state.selectedPanel === panelId ? null : panelId;
    },
    setDragState: (state, action: PayloadAction<SetDragStatePayload>) => {
      state.dragState = { ...state.dragState, ...action.payload };
    },
    resetDragState: (state) => {
      state.dragState = {
        isDragging: false,
        draggedApiId: null,
        dragOverApiId: null,
      };
    },
  },
});

export const {
  setSidebarOpen,
  toggleSidebar,
  setSelectedPanel,
  togglePanel,
  setDragState,
  resetDragState,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

export const selectUIState = (state: ApplicationState) => state.ui;
export const selectSelectedPanel = (state: ApplicationState) =>
  state.ui.selectedPanel;
export const selectDragState = (state: ApplicationState) => state.ui.dragState;
