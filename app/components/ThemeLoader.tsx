"use client"

import { useEffect } from "react"

export default function ThemeLoader() {
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("silverstone-dark-mode")
    const darkMode = savedDarkMode === null ? true : savedDarkMode === "true"

    document.documentElement.classList.toggle("light-mode", !darkMode)
  }, [])

  return null
}