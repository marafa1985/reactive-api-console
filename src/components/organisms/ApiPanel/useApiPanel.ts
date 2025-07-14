import { useApiSelectedPanel } from "@/hooks/useApiSelectedPanel";
import { type HighlightMatch, findMatches } from "@/utils";
import { useState, useEffect } from "react";

export interface FilterState {
  global: string;
  perPanel: Record<string, string>;
}

export const useApiPanel = () => {
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

  return {
    responseMatches,
    searchTerm,
    setSearchTerm,
  };
};
