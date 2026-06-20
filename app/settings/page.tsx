"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"
import {
  Bell,
  Download,
  Moon,
  Trash2,
  Smartphone,
  LogOut,
  User,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<
    NotificationPermission | "unsupported"
  >("default");

  const [userEmail, setUserEmail] = useState<string>("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("silverstone-user");
    const savedDarkMode = localStorage.getItem("silverstone-dark-mode");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setUserEmail(user.email || "");
      } catch {
        setUserEmail("");
      }
    }

    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }

    if (!("Notification" in window)) {
      setNotifications("unsupported");
    } else {
      setNotifications(Notification.permission);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("silverstone-dark-mode", String(darkMode));
    document.documentElement.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  const requestNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Notifications are not supported on this device/browser.");
      setNotifications("unsupported");
      return;
    }

    const permission = await Notification.requestPermission();
    setNotifications(permission);

    if (permission === "granted") {
      new Notification("Silverstone Companion", {
        body: "Notifications are now enabled.",
      });
    }
  };

  const clearSavedData = () => {
    const confirmClear = confirm(
      "This will clear saved tickets, packing ticks, tent location, weather, notes and reminders. Continue?"
    );

    if (!confirmClear) return;

    localStorage.clear();
    alert("Saved data cleared.");
    router.push("/login");
  };

const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    alert(error.message)
    return
  }

  localStorage.removeItem("silverstone-user")
  localStorage.removeItem("silverstone-preferences")
  localStorage.removeItem("silverstone-onboarding-complete")

  router.replace("/login")
}

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">App controls</p>

        <h1 className="iphone-title">Settings</h1>

        <p className="iphone-subtitle">
          Manage notifications, theme, saved data and your app login.
        </p>
      </header>

      <section className="iphone-card mb-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center">
            <User className="text-cyan-200" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-black">Signed in</h2>

            <p className="text-white/60 mt-1 truncate">
              {userEmail || "No user found"}
            </p>
          </div>
        </div>
      </section>

      <section className="iphone-list">
        <button
          onClick={requestNotifications}
          className="iphone-button w-full text-left"
        >
          <Bell className="text-cyan-200" />

          <span className="flex-1">Notifications</span>

          <span className="text-white/50 text-sm capitalize">
            {notifications}
          </span>
        </button>

        <div className="iphone-button">
          <Download className="text-pink-200" />

          <span className="flex-1">Offline Data</span>

          <span className="text-white/50 text-sm">Enabled</span>
        </div>

        <div className="iphone-button">
          <Moon className="text-purple-200" />

          <span className="flex-1">Dark Mode</span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative h-8 w-14 rounded-full transition ${
              darkMode ? "bg-cyan-300" : "bg-black/20"
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

        <div className="iphone-button">
          <Smartphone className="text-cyan-200" />

          <span className="flex-1">App Version</span>

          <span className="text-white/50 text-sm">1.0.0</span>
        </div>

        <button
          onClick={signOut}
          className="iphone-button w-full text-left"
        >
          <LogOut className="text-yellow-200" />

          <span className="flex-1">Sign Out</span>
        </button>

        <button
          onClick={clearSavedData}
          className="iphone-button w-full text-left text-red-200"
        >
          <Trash2 />

          <span className="flex-1">Clear All Saved Data</span>
        </button>
      </section>

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">Privacy</h2>

        <p className="text-white/60 mt-2 leading-relaxed">
This app stores your tent location, bookmarks, notes and packing checklist on your own device. Your account login and setup profile are stored securely with Supabase. Do not save sensitive personal information in notes.
        </p>
      </section>

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">INFO</h2>

        <p className="text-white/60 mt-2 leading-relaxed">
Unofficial fan-made Silverstone companion app. Not affiliated with Silverstone, Formula 1, or any teams.
        </p>
      </section>


    </main>
  );
}