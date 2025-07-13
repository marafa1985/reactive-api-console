import { ChatLog, ChatSearchResult, ChatWelcomeMessage } from "@/components";
import type { ChatMessage } from "@/core/entity";
import { useEffect, useRef } from "react";

type ChatMessagesProps = {
  messages: ChatMessage[];
  filteredMessages: ChatMessage[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatMessages = ({
  filteredMessages,
  messages,
  searchTerm,
  setSearchTerm,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="flex-1 overflow-y-auto p-3 space-y-4">
      {filteredMessages.length === 0 && messages.length > 0 ? (
        <ChatSearchResult
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      ) : filteredMessages.length === 0 ? (
        <ChatWelcomeMessage />
      ) : null}

      <ChatLog filteredMessages={filteredMessages} searchTerm={searchTerm} />

      <div ref={messagesEndRef} />
    </section>
  );
};
