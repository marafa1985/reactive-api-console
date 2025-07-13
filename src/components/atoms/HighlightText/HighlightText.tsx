type HighlightTextProps = {
  text: string;
  searchTerm: string;
  className?: string;
};

export const HighlightText = ({
  text,
  searchTerm,
  className = "",
}: HighlightTextProps) => {
  if (!searchTerm || !text) {
    return <span className={className}>{text}</span>;
  }

  // Escape special regex characters in search term
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedSearchTerm})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isMatch = regex.test(part);
        return isMatch ? (
          <mark
            key={index}
            className="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded font-medium animate-pulse"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};
