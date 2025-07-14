import type { ApplicationState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UpdateFilterPayload = {
  global?: string;
  panelId?: string;
  panelFilter?: string;
};

export type FiltersState = {
  global: string;
  perPanel: Record<string, string>;
  activeSearches: Record<string, boolean>;
};

const initialState: FiltersState = {
  global: "",
  perPanel: {},
  activeSearches: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<UpdateFilterPayload>) => {
      const { global, panelId, panelFilter } = action.payload;

      if (global !== undefined) {
        state.global = global;
        state.activeSearches.global = global.length > 0;
      }

      if (panelId && panelFilter !== undefined) {
        state.perPanel[panelId] = panelFilter;
        state.activeSearches[panelId] = panelFilter.length > 0;
      }
    },
    clearGlobalFilter: (state) => {
      state.global = "";
      state.activeSearches.global = false;
    },
    clearPanelFilter: (state, action: PayloadAction<string>) => {
      const panelId = action.payload;
      delete state.perPanel[panelId];
      delete state.activeSearches[panelId];
    },
    clearAllFilters: (state) => {
      state.global = "";
      state.perPanel = {};
      state.activeSearches = {};
    },
  },
});

export const {
  updateFilter,
  clearGlobalFilter,
  clearPanelFilter,
  clearAllFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const selectFilters = (state: ApplicationState) => state.filters;
export const selectGlobalFilter = (state: ApplicationState) =>
  state.filters.global;
export const selectPanelFilter =
  (panelId: string) => (state: ApplicationState) =>
    state.filters.perPanel[panelId] || "";

export const selectFilteredResponses = (state: ApplicationState) => {
  const responses = state.responses.items;
  const globalFilter = state.filters.global;

  if (!globalFilter) return responses;

  return responses.filter((response) => {
    const searchText = JSON.stringify(response.data).toLowerCase();
    return searchText.includes(globalFilter.toLowerCase());
  });
};
