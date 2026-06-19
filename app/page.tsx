"use client"

<<<<<<< HEAD
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Flag, ChevronRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("silverstone-onboarding-complete")

    if (onboardingComplete === "true") {
      router.replace("/dashboard")
    }
  }, [router])

  return (
    <main className="min-h-screen max-w-[430px] mx-auto px-6 py-10 flex flex-col items-center justify-center text-white overflow-hidden">
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="relative h-32 w-32 rounded-[38px] bg-gradient-to-br from-cyan-300 to-purple-400 flex items-center justify-center shadow-2xl">
          <Flag size={58} className="text-black" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-center mt-10"
      >
        <p className="text-cyan-200 font-black tracking-[0.25em] text-xs uppercase">
          British GP Weekend
        </p>

        <h1 className="text-[46px] leading-[48px] font-black tracking-[-2px] mt-4">
=======
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
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
          Silverstone
          <br />
          Companion
        </h1>

<<<<<<< HEAD
        <p className="text-white/65 mt-5 leading-relaxed">
          Your personal race weekend guide for sessions, weather, tickets, camping, transport and notes.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        onClick={() => router.push("/signup")}
        className="mt-12 w-full h-16 rounded-[24px] bg-white text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition shadow-xl"
      >
        Continue
        <ChevronRight size={22} />
      </motion.button>


      <motion.button
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        onClick={() => router.push("/login")}
        className="mt-4 w-full h-14 rounded-[22px] bg-white/10 border border-white/10 text-white font-black active:scale-[0.98] transition"
      >
        I already have an account
      </motion.button>
=======
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
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
    </main>
  )
}