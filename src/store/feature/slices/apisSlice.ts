import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Api } from "@/core/entity";
import { apiRegistry } from "@/core/api/registry";
import type { ApplicationState } from "@/store/store";
import { BehaviorSubject } from "rxjs";

export type ToggleApiPayload = {
  apiId: string;
};
export type PanelOrder = {
  apiId: string;
  order: number;
};
export type ApisState = {
  apis: Api[];
  panelOrder: PanelOrder[];
  error: string | null;
};

const initialState: ApisState = {
  apis: apiRegistry.map(({ api }) => api),
  panelOrder: apiRegistry.map((api, index) => ({
    apiId: api.api.id,
    order: index,
  })),
  error: null,
};

const apisSlice = createSlice({
  name: "apis",
  initialState,
  reducers: {
    toggleApi: (state, action: PayloadAction<ToggleApiPayload>) => {
      const { apiId } = action.payload;
      const api = state.apis.find((api) => api.id === apiId);
      if (api) {
        api.isActive = !api.isActive;
      }
    },
    reorderPanel: (
      state,
      action: PayloadAction<{ draggedApiId: string; targetApiId: string }>
    ) => {
      const { draggedApiId, targetApiId } = action.payload;
      // Create a new array from the current order
      const currentOrder = state.panelOrder.slice();
      const draggedIndex = currentOrder.findIndex(
        (o) => o.apiId === draggedApiId
      );
      const targetIndex = currentOrder.findIndex(
        (o) => o.apiId === targetApiId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [draggedItem] = currentOrder.splice(draggedIndex, 1);
        currentOrder.splice(targetIndex, 0, draggedItem);

        // Update order values and assign new array
        state.panelOrder = currentOrder.map((item, index) => ({
          ...item,
          order: index,
        }));
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { toggleApi, reorderPanel, clearError } = apisSlice.actions;
export const apisReducer = apisSlice.reducer;

export const selectApisState = (state: ApplicationState) => state.apis;

export const selectPanelOrder = (state: ApplicationState) =>
  state.apis.panelOrder;

export const activeApis$ = new BehaviorSubject<Api[]>([]);
