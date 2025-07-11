import { createSlice } from "@reduxjs/toolkit/react";
import type { ApplicationState } from "../../store";
import { endpointApi } from "../endpointApi/endpointApi";
import type { ApiResponse } from "../../../core/entity";

export type ChatState = {
  entities: Record<string, ApiResponse>[];
};

const initialState: ChatState = {
  entities: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resolveCommand: (state: ChatState) => {
      state.entities = [...state.entities];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      endpointApi.endpoints.getApiResponse.matchFulfilled,
      (state, action) => {
        const response: ApiResponse = action.payload;
        console.log("API Response:", response, "state:", state);
      }
    );
  },
});

export const { resolveCommand } = chatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChat = (state: ApplicationState) => state.chat.entities;

export const chatReducer = chatSlice.reducer;
