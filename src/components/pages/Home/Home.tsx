import { Header, Sidebar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUIState,
  setSidebarOpen,
  selectApisState,
  toggleApi,
} from "@/store/feature/slices";
import {} from "@/store/feature/slices/apisSlice";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { apis } = useAppSelector(selectApisState);
  const { sidebarOpen } = useAppSelector(selectUIState);

  return (
    <main className="flex h-screen bg-gray-50">
      <Sidebar
        apis={apis}
        sidebarOpen={sidebarOpen}
        onToggleApi={(apiId) => dispatch(toggleApi({ apiId }))}
        onClose={() => dispatch(setSidebarOpen(false))}
      />
      <Header
        sidebarOpen={sidebarOpen}
        onOpen={() => dispatch(setSidebarOpen(true))}
      />
    </main>
  );
};
