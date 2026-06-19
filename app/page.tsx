"use client"

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
          Silverstone
          <br />
          Companion
        </h1>

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
    </main>
  )
}