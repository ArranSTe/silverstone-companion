"use client"

<<<<<<< HEAD
import { useMemo, useState } from "react"
import BottomNav from "../components/BottomNav"
import { CalendarDays, Star } from "lucide-react"

type ScheduleItem = {
  id: string
  day: string
  time: string
  title: string
  location: string
  type: string
}

const scheduleItems: ScheduleItem[] = [
  {
    id: "fri-fp1",
    day: "Friday",
    time: "12:30",
    title: "Formula 1 Practice 1",
    location: "Track",
    type: "Session",
  },
  {
    id: "fri-fp2",
    day: "Friday",
    time: "16:00",
    title: "Formula 1 Practice 2",
    location: "Track",
    type: "Session",
  },
  {
    id: "sat-fp3",
    day: "Saturday",
    time: "11:30",
    title: "Formula 1 Practice 3",
    location: "Track",
    type: "Session",
  },
  {
    id: "sat-quali",
    day: "Saturday",
    time: "15:00",
    title: "Formula 1 Qualifying",
    location: "Track",
    type: "Session",
  },
  {
    id: "sun-drivers-parade",
    day: "Sunday",
    time: "12:00",
    title: "Drivers’ Parade",
    location: "Track",
    type: "Event",
  },
  {
    id: "sun-race",
    day: "Sunday",
    time: "15:00",
    title: "British Grand Prix",
    location: "Track",
    type: "Race",
  },
]

export default function SchedulePage() {
  const [bookmarked, setBookmarked] = useState<string[]>(() => {
    if (typeof window === "undefined") return []

    const saved = localStorage.getItem("silverstone-bookmarks")
    return saved ? JSON.parse(saved) : []
  })

  const groupedSchedule = useMemo(() => {
    return scheduleItems.reduce<Record<string, ScheduleItem[]>>((groups, item) => {
      if (!groups[item.day]) {
        groups[item.day] = []
      }

      groups[item.day].push(item)

      return groups
    }, {})
  }, [])

  const toggleBookmark = (id: string) => {
    const nextBookmarks = bookmarked.includes(id)
      ? bookmarked.filter((item) => item !== id)
      : [...bookmarked, id]

    setBookmarked(nextBookmarks)
    localStorage.setItem("silverstone-bookmarks", JSON.stringify(nextBookmarks))
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Weekend timetable</p>

        <h1 className="iphone-title">
          Schedule
        </h1>

        <p className="iphone-subtitle">
          See sessions, timings and bookmark the events you do not want to miss.
        </p>
      </header>

      <section className="iphone-card mb-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center">
            <CalendarDays className="text-cyan-200" />
          </div>

          <div>
            <h2 className="text-xl font-black">
              Bookmarks
            </h2>

            <p className="text-white/60 mt-1">
              {bookmarked.length} saved event{bookmarked.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {Object.entries(groupedSchedule).map(([day, items]) => (
          <div key={day}>
            <h2 className="text-2xl font-black mb-3">
              {day}
            </h2>

            <div className="iphone-list">
              {items.map((item) => {
                const isBookmarked = bookmarked.includes(item.id)

                return (
                  <article key={item.id} className="iphone-card">
                    <div className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-cyan-200 font-black">
                          {item.time}
                        </p>

                        <h3 className="text-lg font-black mt-1">
                          {item.title}
                        </h3>

                        <p className="text-white/60 text-sm mt-2">
                          {item.location} • {item.type}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ${
                          isBookmarked
                            ? "bg-yellow-300 text-black"
                            : "bg-white/10 text-white/60"
                        }`}
                        aria-label="Bookmark event"
                      >
                        <Star
                          size={19}
                          fill={isBookmarked ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        ))}
      </section>

=======
import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { Bell, BellRing, Star } from "lucide-react"
import {
  scheduleSessions,
  getSessionStart,
  type ScheduleSession,
} from "../data/schedule"

const days = ["Thursday", "Friday", "Saturday", "Sunday"] as const

const categories = [
  "All",
  "F1",
  "F2",
  "F3",
  "F1 Academy",
  "Historic",
  "Parade",
]

type Reminder = {
  id: string
  sessionTitle: string
  sessionDate: string
  sessionStartTime: string
  fifteenMinuteReminderAt: string
  fiveMinuteReminderAt: string
  startReminderAt: string
  sent15: boolean
  sent5: boolean
  sentStart: boolean
}

function getSessionId(session: ScheduleSession) {
  return `${session.date}-${session.startTime}-${session.title}`
}

function getReminderTimes(session: ScheduleSession) {
  const start = getSessionStart(session)

  const fifteen = new Date(start.getTime() - 15 * 60 * 1000)
  const five = new Date(start.getTime() - 5 * 60 * 1000)

  return {
    fifteen,
    five,
    start,
  }
}

function sendNotification(title: string, body: string) {
  if (!("Notification" in window)) return

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/192x192.png",
      badge: "/192x192.png",
    })
  }
}

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<
    "Thursday" | "Friday" | "Saturday" | "Sunday"
  >("Thursday")

  const [category, setCategory] = useState("All")
  const [favourites, setFavourites] = useState<string[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])

  useEffect(() => {
    const savedFavourites = localStorage.getItem("schedule-favourites")
    const savedReminders = localStorage.getItem("schedule-reminders")

    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites))
    }

    if (savedReminders) {
      setReminders(JSON.parse(savedReminders))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("schedule-favourites", JSON.stringify(favourites))
  }, [favourites])

  useEffect(() => {
    localStorage.setItem("schedule-reminders", JSON.stringify(reminders))
  }, [reminders])

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()

      setReminders((currentReminders) => {
        let changed = false

        const updatedReminders = currentReminders.map((reminder) => {
          const nextReminder = { ...reminder }

          const fifteenTime = new Date(reminder.fifteenMinuteReminderAt)
          const fiveTime = new Date(reminder.fiveMinuteReminderAt)
          const startTime = new Date(reminder.startReminderAt)

          if (!nextReminder.sent15 && now >= fifteenTime) {
            sendNotification(
              "15 minutes to go",
              `${reminder.sessionTitle} starts in 15 minutes.`
            )
            nextReminder.sent15 = true
            changed = true
          }

          if (!nextReminder.sent5 && now >= fiveTime) {
            sendNotification(
              "5 minutes to go",
              `${reminder.sessionTitle} starts in 5 minutes.`
            )
            nextReminder.sent5 = true
            changed = true
          }

          if (!nextReminder.sentStart && now >= startTime) {
            sendNotification(
              "Session started",
              `${reminder.sessionTitle} has started.`
            )
            nextReminder.sentStart = true
            changed = true
          }

          return nextReminder
        })

        return changed ? updatedReminders : currentReminders
      })
    }

    checkReminders()

    const timer = setInterval(checkReminders, 30 * 1000)

    return () => clearInterval(timer)
  }, [])

  const sessions = scheduleSessions.filter((session) => {
    const matchesDay = session.day === selectedDay
    const matchesCategory = category === "All" || session.category === category

    return matchesDay && matchesCategory
  })

  const toggleFavourite = (sessionId: string) => {
    setFavourites((prev) =>
      prev.includes(sessionId)
        ? prev.filter((item) => item !== sessionId)
        : [...prev, sessionId]
    )
  }

  const toggleReminder = async (session: ScheduleSession) => {
    const sessionId = getSessionId(session)

    const alreadySet = reminders.some((reminder) => reminder.id === sessionId)

    if (alreadySet) {
      setReminders((prev) =>
        prev.filter((reminder) => reminder.id !== sessionId)
      )

      alert("Reminder removed.")
      return
    }

    if (!("Notification" in window)) {
      alert("Notifications are not supported on this device/browser.")
      return
    }

    let permission = Notification.permission

    if (permission !== "granted") {
      permission = await Notification.requestPermission()
    }

    if (permission !== "granted") {
      alert("Notifications were not enabled.")
      return
    }

    const times = getReminderTimes(session)

    const newReminder: Reminder = {
      id: sessionId,
      sessionTitle: session.title,
      sessionDate: session.date,
      sessionStartTime: session.startTime,
      fifteenMinuteReminderAt: times.fifteen.toISOString(),
      fiveMinuteReminderAt: times.five.toISOString(),
      startReminderAt: times.start.toISOString(),
      sent15: false,
      sent5: false,
      sentStart: false,
    }

    setReminders((prev) => [...prev, newReminder])

    new Notification("Reminder set", {
      body: `${session.title}: 15m, 5m and start notifications enabled.`,
      icon: "/192x192.png",
    })
  }

  const hasReminder = (session: ScheduleSession) => {
    const sessionId = getSessionId(session)
    return reminders.some((reminder) => reminder.id === sessionId)
  }

  return (
    <main className="min-h-screen px-5 pt-6 pb-40">
      <h1 className="text-4xl font-bold">
        Schedule
      </h1>

      <p className="text-white/60 mt-2">
        Full British Grand Prix timetable with session reminders.
      </p>

      <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-3 rounded-full whitespace-nowrap font-semibold ${
              selectedDay === day ? "bg-pink-500" : "glass"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-5 py-3 rounded-full whitespace-nowrap ${
              category === item ? "bg-cyan-400 text-black font-semibold" : "glass"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="glass rounded-3xl p-5 mt-6">
        <p className="text-cyan-300 text-sm">
          Selected Day
        </p>

        <h2 className="text-3xl font-bold mt-1">
          {selectedDay}
        </h2>

        <p className="text-white/50 mt-2">
          {sessions.length} timetable items • {reminders.length} reminders set
        </p>
      </section>

      <div className="space-y-4 mt-6">
        {sessions.map((session) => {
          const sessionId = getSessionId(session)
          const reminderIsSet = hasReminder(session)

          return (
            <div
              key={sessionId}
              className={`relative overflow-hidden rounded-3xl p-5 ${
                session.highlight
                  ? "bg-[#130634] border border-pink-500/40 shadow-2xl"
                  : "glass"
              }`}
            >
              {session.highlight && (
                <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-pink-500 via-red-500 to-transparent" />
              )}

              <div className="flex gap-4">
                <div className="min-w-[76px] border-r border-white/10 pr-4">
                  <p className="text-cyan-300 font-bold">
                    {session.startTime}
                  </p>

                  <p className="text-white/50">
                    {session.endTime}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-pink-300">
                    {session.category}
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    {session.title}
                  </h3>

                  <p className="text-white/60 mt-2">
                    🏁 {session.location}
                  </p>

                  {reminderIsSet && (
                    <p className="text-cyan-300 text-sm mt-3">
                      Notifications set: 15m, 5m and start
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <button onClick={() => toggleFavourite(sessionId)}>
                    <Star
                      className={
                        favourites.includes(sessionId)
                          ? "fill-pink-500 text-pink-500"
                          : "text-white"
                      }
                    />
                  </button>

                  <button onClick={() => toggleReminder(session)}>
                    {reminderIsSet ? (
                      <BellRing className="text-cyan-300" />
                    ) : (
                      <Bell className="text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {sessions.length === 0 && (
        <section className="glass rounded-3xl p-6 mt-6">
          <h2 className="text-2xl font-bold">
            No sessions found
          </h2>

          <p className="text-white/60 mt-2">
            Try changing the category filter.
          </p>
        </section>
      )}

      <section className="glass rounded-3xl p-5 mt-8">
        <h2 className="text-xl font-bold">
          Notification Reminder
        </h2>

        <p className="text-white/60 mt-2">
          Reminders are stored locally. They work best while the app is open or recently active. Full background push notifications would need a backend later.
        </p>
      </section>

      <p className="text-white/50 mt-8 text-sm text-center">
        Timetable is subject to change.
      </p>

>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
      <BottomNav />
    </main>
  )
}