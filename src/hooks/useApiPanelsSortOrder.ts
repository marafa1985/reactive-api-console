import { selectApisState } from "@/store/feature/slices";
import { useAppSelector } from "@/store/hooks";

export const useApiPanelsSortOrder = () => {
  const { apis, panelOrder } = useAppSelector(selectApisState);
  const activeApis = apis.filter((api) => api.isActive);

  const orderedApis = [...activeApis].sort((a, b) => {
    const orderA = panelOrder.find((o) => o.apiId === a.id)?.order ?? 999;
    const orderB = panelOrder.find((o) => o.apiId === b.id)?.order ?? 999;
    return orderA - orderB;
  });

  return { orderedApis };
};
