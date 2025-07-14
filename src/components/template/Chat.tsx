import type { ApiResponse } from "@/core/entity";
import { ChatCommand, ChatPanel } from "@/components";
import { useApiCommands } from "@/hooks";

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: number;
  type: "user" | "system" | "error";
  apiResponse?: ApiResponse;
}

export const Chat = () => {
  const { executeCommand } = useApiCommands();

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden">
      <ChatPanel />

      <ChatCommand onSendCommand={executeCommand} />
    </div>
  );
};
