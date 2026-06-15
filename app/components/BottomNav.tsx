"use client"

import Link from "next/link"
import { House, Calendar, Map, Ticket, Settings } from "lucide-react"

export default function BottomNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-3 flex gap-5 z-50 shadow-2xl">
      <Link href="/dashboard" aria-label="Dashboard">
        <House size={22} />
      </Link>

      <Link href="/schedule" aria-label="Schedule">
        <Calendar size={22} />
      </Link>

      <Link href="/map" aria-label="Map">
        <Map size={22} />
      </Link>

      <Link href="/tickets" aria-label="Tickets">
        <Ticket size={22} />
      </Link>

      <Link href="/settings" aria-label="Settings">
        <Settings size={22} />
      </Link>
    </div>
  )
}