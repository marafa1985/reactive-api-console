import type { ApiResponse } from "@/core/entity";

type SearchResultProps = {
  searchTerm: string;
  sortedResponses: ApiResponse[];
};

export const SearchSummary = ({
  searchTerm,
  sortedResponses,
}: SearchResultProps) => {
  return (
    <>
      {searchTerm && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-yellow-800">🔍 Searching for:</span>
            <code className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded font-mono">
              {searchTerm}
            </code>
            <span className="text-yellow-700">
              ({sortedResponses.length} result
              {sortedResponses.length !== 1 ? "s" : ""})
            </span>
          </div>
        </div>
      )}
    </>
  );
};
