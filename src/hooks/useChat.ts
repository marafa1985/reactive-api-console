import { useState, useMemo } from "react";
import type { ChatMessage } from "@/core/entity";

export const useChat = (messages: ChatMessage[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = useMemo(() => {
    if (!searchTerm) return messages;
    return messages.filter((message) =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  const clearSearch = () => setSearchTerm("");

  return {
    searchTerm,
    setSearchTerm,
    filteredMessages,
    clearSearch,
  };
};
