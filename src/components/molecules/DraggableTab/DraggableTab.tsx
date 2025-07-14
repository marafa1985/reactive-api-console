import type React from "react";
import type { Api } from "@/core/entity";
import type { DragState } from "@/store/feature/slices";

import { useState, useRef } from "react";
import { DropIndicator } from "@/components";

interface DraggableTabProps {
  api: Api;
  isSelected: boolean;
  responseCount: number;
  dragState: DragState;
  onSelect: () => void;
  onDragStart: (apiId: string) => void;
  onDragEnd: () => void;
  onDragOver: (apiId: string) => void;
  onDrop: (targetApiId: string) => void;
}

export function DraggableTab({
  api,
  isSelected,
  responseCount,
  dragState,
  onSelect,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: DraggableTabProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const tabRef = useRef<HTMLButtonElement>(null);

  // Add safety check for api prop
  if (!api) {
    return (
      <div className="px-4 py-3 text-sm text-red-500 border-b-2 border-red-300">
        Invalid API
      </div>
    );
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", api.id);
    onDragStart(api.id);

    // Create a custom drag image
    if (tabRef.current) {
      const dragImage = tabRef.current.cloneNode(true) as HTMLElement;
      dragImage.style.transform = "rotate(5deg)";
      dragImage.style.opacity = "0.8";
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      setTimeout(() => document.body.removeChild(dragImage), 0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) {
      setIsDragOver(true);
      onDragOver(api.id);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set drag over to false if we're leaving the tab entirely
    const rect = tabRef.current?.getBoundingClientRect();
    if (rect) {
      const { clientX, clientY } = e;
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        setIsDragOver(false);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const draggedApiId = e.dataTransfer.getData("text/plain");
    if (draggedApiId !== api.id) {
      onDrop(api.id);
    }
  };

  const handleDragEnd = () => {
    setIsDragOver(false);
    onDragEnd();
  };

  const isBeingDragged = dragState.draggedApiId === api.id;
  const isDragTarget = isDragOver && dragState.draggedApiId !== api.id;

  return (
    <button
      ref={tabRef}
      draggable
      onClick={onSelect}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={`
    panel-tab transition-all duration-200 cursor-move relative
    ${isSelected ? "panel-tab-active" : "panel-tab-inactive"}
    ${isBeingDragged ? "opacity-50 scale-95 rotate-1" : ""}
    ${isDragTarget ? "bg-orange-100 border-orange-300 scale-105" : ""}
    ${dragState.isDragging && !isBeingDragged ? "hover:bg-orange-50" : ""}
  `}
      title={`${api.name} - Drag to reorder`}
    >
      {/* Drag handle indicator */}
      <div className="flex flex-col space-y-0.5 opacity-40">
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
      </div>

      <span className="font-medium">{api.name}</span>

      {responseCount > 0 && (
        <span className="tag tag-active text-xs px-2 py-1">
          {responseCount}
        </span>
      )}

      {/* Drop indicator */}
      {isDragTarget && <DropIndicator />}
    </button>
  );
}
