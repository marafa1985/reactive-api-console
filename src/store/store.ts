import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./feature/chatSlice/chatSlice";
import { endpointApi } from "./feature/endpointApi/endpointApi";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    api: endpointApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(endpointApi.middleware),
});

export type ApplicationState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ApplicationDispatch = typeof store.dispatch;
