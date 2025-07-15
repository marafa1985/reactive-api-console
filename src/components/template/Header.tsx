import { setSidebarOpen } from "@/store/feature/slices";
import { useAppDispatch } from "@/store/hooks";
import { cn } from "@/utils";

export const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <header className="header-nav p-4 shadow-sm" data-testid="header">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(setSidebarOpen(true))}
            className={cn(
              "p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-white block sm:block cursor-pointer"
            )}
            aria-label="open side bar"
            data-testid="open-sidebar-btn"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-white">
              Reactive API Console
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
