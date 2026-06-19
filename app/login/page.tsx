"use client"

<<<<<<< HEAD
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

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

  return (
    <main className="min-h-screen max-w-[430px] mx-auto px-6 py-10 flex flex-col justify-center text-white">
      <div className="mb-10">
        <p className="iphone-eyebrow">
          Welcome back
        </p>

        <h1 className="iphone-title mt-2">
          Log in
        </h1>

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
          className="mt-6 w-full h-15 rounded-2xl bg-cyan-300 text-black font-black active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
=======
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, LogIn } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const savedUser = localStorage.getItem("silverstone-user")

    if (savedUser) {
      router.push("/dashboard")
    }
  }, [router])

  const signIn = () => {
    if (!email.trim()) {
      alert("Please enter your email.")
      return
    }

    if (!password.trim()) {
      alert("Please enter your password.")
      return
    }

    const user = {
      email: email.trim(),
      signedInAt: new Date().toISOString(),
    }

    localStorage.setItem("silverstone-user", JSON.stringify(user))
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen px-5 pt-6 pb-40 flex items-center justify-center">
      <section className="glass rounded-[32px] p-6 w-full max-w-md shadow-2xl">
        <h1 className="text-4xl font-bold">
          Sign In
        </h1>

        <p className="text-white/60 mt-2">
          Sign in once and the app will remember you on this device.
        </p>

        <div className="mt-8 space-y-4">
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Mail className="text-cyan-300 shrink-0" />

            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              type="email"
              className="bg-transparent outline-none w-full placeholder:text-white/40"
            />
          </div>

          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Lock className="text-pink-300 shrink-0" />

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              className="bg-transparent outline-none w-full placeholder:text-white/40"
            />
          </div>

          <button
            onClick={signIn}
            className="w-full bg-pink-500 rounded-2xl py-4 font-semibold text-lg flex items-center justify-center gap-3"
          >
            <LogIn />
            Sign In
          </button>
        </div>

        <p className="text-white/40 text-sm mt-5">
          This is a local app sign-in for now. Your details are remembered only on this device.
        </p>
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
      </section>
    </main>
  )
}