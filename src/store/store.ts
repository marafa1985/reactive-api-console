import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./feature/slices/chatSlice";
import { endpointApi } from "./feature/apis/endpointApi";
import { uiReducer } from "./feature/slices/uiSlice";
import { apisReducer } from "./feature/slices/apisSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    ui: uiReducer,
    apis: apisReducer,
    endpointApi: endpointApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(endpointApi.middleware),
});

export type ApplicationState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ApplicationDispatch = typeof store.dispatch;
