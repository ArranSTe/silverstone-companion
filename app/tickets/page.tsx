"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function TicketsPage() {
  const [tickets, setTickets] = useState<string[]>([])
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  useEffect(() => {
    const savedTickets = localStorage.getItem("silverstoneTickets")

    if (savedTickets) {
      setTickets(JSON.parse(savedTickets))
    }
  }, [])

  const saveTickets = (updatedTickets: string[]) => {
    setTickets(updatedTickets)
    localStorage.setItem("silverstoneTickets", JSON.stringify(updatedTickets))
  }

  const handleTicketUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        const imageUrl = reader.result as string
        saveTickets([...tickets, imageUrl])
      }

      reader.readAsDataURL(file)
    })
  }

  const openTicket = (index: number) => {
    setSelectedTicketIndex(index)
  }

  const closeTicket = () => {
    setSelectedTicketIndex(null)
  }

  const showPreviousTicket = () => {
    if (selectedTicketIndex === null) return

    setSelectedTicketIndex((current) => {
      if (current === null) return current
      return current === 0 ? tickets.length - 1 : current - 1
    })
  }

  const showNextTicket = () => {
    if (selectedTicketIndex === null) return

    setSelectedTicketIndex((current) => {
      if (current === null) return current
      return current === tickets.length - 1 ? 0 : current + 1
    })
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return

    const touchEndX = event.changedTouches[0].clientX
    const difference = touchStartX - touchEndX

    if (difference > 50) {
      showNextTicket()
    }

    if (difference < -50) {
      showPreviousTicket()
    }

    setTouchStartX(null)
  }

  const deleteTicket = (indexToDelete: number) => {
    const updatedTickets = tickets.filter((_, index) => index !== indexToDelete)
    saveTickets(updatedTickets)

    if (selectedTicketIndex === indexToDelete) {
      setSelectedTicketIndex(null)
    }
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Your tickets</p>
        <h1 className="iphone-title">Tickets</h1>
        <p className="iphone-subtitle">
          Save your ticket images here so you can quickly open them at the gate.
        </p>
      </header>

      <section className="rounded-3xl border border-white/10 bg-white/10 p-4">
        <label className="block cursor-pointer rounded-2xl border border-dashed border-white/30 bg-black/30 p-5 text-center">
          <span className="text-sm font-semibold">Upload ticket images</span>
          <p className="mt-1 text-xs text-white/60">
            You can add more than one ticket.
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleTicketUpload}
            className="hidden"
          />
        </label>
      </section>

      {tickets.length === 0 ? (
        <section className="mt-4 rounded-3xl border border-white/10 bg-white/10 p-5 text-center">
          <p className="text-sm text-white/70">No tickets added yet.</p>
        </section>
      ) : (
        <section className="mt-4 grid grid-cols-2 gap-3">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/10"
            >
              <button
                type="button"
                onClick={() => openTicket(index)}
                className="block w-full"
              >
                <img
                  src={ticket}
                  alt={`Ticket ${index + 1}`}
                  className="h-52 w-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={() => deleteTicket(index)}
                className="w-full bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-200"
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      )}

      {selectedTicketIndex !== null && tickets[selectedTicketIndex] && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={closeTicket}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white"
            aria-label="Close ticket"
          >
            <X size={24} />
          </button>

          {tickets.length > 1 && (
            <button
              type="button"
              onClick={showPreviousTicket}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white"
              aria-label="Previous ticket"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div className="flex max-h-[85vh] w-full items-center justify-center">
            <img
              src={tickets[selectedTicketIndex]}
              alt={`Ticket ${selectedTicketIndex + 1}`}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            />
          </div>

          {tickets.length > 1 && (
            <button
              type="button"
              onClick={showNextTicket}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white"
              aria-label="Next ticket"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {tickets.length > 1 && (
            <div className="absolute bottom-6 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              {selectedTicketIndex + 1} / {tickets.length}
            </div>
          )}
        </div>
      )}
    </main>
  )
}