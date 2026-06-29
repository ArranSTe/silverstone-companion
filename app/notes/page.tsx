"use client"

import { useEffect, useState } from "react"
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
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Quick reminders</p>

        <h1 className="iphone-title">
          Notes
        </h1>

        <p className="iphone-subtitle">
          Save anything you need to remember during the weekend.
        </p>
      </header>

      <section className="iphone-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-11 w-11 rounded-2xl bg-cyan-300/20 flex items-center justify-center">
            <NotebookPen className="text-cyan-200" />
          </div>

          <h2 className="text-xl font-black">
            Add a note
          </h2>
        </div>

        <textarea
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          placeholder="Example: Meet at Lando Stand before qualifying..."
          className="w-full min-h-36 rounded-2xl bg-white/10 border border-white/10 p-4 outline-none resize-none placeholder:text-white/40"
        />

        <button
          onClick={addNote}
          className="mt-4 w-full min-h-[54px] rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          <Plus size={20} />
          Add Note
        </button>
      </section>

      <section className="iphone-list mt-5">
        {notes.length === 0 ? (
          <div className="iphone-card text-white/60">
            No notes yet.
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="iphone-card">
              <div className="flex justify-between gap-4">
                <p className="text-white/50 text-sm">
                  {note.createdAt}
                </p>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="h-9 w-9 rounded-xl bg-red-400/15 text-red-200 flex items-center justify-center"
                  aria-label="Delete note"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="mt-3 whitespace-pre-wrap leading-relaxed">
                {note.text}
              </p>
            </div>
          ))
        )}
      </section>

    </main>
  )
}