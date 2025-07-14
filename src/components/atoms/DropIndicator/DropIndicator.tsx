export const DropIndicator = () => {
  return (
    <div className="drop-indicator absolute inset-0 pointer-events-none">
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
        Drop here
      </div>
    </div>
  );
};
