"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const hasCompletedSetup = localStorage.getItem("silverstone-setup-complete")
    const hasVisitedBefore = localStorage.getItem("silverstone-has-visited")

    if (!hasVisitedBefore) {
      localStorage.setItem("silverstone-has-visited", "true")
      router.replace("/signup")
      return
    }

    if (!hasCompletedSetup) {
      router.replace("/setup")
      return
    }

    router.replace("/dashboard")
  }, [router])

  return null
}