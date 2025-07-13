import type { ApiResponse } from "@/core/entity";
import { ChatSearch, ChatCommand, ChatMessages } from "@/components";
import { useChat } from "@/hooks";
import { useAppSelector } from "@/store/hooks";
import { selectChatMessages, userMessages$ } from "@/store/feature/slices";

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: number;
  type: "user" | "system" | "error";
  apiResponse?: ApiResponse;
}

interface ChatProps {
  onSendCommand: (command: string) => void;
}

export const Chat = ({ onSendCommand }: ChatProps) => {
  const messages = useAppSelector(selectChatMessages);
  const { searchTerm, setSearchTerm, filteredMessages } = useChat(messages);
  userMessages$.next(messages);

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden">
      <ChatSearch
        filteredMessages={filteredMessages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ChatMessages
        filteredMessages={filteredMessages}
        messages={messages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ChatCommand onSendCommand={onSendCommand} />
    </div>
  );
};
