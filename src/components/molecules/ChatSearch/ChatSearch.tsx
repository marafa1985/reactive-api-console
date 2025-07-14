import { ChatTitle } from "@/components/atoms";
import type { ChatMessage } from "@/core/entity";

type ChatSearchProps = {
  filteredMessages: ChatMessage[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatSearch = ({
  filteredMessages,
  searchTerm,
  setSearchTerm,
}: ChatSearchProps) => {
  return (
    <div className="card-header">
      <ChatTitle />

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chat messages..."
          className="input-search"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="mt-2 text-xs text-orange-600">
          {filteredMessages.length} message
          {filteredMessages.length !== 1 ? "s" : ""} found
        </div>
      )}
    </div>
  );
};
