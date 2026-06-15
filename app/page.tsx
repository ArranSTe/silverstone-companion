"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function useRaceCountdown() {
  const [days, setDays] = useState(0)

  useEffect(() => {
    const updateCountdown = () => {
      const raceDay = new Date("2026-07-05T15:00:00+01:00").getTime()
      const now = new Date().getTime()
      const difference = raceDay - now

      const daysLeft = Math.max(
        0,
        Math.ceil(difference / (1000 * 60 * 60 * 24))
      )

      setDays(daysLeft)
    }

    updateCountdown()

    const timer = setInterval(updateCountdown, 1000 * 60)

    return () => clearInterval(timer)
  }, [])

  return days
}

export default function LandingPage() {
  const days = useRaceCountdown()

  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[32px] p-8 w-full max-w-md shadow-2xl"
      >
        <div className="text-sm text-cyan-300 mb-3">
          Formula 1 British Grand Prix
        </div>

        <h1 className="text-5xl font-bold leading-tight">
          Silverstone
          <br />
          Companion
        </h1>

        <p className="text-white/70 mt-4">
          Your premium race weekend camping companion.
        </p>

        <div className="mt-6 glass rounded-2xl p-4">
          <p className="text-white/60 text-sm">
            Race Day Countdown
          </p>

          <p className="text-3xl font-bold mt-1">
            {days} Days
          </p>
        </div>

        <Link href="/login">
          <button className="mt-8 w-full bg-pink-500 rounded-2xl py-4 font-semibold text-lg">
            Get Started
          </button>
        </Link>
      </motion.div>
    </main>
  )
}