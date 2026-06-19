"use client"

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

      <BottomNav />
    </main>
  )
}