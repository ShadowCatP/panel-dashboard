import { useState, type ReactNode } from "react";
import { Clock } from "./components/widgets/Clock/Clock";
import { Links } from "./components/widgets/Links/Links";
import { Notes } from "./components/widgets/Notes/Notes";
import { Weather } from "./components/widgets/Weather/Weather";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { WidgetWrapper } from "./components/WidgetWrapper/WidgetWrapper";

export const App = () => {
  const [widgets, setWidgets] = useState<
    { id: string; component: ReactNode }[]
  >([
    { id: "clock", component: <Clock /> },
    { id: "weather", component: <Weather /> },
    { id: "notes", component: <Notes /> },
    { id: "links", component: <Links /> },
  ]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (active.id !== over?.id) {
      setWidgets((widgets) => {
        const oldIndex = widgets.findIndex((item) => item.id === active.id);
        const newIndex = widgets.findIndex((item) => item.id === over?.id);

        return arrayMove(widgets, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="mx-auto grid w-full place-content-center px-2">
      <div className="grid min-h-screen w-full grid-cols-3 grid-rows-6 place-content-center gap-3">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={widgets}>
            {widgets.map((widget) => (
              <WidgetWrapper key={widget.id} id={widget.id}>
                {widget.component}
              </WidgetWrapper>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
