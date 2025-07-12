import { initialApis } from "@/core/config/apis-list";
import type { Api } from "@/core/entity";
import type { ApplicationState } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ToggleApiPayload = {
  apiId: string;
};
export type ApisState = {
  apis: Omit<Api, "getUrl">[];
};

const initialState: ApisState = {
  apis: initialApis,
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
