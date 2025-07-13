import { SideBarHeader, AvailableAPIs } from "@/components";
import { cn } from "@/utils";

type SidebarProps = {
  onToggleApi: (apiId: string) => void;
  onClose: () => void;
  sidebarOpen: boolean;
};

export const Sidebar = ({
  sidebarOpen,
  onToggleApi,
  onClose,
}: SidebarProps) => {
  return (
    <aside
      data-testid="sidebar"
      className={cn(
        "transition-all duration-300 overflow-hidden",
        sidebarOpen ? "w-80" : "w-0"
      )}
    >
      <article className="sidebar h-full flex flex-col">
        <SideBarHeader onClose={onClose} data-testid="sidebar-header" />

        <AvailableAPIs onToggleApi={onToggleApi} data-testid="api-list" />
      </article>
    </aside>
  );
};
