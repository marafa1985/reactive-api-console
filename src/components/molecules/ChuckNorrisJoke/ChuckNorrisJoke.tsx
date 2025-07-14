import { HighlightText } from "@/components/atoms";
import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";

type ChuckNorrisProps = {
  response: ApiResponse;
  searchTerm: string;
  hasMatches: boolean;
  matches: HighlightMatch[];
};

export const ChuckNorrisJoke = ({
  response,
  searchTerm,
  hasMatches,
  matches,
}: ChuckNorrisProps) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">
        Found {response.data.total} jokes:
      </p>
      {response.data.result
        .slice(0, 3)
        .map((joke: { value: string }, idx: number) => (
          <div
            key={idx}
            className={`p-2 rounded text-sm ${
              searchTerm &&
              joke.value.toLowerCase().includes(searchTerm.toLowerCase())
                ? "bg-yellow-50 border border-yellow-200"
                : "bg-gray-50"
            }`}
          >
            <HighlightText text={joke.value} searchTerm={searchTerm} />
          </div>
        ))}
      {response.data.result.length > 3 && (
        <p className="text-xs text-gray-500">
          ... and {response.data.result.length - 3} more
        </p>
      )}
      {hasMatches && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🔍 {matches.length} match{matches.length !== 1 ? "es" : ""} found in
          jokes
        </div>
      )}
    </div>
  );
};
