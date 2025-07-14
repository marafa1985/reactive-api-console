import { HighlightText } from "@/components/atoms";
import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";

type DefaultAPIResponseProps = {
  response: ApiResponse;
  searchTerm: string;
  hasMatches: boolean;
  matches: HighlightMatch[];
};

export const DefaultAPIResponse = ({
  response,
  searchTerm,
  hasMatches,
  matches,
}: DefaultAPIResponseProps) => {
  return (
    <div className="space-y-2">
      <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
        <HighlightText
          text={JSON.stringify(response.data, null, 2)}
          searchTerm={searchTerm}
        />
      </pre>
      {hasMatches && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🔍 {matches.length} match{matches.length !== 1 ? "es" : ""} found in
          data
        </div>
      )}
    </div>
  );
};
