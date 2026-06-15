"use client"

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
      </section>
    </main>
  )
}