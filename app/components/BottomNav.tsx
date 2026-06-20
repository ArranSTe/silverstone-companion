"use client"

import Link from "next/link"
import { House, Calendar, Map, Ticket, Settings } from "lucide-react"

export default function BottomNav() {
  return (
    <nav className="bottom-nav-fixed glass">
      <Link href="/dashboard" aria-label="Dashboard" className="bottom-nav-icon">
        <House size={22} />
      </Link>

      <Link href="/schedule" aria-label="Schedule" className="bottom-nav-icon">
        <Calendar size={22} />
      </Link>

      <Link href="/map" aria-label="Map" className="bottom-nav-icon">
        <Map size={22} />
      </Link>

      <Link href="/tickets" aria-label="Tickets" className="bottom-nav-icon">
        <Ticket size={22} />
      </Link>

      <Link href="/settings" aria-label="Settings" className="bottom-nav-icon">
        <Settings size={22} />
      </Link>
    </nav>
  )
}