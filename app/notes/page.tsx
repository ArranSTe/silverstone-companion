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
<<<<<<< HEAD
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
=======
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
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
        </div>

        <textarea
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
<<<<<<< HEAD
          placeholder="Example: Meet at Lando Stand before qualifying..."
=======
          placeholder="Write your note here..."
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
          className="w-full min-h-36 rounded-2xl bg-white/10 border border-white/10 p-4 outline-none resize-none placeholder:text-white/40"
        />

        <button
          onClick={addNote}
<<<<<<< HEAD
          className="mt-4 w-full min-h-[54px] rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
=======
          className="mt-4 w-full rounded-2xl bg-cyan-400 text-black font-bold p-4 flex items-center justify-center gap-2"
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
        >
          <Plus size={20} />
          Add Note
        </button>
      </section>

<<<<<<< HEAD
      <section className="iphone-list mt-5">
        {notes.length === 0 ? (
          <div className="iphone-card text-white/60">
=======
      <section className="space-y-4 mt-6">
        {notes.length === 0 ? (
          <div className="glass rounded-3xl p-5 text-white/60">
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
            No notes yet.
          </div>
        ) : (
          notes.map((note) => (
<<<<<<< HEAD
            <div key={note.id} className="iphone-card">
              <div className="flex justify-between gap-4">
                <p className="text-white/50 text-sm">
                  {note.createdAt}
                </p>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="h-9 w-9 rounded-xl bg-red-400/15 text-red-200 flex items-center justify-center"
=======
            <div key={note.id} className="glass rounded-3xl p-5">
              <div className="flex justify-between gap-4">
                <p className="text-white/50 text-sm">{note.createdAt}</p>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-300"
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
                  aria-label="Delete note"
                >
                  <Trash2 size={18} />
                </button>
              </div>

<<<<<<< HEAD
              <p className="mt-3 whitespace-pre-wrap leading-relaxed">
                {note.text}
              </p>
=======
              <p className="mt-3 whitespace-pre-wrap">{note.text}</p>
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
            </div>
          ))
        )}
      </section>

      <BottomNav />
    </main>
  )
}