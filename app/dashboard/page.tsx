"use client"

import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"
import {
  Backpack,
  CalendarDays,
  CloudSun,
  Map,
  MapPin,
  NotebookPen,
  ShieldAlert,
  Ticket,
  Truck,
  Utensils,
} from "lucide-react"
import BottomNav from "../components/BottomNav"
import {
  getCountdownToSession,
  getCurrentOrNextSession,
  type ScheduleSession,
} from "../data/schedule"

type SessionState = {
  status: string
  session: ScheduleSession
} | null

export default function DashboardPage() {
  const [firstName, setFirstName] = useState("Alex")
  const [sessionState, setSessionState] = useState<SessionState>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("silverstone-user")

    if (savedUser) {
      const user = JSON.parse(savedUser)
      setFirstName(user.firstName || "Alex")
    }

    const update = () => {
      setSessionState(getCurrentOrNextSession())
    }

    update()
    const timer = setInterval(update, 30 * 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen max-w-[430px] mx-auto text-white px-5 pt-7 pb-36 overflow-x-hidden">
      <header className="flex items-center justify-between gap-4 mb-7">
        <div className="min-w-0">
          <p className="text-white/55 text-sm font-medium">
            Silverstone Companion
          </p>

          <h1 className="text-[34px] leading-[36px] font-black tracking-[-1.4px] mt-1">
            Hello {firstName}
          </h1>
        </div>

        <Link
          href="/notes"
          className="h-14 w-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white shadow-lg shrink-0 active:scale-95 transition"
          aria-label="Notes"
        >
          <NotebookPen size={26} />
        </Link>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-cyan-300/25 to-purple-400/20 border border-white/10 p-5 shadow-xl mb-5">
        <p className="text-white/60 text-sm font-medium">
          Next up
        </p>

        {sessionState ? (
          <>
            <h2 className="text-[30px] leading-[33px] font-black mt-2 tracking-[-0.8px]">
              {sessionState.session.title}
            </h2>

            <p className="text-cyan-200 text-lg font-bold mt-3">
              {getCountdownToSession(sessionState.session)}
            </p>

            <Link
              href="/schedule"
              className="mt-5 h-12 rounded-2xl bg-white text-black font-bold flex items-center justify-center active:scale-[0.98] transition"
            >
              View full schedule
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-[30px] leading-[33px] font-black mt-2">
              Weekend ready
            </h2>

            <p className="text-white/65 mt-3">
              Your session countdown will appear here.
            </p>
          </>
        )}
      </section>

      <section className="grid grid-cols-2 gap-4 mb-5">
        <FeatureCard
          href="/weather"
          icon={<CloudSun size={28} />}
          title="Weather"
          subtitle="Live forecast"
          className="bg-[#2d6cdf]"
        />

        <FeatureCard
          href="/map"
          icon={<Map size={28} />}
          title="Map"
          subtitle="Circuit guide"
          className="bg-[#e8b931]"
        />

        <FeatureCard
          href="/tickets"
          icon={<Ticket size={28} />}
          title="Tickets"
          subtitle="Your passes"
          className="bg-[#8e6cff]"
        />

        <FeatureCard
          href="/tent-map"
          icon={<MapPin size={28} />}
          title="Tent"
          subtitle="Find camp"
          className="bg-[#2d9f7b]"
        />
      </section>

      <section className="rounded-[28px] bg-white/8 border border-white/10 p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-black">
            Quick links
          </h2>

          <p className="text-white/45 text-sm">
            Tap to open
          </p>
        </div>

        <div className="space-y-3">
          <HomeButton href="/schedule" icon={<CalendarDays />} label="Schedule" />
          <HomeButton href="/transport" icon={<Truck />} label="Transport" />
          <HomeButton href="/food" icon={<Utensils />} label="Food & Drink" />
          <HomeButton href="/packing" icon={<Backpack />} label="Packing" />
          <HomeButton href="/emergency" icon={<ShieldAlert />} label="Emergency" />
        </div>
      </section>

      <BottomNav />
    </main>
  )
}

function FeatureCard({
  href,
  icon,
  title,
  subtitle,
  className,
}: {
  href: string
  icon: ReactNode
  title: string
  subtitle: string
  className: string
}) {
  return (
    <Link
      href={href}
      className={`${className} min-h-[132px] rounded-[28px] p-4 shadow-lg flex flex-col justify-between active:scale-[0.98] transition`}
    >
      <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h2 className="text-[24px] leading-[25px] font-black">
          {title}
        </h2>

        <p className="text-white/75 text-sm mt-1">
          {subtitle}
        </p>
      </div>
    </Link>
  )
}

function HomeButton({
  href,
  icon,
  label,
}: {
  href: string
  icon: ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="h-[58px] rounded-2xl bg-white/10 border border-white/10 text-white flex items-center px-4 shadow-sm active:scale-[0.98] transition"
    >
      <span className="w-10 flex items-center justify-start text-cyan-200">
        {icon}
      </span>

      <span className="flex-1 text-[18px] font-bold">
        {label}
      </span>

      <span className="text-white/35 text-xl">
        ›
      </span>
    </Link>
  )
}