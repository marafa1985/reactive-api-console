import type { HighlightMatch } from "@/utils";

type ResultWrapperProps = {
  id: string;
  timestamp: number;
  pinnedIds: Set<string>;
  responseMatches: Record<string, HighlightMatch[]>;
  togglePin: (id: string) => void;
  children: React.ReactNode;
};

export const ResultWrapper = ({
  id,
  timestamp,
  pinnedIds,
  responseMatches,
  togglePin,
  children,
}: ResultWrapperProps) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        pinnedIds.has(id)
          ? "border-yellow-300 bg-yellow-50"
          : responseMatches[id]?.length > 0
          ? "border-blue-200 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-xs text-gray-500">
            {new Date(timestamp).toLocaleString()}
          </div>
          {responseMatches[id]?.length > 0 && (
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {responseMatches[id].length} match
              {responseMatches[id].length !== 1 ? "es" : ""}
            </div>
          )}
        </div>
        <button
          onClick={() => togglePin(id)}
          className={`p-1 rounded hover:bg-gray-100 ${
            pinnedIds.has(id) ? "text-yellow-600" : "text-gray-400"
          }`}
          title={pinnedIds.has(id) ? "Unpin" : "Pin"}
        >
          📌
        </button>
      </div>
      {children}
    </div>
  );
};
