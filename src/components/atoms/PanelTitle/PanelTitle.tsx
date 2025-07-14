import { useApiSelectedPanel } from "@/hooks/useApiSelectedPanel";

export const PanelTitle = ({ searchTerm }: { searchTerm: string }) => {
  const { selectedApi, responses } = useApiSelectedPanel();

  const filteredResponses = responses.filter(
    (response) =>
      !searchTerm ||
      JSON.stringify(response.data)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {selectedApi?.name}
        </h3>
        <p className="text-sm text-gray-500">{selectedApi?.description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-500">
          {responses.length} response{responses.length !== 1 ? "s" : ""}
          {filteredResponses.length !== responses.length && (
            <span className="ml-2 text-blue-600">
              ({filteredResponses.length} filtered)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
