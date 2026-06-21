"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "./lib/supabase"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkLogin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.replace("/login")
        return
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("onboarding_complete")
        .eq("id", session.user.id)
        .maybeSingle()

      if (profile?.onboarding_complete) {
        router.replace("/dashboard")
      } else {
        router.replace("/setup")
      }
    }

    checkLogin()
  }, [router])

  return (
    <main className="iphone-page text-white flex items-center justify-center">
      <p className="text-white/60">Opening Silverstone Companion...</p>
    </main>
  )
}