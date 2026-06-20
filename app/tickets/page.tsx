"use client"

import BottomNav from "../components/BottomNav"
import { Ticket, Upload, ImageIcon } from "lucide-react"

export default function TicketsPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Weekend access</p>

        <h1 className="iphone-title">
          Tickets
        </h1>

        <p className="iphone-subtitle">
          Keep your ticket details and reminders in one easy place.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-purple-400/30 to-cyan-300/20 border border-white/10 p-5 shadow-xl">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <Ticket size={30} />
        </div>

        <p className="text-white/60 text-sm font-bold">
          Your stand
        </p>

        <h2 className="text-[34px] leading-[36px] font-black mt-2">
          Lando Stand
        </h2>

        <p className="text-white/70 mt-3 leading-relaxed">
          Save a screenshot of your ticket in your Photos app as a backup before leaving for the circuit.
        </p>
      </section>

      <section className="iphone-list mt-5">
        <div className="iphone-card">
          <div className="flex items-center gap-3">
            <ImageIcon className="text-cyan-200" />

            <div>
              <h2 className="font-black text-lg">
                Ticket screenshot
              </h2>

              <p className="text-white/60 text-sm mt-1">
                Keep your QR code available offline.
              </p>
            </div>
          </div>
        </div>

        <button className="iphone-button w-full">
          <Upload className="text-cyan-200" />

          <span>
            Add ticket image later
          </span>
        </button>

        <div className="iphone-card">
          <h2 className="font-black text-lg">
            Entry tips
          </h2>

          <ul className="text-white/60 text-sm mt-3 space-y-2 list-disc pl-5">
            <li>Turn screen brightness up before scanning.</li>
            <li>Download tickets before you arrive.</li>
            <li>Carry ID and payment card just in case.</li>
          </ul>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}