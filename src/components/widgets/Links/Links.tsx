// TODO Links/Shortcuts widget. DnD reordering. Add links with icons.

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { LinkCard } from "./LinkCard";
import type { LinkItem } from "./types";

export const Links = () => {
  const [links, setLinks] = useState<LinkItem[]>([
    { id: "1", href: "https://github.com/ShadowCatP", image: "/vite.svg" },
    { id: "2", href: "https://github.com/ShadowCatP" },
    { id: "3", href: "https://github.com/ShadowCatP" },
    { id: "4", href: "https://github.com/ShadowCatP" },
    { id: "5", href: "https://github.com/ShadowCatP" },
    { id: "6", href: "https://github.com/ShadowCatP" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 500, tolerance: 10 },
    }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (active.id !== over?.id) {
      setLinks((links) => {
        const oldIndex = links.findIndex((item) => item.id === active.id);
        const newIndex = links.findIndex((item) => item.id === over?.id);

        return arrayMove(links, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-neutral-600 px-8 py-5 text-white">
      <div className="grid grid-cols-[repeat(3,min-content)] items-center justify-items-center gap-4">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={links}>
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
