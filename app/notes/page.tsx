"use client"

import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { NotebookPen, Plus, Trash2 } from "lucide-react"

type Note = {
  id: string
  text: string
  createdAt: string
}

export default function NotesPage() {
  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const savedNotes = localStorage.getItem("silverstone-notes")

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }

    setHasLoaded(true)
  }, [])

  useEffect(() => {
    if (!hasLoaded) return

    localStorage.setItem("silverstone-notes", JSON.stringify(notes))
  }, [notes, hasLoaded])

  const addNote = () => {
    const trimmedNote = noteText.trim()

    if (!trimmedNote) return

    const newNote: Note = {
      id: crypto.randomUUID(),
      text: trimmedNote,
      createdAt: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setNotes([newNote, ...notes])
    setNoteText("")
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <main className="min-h-screen p-6 pb-32">
      <h1 className="text-4xl font-bold">
        Notes
      </h1>

      <p className="text-white/60 mt-2">
        Save quick reminders for your Silverstone weekend.
      </p>

      <section className="glass rounded-3xl p-5 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <NotebookPen className="text-cyan-300" />
          <h2 className="text-xl font-bold">Add a note</h2>
        </div>

        <textarea
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          placeholder="Write your note here..."
          className="w-full min-h-36 rounded-2xl bg-white/10 border border-white/10 p-4 outline-none resize-none placeholder:text-white/40"
        />

        <button
          onClick={addNote}
          className="mt-4 w-full rounded-2xl bg-cyan-400 text-black font-bold p-4 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Note
        </button>
      </section>

      <section className="space-y-4 mt-6">
        {notes.length === 0 ? (
          <div className="glass rounded-3xl p-5 text-white/60">
            No notes yet.
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="glass rounded-3xl p-5">
              <div className="flex justify-between gap-4">
                <p className="text-white/50 text-sm">{note.createdAt}</p>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-300"
                  aria-label="Delete note"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="mt-3 whitespace-pre-wrap">{note.text}</p>
            </div>
          ))
        )}
      </section>

      <BottomNav />
    </main>
  )
}