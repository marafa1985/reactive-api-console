export const NoActivePanel = () => {
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
      <div className="text-center">
        <p className="text-lg">📺 Select an API panel</p>
        <p className="text-sm mt-2">
          Click on the tabs above to view API responses
        </p>
        <p className="text-xs mt-1 text-gray-400">
          💡 Drag tabs to reorder them
        </p>
      </div>
    </div>
  );
};
