import { HighlightText } from "@/components/atoms";
import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";

type BoredAPIProps = {
  response: ApiResponse;
  searchTerm: string;
  hasMatches: boolean;
  matches: HighlightMatch[];
};

export const BoredAPI = ({
  response,
  searchTerm,
  hasMatches,
  matches,
}: BoredAPIProps) => {
  return (
    <div className="space-y-2">
      <HighlightText
        text={response.data.activity}
        searchTerm={searchTerm}
        className="text-gray-800 font-medium"
      />
      <div className="flex space-x-4 text-sm text-gray-600">
        <span>
          Type:{" "}
          <HighlightText
            text={response.data.type}
            searchTerm={searchTerm}
            className="font-medium"
          />
        </span>
        <span>
          Participants:{" "}
          <HighlightText
            text={response.data.participants.toString()}
            searchTerm={searchTerm}
            className="font-medium"
          />
        </span>
      </div>
      {hasMatches && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          🔍 {matches.length} match{matches.length !== 1 ? "es" : ""} found
        </div>
      )}
    </div>
  );
};
