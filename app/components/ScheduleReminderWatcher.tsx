"use client"

import { useEffect } from "react"
import { scheduleSessions, type ScheduleSession } from "../data/schedule"

const BOOKMARK_KEY = "silverstone-bookmarked-sessions"
const SENT_KEY = "silverstone-sent-session-reminders"

const REMINDER_MINUTES = [30, 15, 5]

function getSessionId(session: ScheduleSession, index: number) {
  return `${session.date}-${session.startTime}-${session.title}-${index}`
}

function getSessionStart(session: ScheduleSession) {
  return new Date(`${session.date}T${session.startTime}:00+01:00`)
}

export default function ScheduleReminderWatcher() {
  useEffect(() => {
    const checkReminders = () => {
      if (!("Notification" in window)) return
      if (Notification.permission !== "granted") return

      const savedBookmarks = localStorage.getItem(BOOKMARK_KEY)
      const savedSent = localStorage.getItem(SENT_KEY)

      const bookmarks: string[] = savedBookmarks
        ? JSON.parse(savedBookmarks)
        : []

      const sent: string[] = savedSent ? JSON.parse(savedSent) : []

      if (bookmarks.length === 0) return

      const now = new Date()
      const updatedSent = [...sent]

      scheduleSessions.forEach((session, index) => {
        const sessionId = getSessionId(session, index)

        if (!bookmarks.includes(sessionId)) return

        const sessionStart = getSessionStart(session)
        const msUntilStart = sessionStart.getTime() - now.getTime()
        const minutesUntilStart = Math.round(msUntilStart / 60000)

        REMINDER_MINUTES.forEach((minutes) => {
          const reminderId = `${sessionId}-${minutes}`

          if (updatedSent.includes(reminderId)) return

          const shouldSend =
            minutesUntilStart <= minutes && minutesUntilStart > minutes - 2

          if (!shouldSend) return

          new Notification("Silverstone reminder", {
            body: `${session.title} starts in ${minutes} minutes.`,
          })

          updatedSent.push(reminderId)
        })
      })

      localStorage.setItem(SENT_KEY, JSON.stringify(updatedSent))
    }

    checkReminders()

    const timer = setInterval(checkReminders, 60 * 1000)

    return () => clearInterval(timer)
  }, [])

  return null
}