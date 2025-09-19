// TODO Notes Widget. Add/delete/edit notes. Pin notes at the top.

import { Edit, GripVertical, Star, X } from "lucide-react";
import { useEffect, useState, type DragEvent } from "react";
import type { Note } from "./types";

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [draggedItem, setDraggedItem] = useState<{
    note: Note;
    index: number;
  } | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setNotes((prevNotes) => {
      const sortedNotes = [...prevNotes].sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
      });
      return sortedNotes;
    });
  }, [notes]);

  const addNote = (content: string) => {
    setNotes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), content, isPinned: false },
    ]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const setPinned = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note,
      ),
    );
  };

  const handleDragStart = (e: DragEvent, note: Note, index: number) => {
    setDraggedItem({ note, index });
    e.dataTransfer.effectAllowed = "move";
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggedItem && draggedItem.index !== index) setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.index === dropIndex) return;

    const newNotes = [...notes];
    const draggedNote = newNotes[draggedItem.index];

    const draggedNotePinned = draggedNote.isPinned;
    const dropTargetPinned = newNotes[dropIndex].isPinned;

    if (draggedNotePinned !== dropTargetPinned) return;

    newNotes.splice(draggedItem.index, 1);

    newNotes.splice(dropIndex, 0, draggedNote);

    setNotes(newNotes);
    setDragOverIndex(null);
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-neutral-600 px-8 py-2 text-white">
      {isEditing && (
        <div className="absolute inset-0 grid place-content-center bg-neutral-400/20 text-black">
          <div className="flex flex-col gap-2 rounded-lg bg-white p-3">
            <button onClick={() => setIsEditing(false)}>
              <X />
            </button>
            <input
              className="rounded bg-neutral-300 pl-2"
              content={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button
              onClick={() => {
                addNote(noteContent);
                setNoteContent("");
                setIsEditing(false);
              }}
              disabled={noteContent.trim() === ""}
              className="cursor-pointer bg-neutral-500 text-white disabled:cursor-not-allowed disabled:bg-red-300"
            >
              Add Note
            </button>
          </div>
        </div>
      )}

      {notes.map((note, index) => (
        <div
          key={note.id}
          draggable
          onDragStart={(e) => handleDragStart(e, note, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          className={`flex w-full cursor-move justify-between rounded-lg bg-neutral-500 px-2 py-1 transition-all duration-200 ${
            dragOverIndex === index
              ? "-translate-y-0.5 transform bg-neutral-400 shadow-lg"
              : ""
          } ${draggedItem?.index === index ? "opacity-50" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="cursor-grab text-neutral-300 hover:text-white active:cursor-grabbing">
              <GripVertical size={16} />
            </div>
            <span className="select-none">{note.content}</span>
          </div>
          <div className="flex items-center">
            <button
              className="text-neutral-700 transition-colors hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setPinned(note.id);
              }}
            >
              {note.isPinned ? (
                <Star fill="currentColor" size={16} />
              ) : (
                <Star size={16} />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="ml-1 transition-colors hover:text-white"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
              className="ml-1 transition-colors hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => setIsEditing(true)}>Add note</button>
    </div>
  );
};
