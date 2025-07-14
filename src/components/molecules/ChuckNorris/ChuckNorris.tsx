import { HighlightText } from "@/components/atoms";
import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";

type ChuckNorrisProps = {
  response: ApiResponse;
  searchTerm: string;
  hasMatches: boolean;
  matches: HighlightMatch[];
};

export const ChuckNorris = ({
  response,
  searchTerm,
  hasMatches,
  matches,
}: ChuckNorrisProps) => {
  return (
    <div className="space-y-2">
      <HighlightText
        text={response.data.value}
        searchTerm={searchTerm}
        className="text-gray-800"
      />
      {response.data.categories && response.data.categories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {response.data.categories.map((cat: string, idx: number) => (
            <span
              key={idx}
              className={`text-xs px-2 py-1 rounded ${
                searchTerm &&
                cat.toLowerCase().includes(searchTerm.toLowerCase())
                  ? "bg-yellow-200 text-yellow-900 ring-2 ring-yellow-400"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              <HighlightText text={cat} searchTerm={searchTerm} />
            </span>
          ))}
        </div>
      )}
      {hasMatches && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🔍 {matches.length} match{matches.length !== 1 ? "es" : ""} found
        </div>
      )}
    </div>
  );
};
