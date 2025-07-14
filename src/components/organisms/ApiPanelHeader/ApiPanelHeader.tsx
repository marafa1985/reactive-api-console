import { DraggableTab, DragHint } from "@/components";
import type { Api } from "@/core/entity";
import {
  reorderPanel,
  resetDragState,
  selectDragState,
  selectSelectedPanel,
  setDragState,
  setSelectedPanel,
} from "@/store/feature/slices";
import { selectFilteredResponses } from "@/store/feature/slices/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type DragPanelProps = {
  orderedApis: Api[];
};

const ApiPanelHeader = ({ orderedApis }: DragPanelProps) => {
  const dispatch = useAppDispatch();
  const responses = useAppSelector(selectFilteredResponses);
  const selectedPanel = useAppSelector(selectSelectedPanel);
  const dragState = useAppSelector(selectDragState);

  const handleDragStart = (apiId: string) => {
    dispatch(
      setDragState({
        isDragging: true,
        draggedApiId: apiId,
        dragOverApiId: null,
      })
    );
  };

  const handleDragEnd = () => {
    dispatch(resetDragState());
  };

  const handleDragOver = (apiId: string) => {
    dispatch(setDragState({ dragOverApiId: apiId }));
  };

  const handleDrop = (targetApiId: string) => {
    if (!dragState.draggedApiId || dragState.draggedApiId === targetApiId)
      return;

    dispatch(
      reorderPanel({ draggedApiId: dragState.draggedApiId, targetApiId })
    );
    handleDragEnd();
  };

  const handleSelectPanel = (apiId: string) => {
    dispatch(setSelectedPanel(selectedPanel === apiId ? null : apiId));
  };

  return (
    <header className="border-b border-gray-200 bg-white relative">
      <ul className="flex overflow-x-auto">
        {orderedApis.map((api) => {
          const apiResponses = responses.filter((res) => res.apiId === api.id);
          return (
            <li key={api.id}>
              <DraggableTab
                api={api}
                isSelected={selectedPanel === api.id}
                responseCount={apiResponses.length}
                dragState={dragState}
                onSelect={() => handleSelectPanel(api.id)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            </li>
          );
        })}
      </ul>

      <DragHint dragState={dragState} />
    </header>
  );
};

export default ApiPanelHeader;
