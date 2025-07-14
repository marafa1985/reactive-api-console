import { APINotFound, ApiPanel, NoActivePanel } from "@/components";
import { useApiSelectedPanel } from "@/hooks/useApiSelectedPanel";

export const ApiPanelWrapper = () => {
  const { selectedPanel, selectedApi } = useApiSelectedPanel();

  if (!selectedPanel) {
    return <NoActivePanel />;
  }

  if (!selectedApi) {
    return <APINotFound />;
  }

  return (
    <div className="flex-1 overflow-hidden">
      <ApiPanel />
    </div>
  );
};
