import { type Api } from "@/core/entity";
import { SideBarHeader, APIList } from "@/components";

type SidebarProps = {
  apis: Api[];
  onToggleApi: (apiId: string) => void;
  onClose: () => void;
  sidebarOpen: boolean;
};

export const Sidebar = ({
  apis,
  sidebarOpen,
  onToggleApi,
  onClose,
}: SidebarProps) => {
  return (
    <aside
      data-testid="sidebar"
      className={`${
        sidebarOpen ? "w-80" : "w-0"
      } transition-all duration-300 overflow-hidden`}
    >
      <article className="sidebar h-full flex flex-col">
        <SideBarHeader onClose={onClose} data-testid="sidebar-header" />

        <APIList apis={apis} onToggleApi={onToggleApi} data-testid="api-list" />
      </article>
    </aside>
  );
};
