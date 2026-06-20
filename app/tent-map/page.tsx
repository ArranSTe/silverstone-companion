"use client"

import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { MapPin, Navigation, Trash2 } from "lucide-react"

type TentLocation = {
  label: string
  note: string
  savedAt: string
}

export default function TentMapPage() {
  const [label, setLabel] = useState("")
  const [note, setNote] = useState("")
  const [tentLocation, setTentLocation] = useState<TentLocation | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("silverstone-tent-location")

    if (saved) {
      setTentLocation(JSON.parse(saved))
    }
  }, [])

  const saveTentLocation = () => {
    const newLocation: TentLocation = {
      label: label.trim() || "My tent",
      note: note.trim(),
      savedAt: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setTentLocation(newLocation)
    localStorage.setItem("silverstone-tent-location", JSON.stringify(newLocation))
    setLabel("")
    setNote("")
  }

  const clearTentLocation = () => {
    setTentLocation(null)
    localStorage.removeItem("silverstone-tent-location")
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Camping helper</p>

        <h1 className="iphone-title">
          Find My Tent
        </h1>

        <p className="iphone-subtitle">
          Save a simple description of where your tent is so you can find it after a long day.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-green-300/25 to-cyan-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <MapPin size={30} />
        </div>

        <h2 className="text-[30px] leading-[32px] font-black">
          Tent location
        </h2>

        {tentLocation ? (
          <div className="mt-4">
            <p className="text-cyan-200 font-black text-xl">
              {tentLocation.label}
            </p>

            {tentLocation.note && (
              <p className="text-white/70 mt-2 leading-relaxed">
                {tentLocation.note}
              </p>
            )}

            <p className="text-white/50 text-sm mt-3">
              Saved {tentLocation.savedAt}
            </p>
          </div>
        ) : (
          <p className="text-white/70 mt-3 leading-relaxed">
            No tent location saved yet.
          </p>
        )}
      </section>

      <section className="iphone-card">
        <h2 className="text-xl font-black">
          Save location note
        </h2>

        <input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Example: Blue tent near row C"
          className="mt-4 w-full h-13 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none placeholder:text-white/40"
        />

        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Example: 3 rows behind the burger van, near the red flag..."
          className="mt-3 w-full min-h-32 rounded-2xl bg-white/10 border border-white/10 p-4 outline-none resize-none placeholder:text-white/40"
        />

        <button
          onClick={saveTentLocation}
          className="mt-4 w-full min-h-[54px] rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          <Navigation size={20} />
          Save Tent Location
        </button>

        {tentLocation && (
          <button
            onClick={clearTentLocation}
            className="mt-3 w-full min-h-[54px] rounded-2xl bg-red-400/15 text-red-200 font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <Trash2 size={20} />
            Clear Location
          </button>
        )}
      </section>

      <BottomNav />
    </main>
  )
}