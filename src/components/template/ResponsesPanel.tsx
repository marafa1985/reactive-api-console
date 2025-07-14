import type { ApiResponse } from "@/core/entity";
import type { HighlightMatch } from "@/utils";
import {
  CatFacts,
  ChuckNorris,
  ChuckNorrisJoke,
  BoredAPI,
  GithubUsers,
  Weather,
  DefaultAPIResponse,
  ResultWrapper,
} from "@/components";
import { useApiSelectedPanel } from "@/hooks/useApiSelectedPanel";

type ResponsesPanelProps = {
  searchTerm: string;
  responseMatches: Record<string, HighlightMatch[]>;
  sortedResponses: ApiResponse[];
  pinnedIds: Set<string>;
  setPinnedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export const ResponsesPanel = ({
  searchTerm,
  responseMatches,
  sortedResponses,
  pinnedIds,
  setPinnedIds,
}: ResponsesPanelProps) => {
  const { selectedApi } = useApiSelectedPanel();
  const togglePin = (responseId: string) => {
    const newPinned = new Set(pinnedIds);
    if (newPinned.has(responseId)) {
      newPinned.delete(responseId);
    } else {
      newPinned.add(responseId);
    }
    setPinnedIds(newPinned);
  };

  const renderResponseData = (response: ApiResponse) => {
    const matches = responseMatches[response.id] || [];
    const hasMatches = matches.length > 0;

    switch (selectedApi?.id) {
      case "cat-facts":
        return (
          <CatFacts
            response={response}
            searchTerm={searchTerm}
            hasMatches={hasMatches}
            matches={matches}
          />
        );
      case "chuck-norris":
        if (response.data.value) {
          return (
            <ChuckNorris
              response={response}
              searchTerm={searchTerm}
              hasMatches={hasMatches}
              matches={matches}
            />
          );
        } else if (response.data.result) {
          return (
            <ChuckNorrisJoke
              response={response}
              searchTerm={searchTerm}
              hasMatches={hasMatches}
              matches={matches}
            />
          );
        }
        break;
      case "bored-api":
        return (
          <BoredAPI
            response={response}
            searchTerm={searchTerm}
            hasMatches={hasMatches}
            matches={matches}
          />
        );
      case "github-users":
        return (
          <GithubUsers
            response={response}
            searchTerm={searchTerm}
            hasMatches={hasMatches}
            matches={matches}
          />
        );
      case "weather":
        return (
          <Weather
            response={response}
            searchTerm={searchTerm}
            hasMatches={hasMatches}
            matches={matches}
          />
        );
      default:
        return (
          <DefaultAPIResponse
            response={response}
            searchTerm={searchTerm}
            hasMatches={hasMatches}
            matches={matches}
          />
        );
    }
  };

  return (
    <ul className="space-y-2">
      {sortedResponses.map((response) => (
        <li key={response.id}>
          <ResultWrapper
            id={response.id}
            timestamp={response.timestamp}
            pinnedIds={pinnedIds}
            responseMatches={responseMatches}
            togglePin={togglePin}
          >
            {renderResponseData(response)}
          </ResultWrapper>
        </li>
      ))}
    </ul>
  );
};
