import { useSortable } from "@dnd-kit/sortable";
import type { ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface WidgetWrapperProps {
  id: string;
  children: ReactNode;
}

export const WidgetWrapper = ({ id, children }: WidgetWrapperProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  return (
    <div className="relative" ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 rounded bg-neutral-500 p-0.5 text-white"
      >
        <GripVertical size={16} />
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
