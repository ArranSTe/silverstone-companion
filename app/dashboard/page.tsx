"use client"

import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import Link from "next/link"
import { NotebookPen } from "lucide-react"
import LiveWeather from "../components/LiveWeather"
import { getCurrentOrNextSession } from "../data/schedule"

export default function DashboardPage() {
  const [nextSession, setNextSession] = useState(getCurrentOrNextSession())

  useEffect(() => {
    const updateSession = () => {
      setNextSession(getCurrentOrNextSession())
    }

    updateSession()

    const timer = setInterval(updateSession, 1000 * 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen p-6 pb-32">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-white/60 mt-2">
        British GP camping weekend
      </p>

      <LiveWeather />

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="glass rounded-3xl p-5">
          <p className="text-white/60">
            {nextSession.status}
          </p>

          <h3 className="text-xl font-bold mt-2">
            {nextSession.session.title}
          </h3>

          <p className="text-cyan-300 mt-2">
            {nextSession.session.day} • {nextSession.session.startTime}
          </p>
        </div>

        <div className="glass rounded-3xl p-5">
          <p className="text-white/60">
            Starts In
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {nextSession.countdown}
          </h3>

          <p className="text-white/50 mt-2">
            {nextSession.session.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/map" className="glass rounded-3xl p-5">
          Official Map
        </Link>

        <Link href="/tent-map" className="glass rounded-3xl p-5">
          Find My Tent
        </Link>

        <Link href="/schedule" className="glass rounded-3xl p-5">
          Schedule
        </Link>

        <Link href="/weather" className="glass rounded-3xl p-5">
          Weather
        </Link>

        <Link href="/notes" className="glass rounded-3xl p-5">
          Notes
        </Link>

        <Link href="/packing" className="glass rounded-3xl p-5">
          Packing
        </Link>

        <Link href="/emergency" className="glass rounded-3xl p-5">
          Emergency
        </Link>

        <Link href="/transport" className="glass rounded-3xl p-5">
          Transport
        </Link>

        <Link href="/food" className="glass rounded-3xl p-5">
          Food
        </Link>

        <Link href="/tickets" className="glass rounded-3xl p-5">
          Tickets
      </Link>
      </div>

      <BottomNav />
    </main>
  )
}