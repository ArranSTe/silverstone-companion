"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Bed, ChevronRight, Tent, Ticket, Upload } from "lucide-react"

type StayType = "Camping" | "Hotel"
type TicketType = "General Admission" | "Grand Stand" | "Lando Stand"

export default function SetupPage() {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [ticketType, setTicketType] = useState<TicketType>("Lando Stand")
  const [stayType, setStayType] = useState<StayType>("Camping")

  const nextStep = () => {
    setStep((current) => current + 1)
  }

  const finishSetup = () => {
    localStorage.setItem(
      "silverstone-preferences",
      JSON.stringify({
        ticketType,
        stayType,
      })
    )

    localStorage.setItem("silverstone-onboarding-complete", "true")
    router.replace("/dashboard")
  }

  return (
    <main className="min-h-screen max-w-[430px] mx-auto px-6 py-10 flex flex-col text-white overflow-hidden">
      <div className="mb-8">
        <p className="iphone-eyebrow">
          Setup
        </p>

        <h1 className="iphone-title mt-2">
          Personalise your app
        </h1>

        <div className="flex gap-2 mt-6">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded-full ${
                item <= step ? "bg-cyan-300" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <SetupSlide key="tickets">
              <div className="h-16 w-16 rounded-3xl bg-purple-300/20 flex items-center justify-center mb-6">
                <Ticket className="text-purple-200" size={34} />
              </div>

              <h2 className="text-[32px] leading-[34px] font-black">
                What tickets have you got?
              </h2>

              <p className="text-white/60 mt-3 leading-relaxed">
                We’ll use this to make the app feel more useful for your weekend.
              </p>

              <select
                value={ticketType}
                onChange={(event) => setTicketType(event.target.value as TicketType)}
                className="mt-8 w-full h-15 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none text-white"
              >
                <option className="text-black">General Admission</option>
                <option className="text-black">Grand Stand</option>
                <option className="text-black">Lando Stand</option>
              </select>

              <button
                onClick={nextStep}
                className="mt-6 w-full h-15 rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
              >
                Continue
                <ChevronRight size={21} />
              </button>
            </SetupSlide>
          )}

          {step === 1 && (
            <SetupSlide key="staying">
              <div className="h-16 w-16 rounded-3xl bg-cyan-300/20 flex items-center justify-center mb-6">
                {stayType === "Camping" ? (
                  <Tent className="text-cyan-200" size={34} />
                ) : (
                  <Bed className="text-cyan-200" size={34} />
                )}
              </div>

              <h2 className="text-[32px] leading-[34px] font-black">
                Where are you staying?
              </h2>

              <p className="text-white/60 mt-3 leading-relaxed">
                If you choose hotel, we’ll hide Find My Tent and make packing more hotel-focused.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  onClick={() => setStayType("Camping")}
                  className={`min-h-[130px] rounded-[28px] p-4 border text-left active:scale-[0.98] transition ${
                    stayType === "Camping"
                      ? "bg-cyan-300 text-black border-cyan-300"
                      : "bg-white/10 text-white border-white/10"
                  }`}
                >
                  <Tent size={30} />

                  <p className="text-xl font-black mt-5">
                    Camping
                  </p>
                </button>

                <button
                  onClick={() => setStayType("Hotel")}
                  className={`min-h-[130px] rounded-[28px] p-4 border text-left active:scale-[0.98] transition ${
                    stayType === "Hotel"
                      ? "bg-cyan-300 text-black border-cyan-300"
                      : "bg-white/10 text-white border-white/10"
                  }`}
                >
                  <Bed size={30} />

                  <p className="text-xl font-black mt-5">
                    Hotel
                  </p>
                </button>
              </div>

              <button
                onClick={nextStep}
                className="mt-6 w-full h-15 rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
              >
                Continue
                <ChevronRight size={21} />
              </button>
            </SetupSlide>
          )}

          {step === 2 && (
            <SetupSlide key="upload">
              <div className="h-16 w-16 rounded-3xl bg-pink-300/20 flex items-center justify-center mb-6">
                <Upload className="text-pink-200" size={34} />
              </div>

              <h2 className="text-[32px] leading-[34px] font-black">
                Upload your tickets now?
              </h2>

              <p className="text-white/60 mt-3 leading-relaxed">
                You can add a ticket image later. For now, we’ll finish setting up your app.
              </p>

              <button
                onClick={() => {
                  localStorage.setItem(
                    "silverstone-preferences",
                    JSON.stringify({
                      ticketType,
                      stayType,
                    })
                  )

                  localStorage.setItem("silverstone-onboarding-complete", "true")
                  router.replace("/tickets")
                }}
                className="mt-8 w-full h-15 rounded-2xl bg-cyan-300 text-black font-black active:scale-[0.98] transition"
              >
                Upload Tickets
              </button>

              <button
                onClick={finishSetup}
                className="mt-4 w-full h-14 rounded-2xl bg-white/10 border border-white/10 text-white font-black active:scale-[0.98] transition"
              >
                Skip for now
              </button>
            </SetupSlide>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function SetupSlide({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -80, opacity: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="iphone-card"
    >
      {children}
    </motion.section>
  )
}