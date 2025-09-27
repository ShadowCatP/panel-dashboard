// TODO Notes Widget. Add/delete/edit notes. Pin notes at the top.

import { useState } from "react";
import { NoteCard } from "./NoteCard";
import type { Note } from "./types";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const addNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content: "",
    };

    setEditingNoteId(newNote.id);
    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingNoteId === id) setEditingNoteId(null);
  };

  const updateNoteContent = (id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, content } : note)),
    );
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (active.id !== over?.id) {
      setNotes((notes) => {
        const oldIndex = notes.findIndex((item) => item.id === active.id);
        const newIndex = notes.findIndex((item) => item.id === over?.id);

        return arrayMove(notes, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-2 rounded-lg bg-neutral-600 px-8 py-2 text-white">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={notes} strategy={verticalListSortingStrategy}>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              updateNoteContent={updateNoteContent}
              isEditing={editingNoteId === note.id}
              setEditingId={setEditingNoteId}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        className="cursor-pointer rounded bg-neutral-500 px-3 py-1 transition-colors hover:bg-neutral-400"
        onClick={() => addNote()}
      >
        Add note
      </button>
    </div>
  );
};
