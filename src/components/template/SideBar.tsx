import { SideBarHeader, AvailableAPIs } from "@/components";
import {
  selectUIState,
  setSidebarOpen,
  toggleApi,
} from "@/store/feature/slices";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cn } from "@/utils";

export const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { sidebarOpen } = useAppSelector(selectUIState);
  return (
    <aside
      data-testid="sidebar"
      className={cn(
        "transition-all duration-300 ",
        sidebarOpen ? "w-80" : "w-0"
      )}
    >
      <article className="sidebar h-full flex flex-col">
        <SideBarHeader
          onClose={() => dispatch(setSidebarOpen(false))}
          data-testid="sidebar-header"
        />

        <AvailableAPIs
          onToggleApi={(apiId) => dispatch(toggleApi({ apiId }))}
          data-testid="api-list"
        />
      </article>
    </aside>
  );
};
