import { APIPanelContent } from "@/components";
import { PanelHeader } from "@/components/molecules/PanelHeader/PanelHeader";
import { useApiSelectedPanel } from "@/hooks/useApiSelectedPanel";
import { findMatches, type HighlightMatch } from "@/utils";
import { useEffect, useState } from "react";

export function ApiPanel() {
  const { responses } = useApiSelectedPanel();

  const [searchTerm, setSearchTerm] = useState("");
  const [responseMatches, setResponseMatches] = useState<
    Record<string, HighlightMatch[]>
  >({});

  useEffect(() => {
    const matches: Record<string, HighlightMatch[]> = {};
    if (searchTerm) {
      responses.forEach((response) => {
        const responseMatches = findMatches(response.data, searchTerm);
        if (responseMatches.length > 0) {
          matches[response.id] = responseMatches;
        }
      });
    }
    setResponseMatches(matches);
  }, [searchTerm]);

  return (
    <div className="h-full flex flex-col bg-white">
      <PanelHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <APIPanelContent
        searchTerm={searchTerm}
        responseMatches={responseMatches}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
