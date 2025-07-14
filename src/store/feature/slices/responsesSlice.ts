import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiResponse } from "@/core/entity";

export type AddResponsePayload = {
  apiResponse: ApiResponse;
  commandId: string;
};

export type ResponsesState = {
  items: ApiResponse[];
  loading: Record<string, boolean>;
  errors: Record<string, string>;
  lastUpdated: number;
};

const initialState: ResponsesState = {
  items: [],
  loading: {},
  errors: {},
  lastUpdated: Date.now(),
};

const responsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<AddResponsePayload>) => {
      const { apiResponse } = action.payload;
      state.items.push(apiResponse);
      state.lastUpdated = Date.now();
      delete state.loading[apiResponse.apiId];
      delete state.errors[apiResponse.apiId];
    },
    clearResponses: (state) => {
      state.items = [];
      state.loading = {};
      state.errors = {};
      state.lastUpdated = Date.now();
    },
  },
});

export const { addResponse, clearResponses } = responsesSlice.actions;
export const responsesReducer = responsesSlice.reducer;
