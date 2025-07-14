import { HighlightText } from "@/components";
import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";

type CatFactsProps = {
  response: ApiResponse;
  searchTerm: string;
  hasMatches: boolean;
  matches: HighlightMatch[];
};
export const CatFacts = ({
  response,
  searchTerm,
  hasMatches,
  matches,
}: CatFactsProps) => {
  return (
    <div className="space-y-2">
      <HighlightText
        text={response.data.fact}
        searchTerm={searchTerm}
        className="text-gray-800"
      />
      {hasMatches && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🔍 {matches.length} match{matches.length !== 1 ? "es" : ""} found
        </div>
      )}
    </div>
  );
};
