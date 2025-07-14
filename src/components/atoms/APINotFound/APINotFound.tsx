import { selectSelectedPanel, setSelectedPanel } from "@/store/feature/slices";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const APINotFound = () => {
  const dispatch = useAppDispatch();
  const selectedPanel = useAppSelector(selectSelectedPanel);
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
      <div className="text-center">
        <p className="text-lg">⚠️ API not found</p>
        <p className="text-sm mt-2">
          The selected API "{selectedPanel}" is not available
        </p>
        <button
          onClick={() => dispatch(setSelectedPanel(null))}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Close Panel
        </button>
      </div>
    </div>
  );
};
