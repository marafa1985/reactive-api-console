import React from "react";

type ChatSearchResultProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const ChatSearchResult = ({
  searchTerm,
  setSearchTerm,
}: ChatSearchResultProps) => {
  return (
    <div className="text-center text-gray-500 mt-8">
      <p>🔍 No messages match "{searchTerm}"</p>
      <button
        onClick={() => setSearchTerm("")}
        className="mt-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Clear Search
      </button>
    </div>
  );
};
