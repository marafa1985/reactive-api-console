import type { ChatMessage } from "@/components";
import type { ApiResponse } from "@/core/entity";
import { addMessage } from "@/store/feature/slices";
import { useAppDispatch } from "@/store/hooks";
import { useCallback } from "react";

export const useChatMessage = () => {
  const dispatch = useAppDispatch();

  const userMessage = useCallback(
    (content: string) => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        timestamp: Date.now(),
        type: "user",
      };

      dispatch(addMessage(userMessage));
    },
    [dispatch]
  );

  const systemMessage = useCallback(
    (command: string, apiResponse?: ApiResponse) => {
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: command,
        timestamp: Date.now(),
        type: "system",
        apiResponse,
      };

      dispatch(addMessage(systemMessage));
    },
    [dispatch]
  );

  const errorMessage = useCallback(
    (command: string) => {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `❌ Error executing: ${command}`,
        timestamp: Date.now(),
        type: "error",
      };
      dispatch(addMessage(errorMessage));
    },
    [dispatch]
  );

  return {
    userMessage,
    systemMessage,
    errorMessage,
  };
};
