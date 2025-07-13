import { Chat, Header, Sidebar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUIState,
  setSidebarOpen,
  toggleApi,
} from "@/store/feature/slices";
import { useApiCommands } from "@/hooks/useApiCommands";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector(selectUIState);

  const { executeCommand } = useApiCommands();

  return (
    <main className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        onToggleApi={(apiId) => dispatch(toggleApi({ apiId }))}
        onClose={() => dispatch(setSidebarOpen(false))}
      />
      <article className="bg-header pt-3.5 flex-1 flex flex-col">
        <Header
          sidebarOpen={sidebarOpen}
          onOpen={() => dispatch(setSidebarOpen(true))}
        />
        <section className="flex-1 flex overflow-hidden">
          <div className="w-1/3 border-r border-gray-200 overflow-hidden">
            <Chat onSendCommand={executeCommand} />
          </div>
        </section>
      </article>
    </main>
  );
};
