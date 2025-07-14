import type { DragState } from "@/store/feature/slices";

type Props = {
  dragState: DragState;
};

export const DragHint = ({ dragState }: Props) => {
  return (
    <small>
      {dragState.isDragging && (
        <div className="absolute top-full left-0 right-0 bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm text-blue-700 z-10">
          <div className="flex items-center space-x-2">
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
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            <span>
              Drag to reorder panels • Drop on another tab to change position
            </span>
          </div>
        </div>
      )}
    </small>
  );
};
