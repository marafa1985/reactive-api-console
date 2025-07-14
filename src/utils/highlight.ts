export interface HighlightMatch {
  path: string;
  value: string;
  matchedText: string;
}

export function findMatches(
  obj: unknown,
  searchTerm: string,
  path = ""
): HighlightMatch[] {
  if (!searchTerm) return [];

  const matches: HighlightMatch[] = [];
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedSearchTerm, "gi");

  function searchInValue(value: unknown, currentPath: string) {
    if (typeof value === "string") {
      const match = value.match(regex);
      if (match) {
        matches.push({
          path: currentPath,
          value: value,
          matchedText: match[0],
        });
      }
    } else if (typeof value === "number") {
      const stringValue = value.toString();
      const match = stringValue.match(regex);
      if (match) {
        matches.push({
          path: currentPath,
          value: stringValue,
          matchedText: match[0],
        });
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        searchInValue(item, `${currentPath}[${index}]`);
      });
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([key, val]) => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        searchInValue(val, newPath);
      });
    }
  }

  searchInValue(obj, path);
  return matches;
}

export function highlightMatches(text: string, searchTerm: string): string {
  if (!searchTerm || !text) return text;

  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedSearchTerm})`, "gi");

  return text.replace(
    regex,
    '<mark class="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded font-medium">$1</mark>'
  );
}
