import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";
import type { ApplicationState } from "../../store";
import type { ChatMessage } from "@/core/entity";
import { BehaviorSubject } from "rxjs";

export type ChatState = {
  messages: ChatMessage[];
  isProcessing: boolean;
  commandHistory: string[];
  error: string | null;
};

const initialState: ChatState = {
  messages: [],
  isProcessing: false,
  commandHistory: [],
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      if (action.payload.type === "user") {
        state.commandHistory.push(action.payload.content);
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    clearHistory: (state) => {
      state.commandHistory = [];
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      const messageId = action.payload;
      state.messages = state.messages.filter(
        (message) => message.id !== messageId
      );
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addMessage, clearMessages, removeMessage } = chatSlice.actions;

export const selectChatMessages = (state: ApplicationState) =>
  state.chat.messages;

export const selectIsProcessing = (state: ApplicationState) =>
  state.chat.isProcessing;

export const chatReducer = chatSlice.reducer;

export const userMessages$ = new BehaviorSubject<ChatMessage[]>([]);
