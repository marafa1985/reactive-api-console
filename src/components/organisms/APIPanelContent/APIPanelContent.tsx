import {
  NoResponses,
  NoResultMatched,
  SearchSummary,
} from "@/components/atoms";
import { ResponsesPanel } from "@/components/template/ResponsesPanel";
import { useApiSelectedPanel } from "@/hooks/useApiSelectedPanel";
import type { HighlightMatch } from "@/utils";
import React, { useState } from "react";

type APIPanelContentProps = {
  searchTerm: string;
  responseMatches: Record<string, HighlightMatch[]>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const APIPanelContent = ({
  searchTerm,
  responseMatches,
  setSearchTerm,
}: APIPanelContentProps) => {
  const { responses } = useApiSelectedPanel();
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  const filteredResponses = responses.filter(
    (response) =>
      !searchTerm ||
      JSON.stringify(response.data)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  const pinnedResponses = filteredResponses.filter((r) => pinnedIds.has(r.id));
  const unpinnedResponses = filteredResponses.filter(
    (r) => !pinnedIds.has(r.id)
  );
  const sortedResponses = [...pinnedResponses, ...unpinnedResponses];

  if (sortedResponses.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        {responses.length === 0 ? (
          <NoResponses />
        ) : (
          <NoResultMatched
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
    );
  }

  return (
    <section className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        <SearchSummary
          searchTerm={searchTerm}
          sortedResponses={sortedResponses}
        />

        <ResponsesPanel
          searchTerm={searchTerm}
          responseMatches={responseMatches}
          pinnedIds={pinnedIds}
          setPinnedIds={setPinnedIds}
          sortedResponses={sortedResponses}
        />
      </div>
    </section>
  );
};
