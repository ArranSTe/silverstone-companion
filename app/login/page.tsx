"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    const checkExistingSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        setCheckingSession(false)
        return
      }

      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("onboarding_complete")
        .eq("id", session.user.id)
        .maybeSingle()

      if (error) {
        console.error("Profile check error:", error.message)
        setCheckingSession(false)
        return
      }

      if (profile?.onboarding_complete) {
        router.replace("/dashboard")
      } else {
        router.replace("/setup")
      }
    }

    checkExistingSession()
  }, [router])

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    const user = data.user

    if (!user) {
      setLoading(false)
      alert("Could not log in.")
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()

    if (profileError) {
      setLoading(false)
      alert(profileError.message)
      return
    }

    if (profile) {
      localStorage.setItem(
        "silverstone-user",
        JSON.stringify({
          username: profile.username,
          firstName: profile.username,
          email: profile.email,
        })
      )

      localStorage.setItem(
        "silverstone-preferences",
        JSON.stringify({
          ticketType: profile.ticket_type,
          stayType: profile.stay_type,
          goingDays: profile.going_days || [],
        })
      )

      if (profile.onboarding_complete) {
        localStorage.setItem("silverstone-onboarding-complete", "true")
        router.replace("/dashboard")
      } else {
        router.replace("/setup")
      }
    } else {
      localStorage.setItem(
        "silverstone-user",
        JSON.stringify({
          username: user.email?.split("@")[0] || "User",
          firstName: user.email?.split("@")[0] || "User",
          email: user.email,
        })
      )

      router.replace("/setup")
    }

    setLoading(false)
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen max-w-[430px] mx-auto px-6 py-10 flex flex-col justify-center text-white">
        <p className="text-white/60 text-center">
          Checking your login...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen max-w-[430px] mx-auto px-6 py-10 flex flex-col justify-center text-white">
      <div className="mb-10">
        <p className="iphone-eyebrow">Welcome back</p>

        <h1 className="iphone-title mt-2">Log in</h1>

        <p className="iphone-subtitle">
          Use your account to bring back your Silverstone setup.
        </p>
      </div>

      <section className="iphone-card">
        <div className="h-14 w-14 rounded-2xl bg-cyan-300/20 flex items-center justify-center mb-6">
          <LogIn className="text-cyan-200" size={30} />
        </div>

        <label className="block text-sm font-bold text-white/70 mb-2">
          Email
        </label>

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          className="w-full h-14 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none placeholder:text-white/40 mb-4"
        />

        <label className="block text-sm font-bold text-white/70 mb-2">
          Password
        </label>

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          type="password"
          className="w-full h-14 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none placeholder:text-white/40"
        />

        <button
          onClick={login}
          disabled={loading}
          className="mt-6 w-full h-14 rounded-2xl bg-cyan-300 text-black font-black active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </section>
    </main>
  )
}