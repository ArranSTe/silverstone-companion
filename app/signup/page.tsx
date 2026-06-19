"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function SignupPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in username, email and password.")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          username: username.trim(),
        },
      },
    })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    const user = data.user

    if (!user) {
      setLoading(false)
      alert("Signup worked, but no user was returned. Please try logging in.")
      return
    }

    const { error: profileError } = await supabase.from("user_profiles").insert({
      id: user.id,
      username: username.trim(),
      email: email.trim(),
      onboarding_complete: false,
    })

    if (profileError) {
      setLoading(false)
      alert(profileError.message)
      return
    }

    localStorage.setItem(
      "silverstone-user",
      JSON.stringify({
        username: username.trim(),
        firstName: username.trim(),
        email: email.trim(),
      })
    )

    setLoading(false)
    router.push("/setup")
  }

  return (
    <main className="min-h-screen max-w-[430px] mx-auto px-6 py-10 flex flex-col justify-center text-white">
      <div className="mb-10">
        <p className="iphone-eyebrow">Create your profile</p>

        <h1 className="iphone-title mt-2">Sign up</h1>

        <p className="iphone-subtitle">
          Create an account so your Silverstone setup follows you on another device.
        </p>
      </div>

      <section className="iphone-card">
        <div className="h-14 w-14 rounded-2xl bg-cyan-300/20 flex items-center justify-center mb-6">
          <UserPlus className="text-cyan-200" size={30} />
        </div>

        <label className="block text-sm font-bold text-white/70 mb-2">
          Username
        </label>

        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Example: Alex"
          className="w-full h-14 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none placeholder:text-white/40 mb-4"
        />

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
          placeholder="Create a password"
          type="password"
          className="w-full h-14 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none placeholder:text-white/40"
        />

        <button
          onClick={signUp}
          disabled={loading}
          className="mt-6 w-full h-15 rounded-2xl bg-cyan-300 text-black font-black active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </section>
    </main>
  )
}