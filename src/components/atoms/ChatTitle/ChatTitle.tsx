export const ChatTitle = () => {
  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold">💬</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Chat Console</h2>
        <p className="text-sm text-gray-600">
          Type commands to interact with APIs
        </p>
      </div>
    </div>
  );
};
