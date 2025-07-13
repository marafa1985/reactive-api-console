import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./feature/slices/chatSlice";
import { uiReducer } from "./feature/slices/uiSlice";
import { apisReducer } from "./feature/slices/apisSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    ui: uiReducer,
    apis: apisReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
