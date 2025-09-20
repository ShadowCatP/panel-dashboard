import { Edit, GripVertical, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Note } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface NoteCardProps {
  note: Note;
  deleteNote: (noteId: string) => void;
  updateNoteContent: (noteId: string, content: string) => void;
  isEditing: boolean;
  setEditingId: (id: string | null) => void;
}

export const NoteCard = ({
  note,
  deleteNote,
  updateNoteContent,
  isEditing,
  setEditingId,
}: NoteCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note.id });
  const inputRef = useRef<HTMLInputElement>(null);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setEditingId(note.id);
  };

  const handleEndEditing = () => {
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      handleEndEditing();
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={
        "flex w-full items-center justify-between rounded-lg bg-neutral-500 px-2 py-1"
      }
      style={style}
    >
      <button className="touch-none" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={note.content}
          onChange={(e) => updateNoteContent(note.id, e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleEndEditing}
          className="w-full"
        />
      ) : (
        <span className="h-full flex-1">{note.content}</span>
      )}

      <div className="flex items-center gap-1">
        <button onClick={handleStartEditing}>
          {!isEditing ? <Edit size={16} /> : <X size={16} />}
        </button>

        <button
          onClick={() => deleteNote(note.id)}
          className="transition-colors hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
