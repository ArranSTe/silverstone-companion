"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "../components/BottomNav"
import {
  Bell,
  Download,
  Moon,
  Trash2,
  Smartphone,
  LogOut,
  User,
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()

  const [notifications, setNotifications] = useState<NotificationPermission | "unsupported">(
    "default"
  )

  const [userEmail, setUserEmail] = useState<string>("")
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("silverstone-user")
    const savedDarkMode = localStorage.getItem("silverstone-dark-mode")

    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserEmail(user.email)
    }

    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true")
    }

    if (!("Notification" in window)) {
      setNotifications("unsupported")
    } else {
      setNotifications(Notification.permission)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("silverstone-dark-mode", String(darkMode))
    document.documentElement.classList.toggle("light-mode", !darkMode)
  }, [darkMode])

  const requestNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Notifications are not supported on this device/browser.")
      setNotifications("unsupported")
      return
    }

    const permission = await Notification.requestPermission()
    setNotifications(permission)

    if (permission === "granted") {
      new Notification("Silverstone Companion", {
        body: "Notifications are now enabled.",
      })
    }
  }

  const clearSavedData = () => {
    const confirmClear = confirm(
      "This will clear saved tickets, packing ticks, tent location, weather and reminders. Continue?"
    )

    if (!confirmClear) return

    localStorage.clear()
    alert("Saved data cleared.")
    router.push("/login")
  }

  const signOut = () => {
    localStorage.removeItem("silverstone-user")
    router.push("/login")
  }

  return (
    <main className="min-h-screen px-5 pt-6 pb-40">
      <h1 className="text-4xl font-bold">
        Settings
      </h1>

      <p className="text-white/60 mt-2">
        App preferences, notifications and saved data.
      </p>

      <section className="glass rounded-3xl p-5 mt-6">
        <div className="flex items-center gap-3">
          <User className="text-cyan-300" />

          <div>
            <h2 className="text-xl font-bold">
              Signed In
            </h2>

            <p className="text-white/60 mt-1">
              {userEmail || "No user found"}
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-4 mt-6">
        <button
          onClick={requestNotifications}
          className="glass rounded-3xl p-5 w-full flex justify-between items-center text-left"
        >
          <span className="flex items-center gap-3">
            <Bell className="text-cyan-300" />
            Notifications
          </span>

          <span className="text-white/60 capitalize">
            {notifications}
          </span>
        </button>

        <div className="glass rounded-3xl p-5 flex justify-between items-center">
          <span className="flex items-center gap-3">
            <Download className="text-pink-300" />
            Offline Data
          </span>

          <span className="text-white/60">
            Enabled
          </span>
        </div>

        <div className="glass rounded-3xl p-5 flex justify-between items-center gap-4">
          <span className="flex items-center gap-3">
            <Moon className="text-purple-300" />
            Dark Mode
          </span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative h-8 w-14 rounded-full transition ${
              darkMode ? "bg-cyan-400" : "bg-black/20"
            }`}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                darkMode ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>

        <div className="glass rounded-3xl p-5 flex justify-between items-center">
          <span className="flex items-center gap-3">
            <Smartphone className="text-cyan-300" />
            App Version
          </span>

          <span className="text-white/60">
            1.0.0
          </span>
        </div>

        <button
          onClick={signOut}
          className="glass rounded-3xl p-5 w-full flex justify-between items-center text-left"
        >
          <span className="flex items-center gap-3">
            <LogOut className="text-yellow-300" />
            Sign Out
          </span>
        </button>

        <button
          onClick={clearSavedData}
          className="glass rounded-3xl p-5 w-full flex justify-between items-center text-left text-red-300"
        >
          <span className="flex items-center gap-3">
            <Trash2 />
            Clear All Saved Data
          </span>
        </button>
      </div>

      <section className="glass rounded-3xl p-5 mt-6">
        <h2 className="text-xl font-bold">
          Notification Note
        </h2>

        <p className="text-white/60 mt-2">
          Schedule reminders work locally while the app is open or recently active. Full push notifications when the app is fully closed would need a backend later.
        </p>
      </section>

      <BottomNav />
    </main>
  )
}