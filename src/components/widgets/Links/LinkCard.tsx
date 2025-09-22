import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { LinkItem } from "./types";
import { useEffect, useState } from "react";

interface LinkCardProps {
  link: LinkItem;
}

export const LinkCard = ({ link }: LinkCardProps) => {
  const [showLink, setShowLink] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  useEffect(() => {
    if (isDragging) setShowLink(false);
  }, [isDragging]);

  const handleMouseEnter = () => {
    if (!isDragging) setShowLink(true);
  };

  const handleMouseUp = () => {
    setShowLink(true);
  };

  const handleMouseLeave = () => {
    setShowLink(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      style={style}
    >
      <button
        className="aspect-square w-16 touch-none rounded-lg bg-neutral-500 p-2"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {link.image ? (
          <img className="w-full" src={link.image} alt="" />
        ) : (
          <div className="h-full w-full rounded-lg bg-white" />
        )}
      </button>

      {showLink && (
        <div className="absolute left-1/2 z-50 mt-2 -translate-x-1/2">
          <div className="rounded-md bg-neutral-800 px-3 py-1 text-sm">
            <a href={link.href} target="_blank" className="hover:underline">
              {link.href}
            </a>
          </div>
          <div className="absolute bottom-full left-1/2 flex w-full -translate-x-1/2 justify-center">
            <div className="border-4 border-transparent border-b-neutral-800" />
          </div>
        </div>
      )}
    </div>
  );
};
