import { HighlightText } from "@/components/atoms";
import type { ChatMessage } from "@/core/entity";
import { cn, formatTimestamp } from "@/utils";

type ChatLogProps = {
  filteredMessages: ChatMessage[];
  searchTerm: string;
};

export const ChatLog = ({ filteredMessages, searchTerm }: ChatLogProps) => {
  return (
    <ul className="space-y-4">
      {filteredMessages.map((message) => {
        const hasMatch = hasSearchMatch(message, searchTerm);
        return (
          <li
            key={message.id}
            className={cn(
              `card p-4 transition-all duration-200`,
              messageCssTypes[message.type],
              hasMatch ? "ring-2 ring-yellow-400" : ""
            )}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getMessageIcon(message.type)}</span>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-2 flex items-center justify-between">
                  <span>{formatTimestamp(message.timestamp)}</span>
                  {hasMatch && (
                    <span className="tag tag-active text-xs">Match</span>
                  )}
                </div>
                <div className="whitespace-pre-wrap text-sm">
                  <HighlightText
                    text={message.content}
                    searchTerm={searchTerm}
                  />
                </div>
                {message.apiResponse && (
                  <div className="mt-2 text-xs text-gray-600">
                    → Response sent to {message.apiResponse.apiId} panel
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const messageCssTypes = {
  user: "message-user",
  system: "message-system",
  error: "message-error",
};

const hasSearchMatch = (message: ChatMessage, searchTerm: string): boolean => {
  if (!searchTerm) return false;
  return message.content.toLowerCase().includes(searchTerm.toLowerCase());
};

const getMessageIcon = (type: ChatMessage["type"]) => {
  switch (type) {
    case "user":
      return "👤";
    case "system":
      return "🤖";
    case "error":
      return "❌";
    default:
      return "💬";
  }
};
