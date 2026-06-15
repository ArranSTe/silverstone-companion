export type ScheduleSession = {
  day: "Thursday" | "Friday" | "Saturday" | "Sunday"
  dateLabel: string
  date: string
  startTime: string
  endTime: string
  title: string
  category: "F1" | "F2" | "F3" | "F1 Academy" | "Historic" | "Parade"
  location: string
  highlight?: boolean
}

export const raceWeekendStart = "2026-07-02T00:00:00+01:00"

export const scheduleSessions: ScheduleSession[] = [
  {
    day: "Thursday",
    dateLabel: "Thursday - 02 July",
    date: "2026-07-02",
    startTime: "11:45",
    endTime: "12:00",
    title: "Historic Car Demonstration",
    category: "Historic",
    location: "On Track",
  },
  {
    day: "Thursday",
    dateLabel: "Thursday - 02 July",
    date: "2026-07-02",
    startTime: "15:25",
    endTime: "15:35",
    title: "Historic Car Demonstration",
    category: "Historic",
    location: "On Track",
  },

  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "07:45",
    endTime: "08:25",
    title: "F1 ACADEMY™ Free Practice",
    category: "F1 Academy",
    location: "On Track",
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "08:50",
    endTime: "09:35",
    title: "Formula 3 Practice",
    category: "F3",
    location: "On Track",
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "10:00",
    endTime: "10:45",
    title: "Formula 2 Practice",
    category: "F2",
    location: "On Track",
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "12:30",
    endTime: "13:30",
    title: "Formula 1 Practice 1",
    category: "F1",
    location: "On Track",
    highlight: true,
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "14:00",
    endTime: "14:30",
    title: "Formula 3 Qualifying",
    category: "F3",
    location: "On Track",
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "14:55",
    endTime: "15:25",
    title: "Formula 2 Qualifying",
    category: "F2",
    location: "On Track",
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "15:45",
    endTime: "16:00",
    title: "Historic Formula 1 Car Demonstration",
    category: "Historic",
    location: "On Track",
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "16:00",
    endTime: "17:44",
    title: "Formula 1 Sprint Qualifying",
    category: "F1",
    location: "On Track",
    highlight: true,
  },
  {
    day: "Friday",
    dateLabel: "Friday - 03 July",
    date: "2026-07-03",
    startTime: "18:00",
    endTime: "18:30",
    title: "F1 ACADEMY™ Qualifying",
    category: "F1 Academy",
    location: "On Track",
  },

  {
    day: "Saturday",
    dateLabel: "Saturday - 04 July",
    date: "2026-07-04",
    startTime: "09:35",
    endTime: "10:20",
    title: "Formula 3 Sprint Race",
    category: "F3",
    location: "On Track",
  },
  {
    day: "Saturday",
    dateLabel: "Saturday - 04 July",
    date: "2026-07-04",
    startTime: "12:00",
    endTime: "12:30",
    title: "Formula 1 Sprint",
    category: "F1",
    location: "On Track",
    highlight: true,
  },
  {
    day: "Saturday",
    dateLabel: "Saturday - 04 July",
    date: "2026-07-04",
    startTime: "13:45",
    endTime: "14:35",
    title: "Formula 2 Sprint Race",
    category: "F2",
    location: "On Track",
  },
  {
    day: "Saturday",
    dateLabel: "Saturday - 04 July",
    date: "2026-07-04",
    startTime: "14:50",
    endTime: "15:20",
    title: "Formula 1 Historic Cars Demonstration",
    category: "Historic",
    location: "On Track",
  },
  {
    day: "Saturday",
    dateLabel: "Saturday - 04 July",
    date: "2026-07-04",
    startTime: "16:00",
    endTime: "17:00",
    title: "Formula 1 Qualifying",
    category: "F1",
    location: "On Track",
    highlight: true,
  },
  {
    day: "Saturday",
    dateLabel: "Saturday - 04 July",
    date: "2026-07-04",
    startTime: "18:05",
    endTime: "18:35",
    title: "F1 ACADEMY™ Reverse Grid Race",
    category: "F1 Academy",
    location: "On Track",
  },

  {
    day: "Sunday",
    dateLabel: "Sunday - 05 July",
    date: "2026-07-05",
    startTime: "08:30",
    endTime: "09:00",
    title: "F1 ACADEMY™ Feature Race",
    category: "F1 Academy",
    location: "On Track",
  },
  {
    day: "Sunday",
    dateLabel: "Sunday - 05 July",
    date: "2026-07-05",
    startTime: "09:40",
    endTime: "10:30",
    title: "Formula 3 Feature Race",
    category: "F3",
    location: "On Track",
  },
  {
    day: "Sunday",
    dateLabel: "Sunday - 05 July",
    date: "2026-07-05",
    startTime: "11:15",
    endTime: "12:20",
    title: "Formula 2 Feature Race",
    category: "F2",
    location: "On Track",
  },
  {
    day: "Sunday",
    dateLabel: "Sunday - 05 July",
    date: "2026-07-05",
    startTime: "12:30",
    endTime: "12:45",
    title: "Formula 1 Historic Cars",
    category: "Historic",
    location: "On Track",
  },
  {
    day: "Sunday",
    dateLabel: "Sunday - 05 July",
    date: "2026-07-05",
    startTime: "13:00",
    endTime: "13:30",
    title: "Drivers Parade",
    category: "Parade",
    location: "On Track",
  },
  {
    day: "Sunday",
    dateLabel: "Sunday - 05 July",
    date: "2026-07-05",
    startTime: "15:00",
    endTime: "17:00",
    title: "Formula 1 Race",
    category: "F1",
    location: "On Track",
    highlight: true,
  },
]

export function getSessionStart(session: ScheduleSession) {
  return new Date(`${session.date}T${session.startTime}:00+01:00`)
}

export function getSessionEnd(session: ScheduleSession) {
  return new Date(`${session.date}T${session.endTime}:00+01:00`)
}

export function getCurrentOrNextSession() {
  const now = new Date()

  const activeSession = scheduleSessions.find((session) => {
    const start = getSessionStart(session)
    const end = getSessionEnd(session)

    return now >= start && now <= end
  })

  if (activeSession) {
    return {
      session: activeSession,
      status: "Live Now",
      countdown: "Live now",
    }
  }

  const nextSession = scheduleSessions.find((session) => {
    return getSessionStart(session).getTime() > now.getTime()
  })

  if (!nextSession) {
    return {
      session: scheduleSessions[scheduleSessions.length - 1],
      status: "Finished",
      countdown: "Weekend complete",
    }
  }

  return {
    session: nextSession,
    status: "Next Session",
    countdown: getCountdownToSession(nextSession),
  }
}

export function getCountdownToSession(session: ScheduleSession) {
  const now = new Date().getTime()
  const sessionStart = getSessionStart(session).getTime()
  const difference = sessionStart - now

  if (difference <= 0) {
    return "Live now"
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  )

  if (days > 0) {
    return `${days}d ${hours}h`
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  return `${minutes}m`
}