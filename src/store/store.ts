import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./feature/slices/chatSlice";
import { uiReducer } from "./feature/slices/uiSlice";
import { apisReducer } from "./feature/slices/apisSlice";
import { filtersReducer } from "./feature/slices/filtersSlice";
import { responsesReducer } from "./feature/slices/responsesSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    ui: uiReducer,
    apis: apisReducer,
    responses: responsesReducer,
    filters: filtersReducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
