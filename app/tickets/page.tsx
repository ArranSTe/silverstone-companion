"use client"

import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { Upload, Ticket, Trash2, FileText, ImageIcon } from "lucide-react"

type SavedTicket = {
  id: string
  name: string
  type: string
  dataUrl: string
  createdAt: string
}

const DB_NAME = "silverstone-companion"
const STORE_NAME = "tickets"

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.onupgradeneeded = () => {
      const db = request.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getAllTickets(): Promise<SavedTicket[]> {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result as SavedTicket[])
    request.onerror = () => reject(request.error)
  })
}

async function saveTicket(ticket: SavedTicket) {
  const db = await openDatabase()

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put(ticket)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

async function deleteTicket(id: string) {
  const db = await openDatabase()

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)

    reader.readAsDataURL(file)
  })
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<SavedTicket[]>([])
  const [status, setStatus] = useState("Tickets are stored offline on this device.")

  const loadTickets = async () => {
    const savedTickets = await getAllTickets()
    setTickets(savedTickets)
  }

  useEffect(() => {
    loadTickets()
  }, [])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (files.length === 0) return

    setStatus("Saving ticket offline...")

    for (const file of files) {
      const dataUrl = await fileToDataUrl(file)

      const ticket: SavedTicket = {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type,
        dataUrl,
        createdAt: new Date().toISOString(),
      }

      await saveTicket(ticket)
    }

    await loadTickets()
    setStatus("Ticket saved for offline use.")
    event.target.value = ""
  }

  const removeTicket = async (id: string) => {
    await deleteTicket(id)
    await loadTickets()
    setStatus("Ticket removed.")
  }

  return (
    <main className="min-h-screen px-5 pt-6 pb-40">
      <h1 className="text-4xl font-bold">
        Tickets
      </h1>

      <p className="text-white/60 mt-2">
        Upload your weekend tickets and keep them saved offline.
      </p>

      <section className="glass rounded-3xl p-6 mt-6">
        <div className="flex items-start gap-4">
          <div className="bg-pink-500 rounded-2xl p-3">
            <Ticket />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Offline Ticket Wallet
            </h2>

            <p className="text-white/60 mt-2">
              PDF and image tickets are saved on this device so you can open them even without mobile data.
            </p>
          </div>
        </div>

        <label className="mt-6 flex items-center justify-center gap-3 bg-pink-500 rounded-2xl py-4 font-semibold cursor-pointer">
          <Upload />
          Upload Ticket
          <input
            type="file"
            accept="application/pdf,image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        <p className="text-cyan-300 text-sm mt-4">
          {status}
        </p>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Saved Tickets
          </h2>

          <p className="text-white/50 text-sm">
            {tickets.length} saved
          </p>
        </div>

        {tickets.length === 0 && (
          <div className="glass rounded-3xl p-6 mt-4">
            <h3 className="text-xl font-bold">
              No tickets saved yet
            </h3>

            <p className="text-white/60 mt-2">
              Upload your ticket PDFs or screenshots before travelling.
            </p>
          </div>
        )}

        <div className="space-y-4 mt-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="glass rounded-3xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3 min-w-0">
                  <div className="bg-white/10 rounded-2xl p-3 h-fit">
                    {ticket.type.includes("image") ? <ImageIcon /> : <FileText />}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold truncate">
                      {ticket.name}
                    </h3>

                    <p className="text-white/50 text-sm mt-1">
                      Saved offline
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeTicket(ticket.id)}
                  className="text-red-300 shrink-0"
                  aria-label="Delete ticket"
                >
                  <Trash2 />
                </button>
              </div>

              {ticket.type.includes("image") ? (
                <img
                  src={ticket.dataUrl}
                  alt={ticket.name}
                  className="mt-4 rounded-2xl w-full max-h-[520px] object-contain bg-black/30"
                />
              ) : (
                <div className="mt-4">
                  <a
                    href={ticket.dataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-white/10 rounded-2xl py-4 font-semibold"
                  >
                    Open PDF Ticket
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  )
}