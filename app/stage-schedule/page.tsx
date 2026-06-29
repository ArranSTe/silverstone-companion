"use client"

import { useEffect, useMemo, useState } from "react"
import { Bell, CalendarDays, Mic2, Music, Star } from "lucide-react"
import { stageSessions, type StageSession } from "../data/stageSchedule"

const STAGE_BOOKMARK_KEY = "silverstone-bookmarked-stage-sessions"

function getStageSessionId(session: StageSession, index: number) {
  return `${session.date}-${session.startTime}-${session.title}-${index}`
}

function formatDay(date: string) {
  const sessionDate = new Date(`${date}T12:00:00`)

  return sessionDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

function getSessionStart(session: StageSession) {
  return new Date(`${session.date}T${session.startTime}:00+01:00`)
}

export default function StageSchedulePage() {
  const [selectedDay, setSelectedDay] = useState("All")
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    const savedBookmarks = localStorage.getItem(STAGE_BOOKMARK_KEY)

    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks))
      } catch {
        localStorage.removeItem(STAGE_BOOKMARK_KEY)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STAGE_BOOKMARK_KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  const days = useMemo(() => {
    const uniqueDates = Array.from(
      new Set(stageSessions.map((session) => session.date))
    )

    return ["All", ...uniqueDates]
  }, [])

  const filteredSessions = useMemo(() => {
    return stageSessions.filter((session, index) => {
      const sessionId = getStageSessionId(session, index)

      const matchesDay = selectedDay === "All" || session.date === selectedDay

      const matchesBookmark =
        !bookmarkedOnly || bookmarks.includes(sessionId)

      return matchesDay && matchesBookmark
    })
  }, [selectedDay, bookmarkedOnly, bookmarks])

  const toggleBookmark = async (sessionId: string) => {
    if (!("Notification" in window)) {
      alert("Notifications are not supported on this device/browser.")
    } else if (Notification.permission === "default") {
      await Notification.requestPermission()
    }

    setBookmarks((current) => {
      if (current.includes(sessionId)) {
        return current.filter((id) => id !== sessionId)
      }

      return [...current, sessionId]
    })
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Entertainment timings</p>

        <h1 className="iphone-title">Stage Schedule</h1>

        <p className="iphone-subtitle">
          Check what is happening on the stages, filter by day, and bookmark the
          acts you do not want to miss.
        </p>
      </header>

      <section className="iphone-card mb-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-purple-300/20 flex items-center justify-center">
            <Music className="text-purple-200" />
          </div>

          <div>
            <h2 className="text-xl font-black">Stage reminders</h2>

            <p className="text-white/60 text-sm mt-1 leading-relaxed">
              Tap the star beside any stage session to save it.
            </p>
          </div>
        </div>
      </section>

      <section className="iphone-card mb-5 bg-cyan-300/10">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-2xl bg-cyan-300/20 flex items-center justify-center shrink-0">
            <Bell className="text-cyan-200" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-black">Tip</h2>

            <p className="text-white/60 mt-2 leading-relaxed">
              Stage times can change, so update this page when the official
              Silverstone entertainment schedule is released.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`shrink-0 h-11 rounded-full px-5 font-black transition ${
                selectedDay === day
                  ? "bg-purple-300 text-black"
                  : "bg-white/10 text-white border border-white/10"
              }`}
            >
              {day === "All" ? "All" : formatDay(day)}
            </button>
          ))}
        </div>

        <button
          onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
          className={`mt-3 h-11 rounded-full px-5 font-black flex items-center gap-2 transition ${
            bookmarkedOnly
              ? "bg-yellow-300 text-black"
              : "bg-white/10 text-white border border-white/10"
          }`}
        >
          <Star size={18} fill={bookmarkedOnly ? "black" : "none"} />
          Bookmarked only
        </button>
      </section>

      <section className="space-y-4">
        {filteredSessions.map((session, index) => {
          const sessionId = getStageSessionId(session, index)
          const bookmarked = bookmarks.includes(sessionId)
          const sessionStart = getSessionStart(session)

          return (
            <article key={sessionId} className="iphone-card">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mic2 className="text-purple-200" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-white/45 text-sm font-bold">
                    {formatDay(session.date)} • {session.startTime}
                    {session.endTime ? ` - ${session.endTime}` : ""}
                  </p>

                  <h2 className="text-2xl font-black mt-1">
                    {session.title}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-300/20 px-3 py-1 text-xs font-black text-purple-200">
                      {session.stage}
                    </span>

                    {session.category && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">
                        {session.category}
                      </span>
                    )}
                  </div>

                  {session.location && (
                    <p className="text-white/60 mt-2">{session.location}</p>
                  )}

                  <p className="text-white/45 text-sm mt-3">
                    Starts{" "}
                    {sessionStart.toLocaleString("en-GB", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <button
                  onClick={() => toggleBookmark(sessionId)}
                  className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 active:scale-95 transition ${
                    bookmarked
                      ? "bg-yellow-300 text-black"
                      : "bg-white/10 text-white"
                  }`}
                  aria-label={
                    bookmarked ? "Remove bookmark" : "Bookmark stage session"
                  }
                >
                  <Star size={21} fill={bookmarked ? "black" : "none"} />
                </button>
              </div>
            </article>
          )
        })}

        {filteredSessions.length === 0 && (
          <section className="iphone-card">
            <h2 className="text-xl font-black">No stage sessions found</h2>

            <p className="text-white/60 mt-2">
              Try another day or turn off bookmarked only.
            </p>
          </section>
        )}
      </section>
    </main>
  )
}