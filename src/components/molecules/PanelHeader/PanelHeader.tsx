import { PanelTitle } from "@/components/atoms";
import React from "react";
import { FilterPanel } from "../FilterPanel/FilterPanel";

type PanelHeaderProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const PanelHeader = ({
  searchTerm,
  setSearchTerm,
}: PanelHeaderProps) => {
  return (
    <header className="p-4 border-b border-gray-200">
      <PanelTitle searchTerm={searchTerm} />
      <FilterPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </header>
  );
};
