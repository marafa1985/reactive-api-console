import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Api } from "@/core/entity";
import { apiRegistry } from "@/core/api/registry";
import type { ApplicationState } from "@/store/store";
import { BehaviorSubject } from "rxjs";

export type ToggleApiPayload = {
  apiId: string;
};
export type ApisState = {
  apis: Api[];
};

const initialState: ApisState = {
  apis: apiRegistry.map(({ api }) => api),
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
  },
});

export const { toggleApi } = apisSlice.actions;
export const apisReducer = apisSlice.reducer;

export const selectApisState = (state: ApplicationState) => state.apis;

export const selectActiveApisState = (state: ApplicationState) =>
  state.apis.apis.filter((api) => api.isActive);

export const activeApis$ = new BehaviorSubject<Api[]>([]);
