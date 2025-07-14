import { useCallback } from "react";
import {
  updateFilter,
  clearGlobalFilter,
  clearPanelFilter,
  clearAllFilters,
  selectFilters,
  selectGlobalFilter,
  selectFilteredResponses,
} from "@/store/feature/slices/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const globalFilter = useAppSelector(selectGlobalFilter);
  const filteredResponses = useAppSelector(selectFilteredResponses);

  const updateGlobalFilter = useCallback(
    (filter: string) => {
      dispatch(updateFilter({ global: filter }));
    },
    [dispatch]
  );

  const updatePanelFilter = useCallback(
    (panelId: string, filter: string) => {
      dispatch(updateFilter({ panelId, panelFilter: filter }));
    },
    [dispatch]
  );

  const clearGlobal = useCallback(() => {
    dispatch(clearGlobalFilter());
  }, [dispatch]);

  const clearPanel = useCallback(
    (panelId: string) => {
      dispatch(clearPanelFilter(panelId));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  const getPanelFilter = useCallback(
    (panelId: string) => {
      return filters.perPanel[panelId] || "";
    },
    [filters.perPanel]
  );

  return {
    filters,
    globalFilter,
    filteredResponses,
    updateGlobalFilter,
    updatePanelFilter,
    clearGlobal,
    clearPanel,
    clearAll,
    getPanelFilter,
  };
}
