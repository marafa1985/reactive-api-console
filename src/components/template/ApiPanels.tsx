import { NoActiveAPI } from "../atoms";
import { ApiPanelWrapper } from "../organisms";
import ApiPanelHeader from "../organisms/ApiPanelHeader/ApiPanelHeader";
import { useApiPanelsSortOrder } from "@/hooks/useApiPanelsSortOrder";

export function ApiPanels() {
  const { orderedApis } = useApiPanelsSortOrder();

  if (orderedApis.length === 0) {
    return <NoActiveAPI />;
  }

  return (
    <div className="h-full flex flex-col">
      <ApiPanelHeader orderedApis={orderedApis} />
      <ApiPanelWrapper />
    </div>
  );
}
