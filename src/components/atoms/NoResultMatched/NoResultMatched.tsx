type NoResultMatchedProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const NoResultMatched = ({
  searchTerm,
  setSearchTerm,
}: NoResultMatchedProps) => {
  return (
    <aside>
      <p>🔍 No matches found</p>
      <p className="text-sm mt-2">
        Try adjusting your search term "{searchTerm}"
      </p>
      <button
        onClick={() => {
          setSearchTerm("");
        }}
        className="mt-3 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Clear Filters
      </button>
    </aside>
  );
};
