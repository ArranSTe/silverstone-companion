"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Hotel,
  Tent,
  Ticket,
  User,
} from "lucide-react"
import { supabase } from "../lib/supabase"

const ticketOptions = [
  "Lando Stand",
  "General Admission",
  "Grandstand",
  "Hospitality",
  "Other",
]

const stayOptions = [
  {
    label: "Camping",
    icon: Tent,
    description: "I’m staying at or near a campsite.",
  },
  {
    label: "Hotel",
    icon: Hotel,
    description: "I’m travelling in from a hotel or other accommodation.",
  },
] as const

const dayOptions = ["Thursday", "Friday", "Saturday", "Sunday"]

export default function SetupPage() {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [ticketType, setTicketType] = useState("Lando Stand")
  const [stayType, setStayType] = useState<"Camping" | "Hotel">("Camping")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.replace("/login")
        return
      }

      const user = session.user

      setEmail(user.email || "")

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      if (profile) {
        setUsername(
          profile.username ||
            user.user_metadata?.username ||
            user.email?.split("@")[0] ||
            ""
        )

        setTicketType(profile.ticket_type || "Lando Stand")
        setStayType(profile.stay_type || "Camping")
        setSelectedDays(profile.going_days || [])
      } else {
        setUsername(
          user.user_metadata?.username || user.email?.split("@")[0] || ""
        )
      }
    }

    loadUser()
  }, [router])

  const toggleDay = (day: string) => {
    setSelectedDays((current) => {
      if (current.includes(day)) {
        return current.filter((item) => item !== day)
      }

      return [...current, day]
    })
  }

  const goNext = () => {
    if (step === 0 && !username.trim()) {
      alert("Please enter your name.")
      return
    }

    if (step === 3 && selectedDays.length === 0) {
      alert("Please choose at least one day.")
      return
    }

    setStep((current) => Math.min(current + 1, 3))
  }

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0))
  }

  const finishSetup = async () => {
    if (!username.trim()) {
      alert("Please enter your name.")
      setStep(0)
      return
    }

    if (selectedDays.length === 0) {
      alert("Please choose at least one day.")
      setStep(3)
      return
    }

    setLoading(true)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      setLoading(false)
      router.replace("/login")
      return
    }

    const user = session.user

    const { error } = await supabase.from("user_profiles").upsert({
      id: user.id,
      username: username.trim(),
      email: user.email,
      ticket_type: ticketType,
      stay_type: stayType,
      going_days: selectedDays,
      onboarding_complete: true,
    })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    localStorage.setItem(
      "silverstone-user",
      JSON.stringify({
        username: username.trim(),
        firstName: username.trim(),
        email: user.email,
      })
    )

    localStorage.setItem(
      "silverstone-preferences",
      JSON.stringify({
        ticketType,
        stayType,
        goingDays: selectedDays,
      })
    )

    localStorage.setItem("silverstone-onboarding-complete", "true")

    setLoading(false)
    router.replace("/dashboard")
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Quick setup</p>

        <h1 className="iphone-title">Set up your app</h1>

        <p className="iphone-subtitle">
          A few quick choices so the Silverstone Companion feels made for your
          weekend.
        </p>
      </header>

      <section className="mb-5">
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded-full ${
                item <= step ? "bg-cyan-300" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <p className="text-white/45 text-sm mt-3 font-bold">
          Step {step + 1} of 4
        </p>
      </section>

      {step === 0 && (
        <section className="iphone-card">
          <div className="h-14 w-14 rounded-2xl bg-cyan-300/20 flex items-center justify-center mb-6">
            <User className="text-cyan-200" size={30} />
          </div>

          <p className="iphone-eyebrow">Your name</p>

          <h2 className="text-3xl font-black tracking-[-0.8px]">
            What should we call you?
          </h2>

          <p className="text-white/60 mt-2 leading-relaxed">
            This is used for the dashboard greeting.
          </p>

          <label className="block text-sm font-bold text-white/70 mt-6 mb-2">
            Name
          </label>

          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Alex"
            className="w-full h-14 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none placeholder:text-white/40"
          />

          {email && (
            <p className="text-white/45 text-sm mt-4 truncate">
              Signed in as {email}
            </p>
          )}
        </section>
      )}

      {step === 1 && (
        <section className="iphone-card">
          <div className="h-14 w-14 rounded-2xl bg-purple-300/20 flex items-center justify-center mb-6">
            <Ticket className="text-purple-200" size={30} />
          </div>

          <p className="iphone-eyebrow">Ticket type</p>

          <h2 className="text-3xl font-black tracking-[-0.8px]">
            What ticket do you have?
          </h2>

          <p className="text-white/60 mt-2 leading-relaxed">
            This helps the app show the most useful shortcuts and reminders.
          </p>

          <div className="space-y-3 mt-6">
            {ticketOptions.map((option) => {
              const selected = ticketType === option

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTicketType(option)}
                  className={`w-full min-h-14 rounded-2xl px-4 flex items-center justify-between text-left font-black transition active:scale-[0.98] ${
                    selected
                      ? "bg-cyan-300 text-black"
                      : "bg-white/10 text-white border border-white/10"
                  }`}
                >
                  <span>{option}</span>

                  {selected && <Check size={20} />}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="iphone-card">
          <div className="h-14 w-14 rounded-2xl bg-green-300/20 flex items-center justify-center mb-6">
            <Tent className="text-green-200" size={30} />
          </div>

          <p className="iphone-eyebrow">Where you’re staying</p>

          <h2 className="text-3xl font-black tracking-[-0.8px]">
            Camping or hotel?
          </h2>

          <p className="text-white/60 mt-2 leading-relaxed">
            This changes whether the dashboard shows tent tools or transport
            shortcuts.
          </p>

          <div className="space-y-3 mt-6">
            {stayOptions.map((option) => {
              const Icon = option.icon
              const selected = stayType === option.label

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setStayType(option.label)}
                  className={`w-full rounded-3xl p-4 flex items-center gap-4 text-left transition active:scale-[0.98] ${
                    selected
                      ? "bg-cyan-300 text-black"
                      : "bg-white/10 text-white border border-white/10"
                  }`}
                >
                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      selected ? "bg-black/10" : "bg-white/10"
                    }`}
                  >
                    <Icon size={25} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-black">{option.label}</h3>

                    <p
                      className={`text-sm mt-1 ${
                        selected ? "text-black/65" : "text-white/55"
                      }`}
                    >
                      {option.description}
                    </p>
                  </div>

                  {selected && <Check size={22} />}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="iphone-card">
          <div className="h-14 w-14 rounded-2xl bg-orange-300/20 flex items-center justify-center mb-6">
            <CalendarDays className="text-orange-200" size={30} />
          </div>

          <p className="iphone-eyebrow">Your weekend</p>

          <h2 className="text-3xl font-black tracking-[-0.8px]">
            What Days Are You Going?
          </h2>

          <p className="text-white/60 mt-2 leading-relaxed">
            Choose the days you’ll be at Silverstone so the app can show the
            most useful schedule and reminders.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {dayOptions.map((day) => {
              const selected = selectedDays.includes(day)

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`h-14 rounded-2xl font-black transition active:scale-[0.98] ${
                    selected
                      ? "bg-cyan-300 text-black"
                      : "bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </section>
      )}

      <section className="flex gap-3 mt-5">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="h-14 w-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center active:scale-95"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="h-14 flex-1 rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            Continue
            <ChevronRight size={22} />
          </button>
        ) : (
          <button
            type="button"
            onClick={finishSetup}
            disabled={loading}
            className="h-14 flex-1 rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Finish setup"}
            {!loading && <Check size={22} />}
          </button>
        )}
      </section>
    </main>
  )
}