import { selectSelectedPanel } from "@/store/feature/slices";
import { selectFilteredResponses } from "@/store/feature/slices/filtersSlice";
import { useAppSelector } from "@/store/hooks";
import { useApiPanelsSortOrder } from "./useApiPanelsSortOrder";

export const useApiSelectedPanel = () => {
  const { orderedApis } = useApiPanelsSortOrder();

  const activePanel = useAppSelector(selectSelectedPanel);
  const panelResponses = useAppSelector(selectFilteredResponses);

  const selectedPanel = orderedApis.find((a) => a.id === activePanel);
  const responses = panelResponses.filter((resp) => resp.apiId === activePanel);

  const selectedApi = orderedApis.find((a) => a.id === activePanel);
  return {
    selectedPanel,
    selectedApi,
    responses,
  };
};
