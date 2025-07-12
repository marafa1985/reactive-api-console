type SideBarHeaderProps = {
  onClose: () => void;
} & React.HTMLAttributes<HTMLElement>;

export const SideBarHeader = ({ onClose, ...rest }: SideBarHeaderProps) => {
  return (
    <header
      className="sidebar-header p-6 flex items-center justify-between"
      data-testid="sidebar-header"
      {...rest}
    >
      <div className="flex items-center space-x-3">
        <h2 className="text-lg font-semibold text-white">Available API</h2>
      </div>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-200 text-white cursor-pointer"
        aria-label="close side bar"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </header>
  );
};
