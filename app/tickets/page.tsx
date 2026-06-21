"use client"

import { useEffect, useState } from "react"
import { ImagePlus, Ticket, Trash2 } from "lucide-react"

type SavedTicket = {
  id: string
  name: string
  image: string
  createdAt: string
}

const TICKET_KEY = "silverstone-saved-ticket-images"

export default function TicketsPage() {
  const [tickets, setTickets] = useState<SavedTicket[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(TICKET_KEY)

    if (saved) {
      try {
        setTickets(JSON.parse(saved))
      } catch {
        localStorage.removeItem(TICKET_KEY)
      }
    }
  }, [])

  const saveTickets = (nextTickets: SavedTicket[]) => {
    setTickets(nextTickets)
    localStorage.setItem(TICKET_KEY, JSON.stringify(nextTickets))
  }

  const handleUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.")
        return
      }

      const reader = new FileReader()

      reader.onload = () => {
        const image = reader.result

        if (typeof image !== "string") return

        const newTicket: SavedTicket = {
          id: crypto.randomUUID(),
          name: file.name,
          image,
          createdAt: new Date().toISOString(),
        }

        saveTickets([...tickets, newTicket])
      }

      reader.readAsDataURL(file)
    })
  }

  const deleteTicket = (id: string) => {
    const confirmed = confirm("Delete this saved ticket image?")
    if (!confirmed) return

    saveTickets(tickets.filter((ticket) => ticket.id !== id))
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Your passes</p>

        <h1 className="iphone-title">Tickets</h1>

        <p className="iphone-subtitle">
          Upload screenshots or photos of your tickets so they are easy to find
          on the day.
        </p>
      </header>

      <section className="iphone-card mb-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center">
            <Ticket className="text-cyan-200" />
          </div>

          <div>
            <h2 className="text-xl font-black">Saved ticket images</h2>

            <p className="text-white/60 text-sm mt-1 leading-relaxed">
              Images are stored on this device, so they can still be opened
              later on the same phone.
            </p>
          </div>
        </div>
      </section>

      <label className="mb-5 flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-[32px] border border-dashed border-white/20 bg-white/10 p-6 text-center active:scale-[0.98] transition">
        <ImagePlus className="text-cyan-200 mb-3" size={34} />

        <span className="text-xl font-black">Upload ticket image</span>

        <span className="text-white/60 text-sm mt-2">
          Choose a screenshot or photo from your phone.
        </span>

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => handleUpload(event.target.files)}
        />
      </label>

      {tickets.length === 0 ? (
        <section className="iphone-card">
          <h2 className="text-xl font-black">No tickets saved yet</h2>

          <p className="text-white/60 mt-2 leading-relaxed">
            Upload your ticket screenshots before travelling so they are ready
            in the app.
          </p>
        </section>
      ) : (
        <section className="space-y-5">
          {tickets.map((ticket) => (
            <article key={ticket.id} className="iphone-card">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-black truncate">
                    {ticket.name}
                  </h2>

                  <p className="text-white/45 text-sm mt-1">
                    Saved{" "}
                    {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>

                <button
                  onClick={() => deleteTicket(ticket.id)}
                  className="h-11 w-11 rounded-2xl bg-red-400/15 text-red-200 flex items-center justify-center active:scale-95"
                  aria-label="Delete ticket"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <img
                src={ticket.image}
                alt={ticket.name}
                className="w-full rounded-[24px] border border-white/10"
              />
            </article>
          ))}
        </section>
      )}

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">Important</h2>

        <p className="text-white/60 mt-2 leading-relaxed">
          Keep the original official ticket app/email too. This page is a handy
          backup, not a replacement for the official ticket source.
        </p>
      </section>
    </main>
  )
}