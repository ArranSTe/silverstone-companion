import type { Metadata } from "next"
import "./globals.css"
import BottomNav from "./components/BottomNav"
import ScheduleReminderWatcher from "./components/ScheduleReminderWatcher"
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Silverstone Companion",
  description: "Silverstone Companion App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ScheduleReminderWatcher />
        {children}
        <BottomNav />
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  )
}