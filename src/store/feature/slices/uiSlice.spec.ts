import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, setSidebarOpen, selectUIState } from "./uiSlice";
import { chatReducer } from "./chatSlice";
import { apisReducer } from "./apisSlice";
import { endpointApi } from "../apis/endpointApi";

describe("uiSlice", () => {
  const createTestStore = () => {
    return configureStore({
      reducer: {
        chat: chatReducer,
        ui: uiReducer,
        apis: apisReducer,
        endpointApi: endpointApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(endpointApi.middleware),
    });
  };

  it("should create setSidebarOpen action with correct payload", () => {
    const action = setSidebarOpen(false);

    expect(action).toEqual({
      type: "ui/setSidebarOpen",
      payload: false,
    });
  });

  it("should create setSidebarOpen action with true payload", () => {
    const action = setSidebarOpen(true);

    expect(action).toEqual({
      type: "ui/setSidebarOpen",
      payload: true,
    });
  });

  it("should return updated state after action dispatch", () => {
    const store = createTestStore();

    store.dispatch(setSidebarOpen(false));
    const state = store.getState();
    const selectedState = selectUIState(state);

    expect(selectedState).toEqual({
      sidebarOpen: false,
    });
  });

  it("should return updated state after action dispatch", () => {
    const store = createTestStore();

    store.dispatch(setSidebarOpen(false));
    const state = store.getState();
    const selectedState = selectUIState(state);

    expect(selectedState).toEqual({
      sidebarOpen: false,
    });
  });
});
