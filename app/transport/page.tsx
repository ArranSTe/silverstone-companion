"use client"

import BottomNav from "../components/BottomNav"
import { Bus, Car, Footprints, Train, TrafficCone } from "lucide-react"

const transportItems = [
  {
    title: "Shuttle buses",
    description: "Check pick-up points early and leave extra time after sessions.",
    icon: Bus,
  },
  {
    title: "Parking",
    description: "Save your parking area and take a photo of nearby signs.",
    icon: Car,
  },
  {
    title: "Walking routes",
    description: "Expect long walks. Comfortable shoes make a big difference.",
    icon: Footprints,
  },
  {
    title: "Train info",
    description: "Check the last train options before committing to late plans.",
    icon: Train,
  },
  {
    title: "Traffic",
    description: "Allow extra time leaving Silverstone, especially after the race.",
    icon: TrafficCone,
  },
]

export default function TransportPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Getting around</p>

        <h1 className="iphone-title">
          Transport
        </h1>

        <p className="iphone-subtitle">
          Keep the key travel reminders in one place for buses, parking, walking and traffic.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-blue-400/25 to-cyan-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <h2 className="text-[30px] leading-[32px] font-black">
          Plan extra time
        </h2>

        <p className="text-white/70 mt-3 leading-relaxed">
          Silverstone travel is busiest before major sessions and straight after the race. Aim to move earlier than you think.
        </p>
      </section>

      <section className="iphone-list">
        {transportItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="iphone-card">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center shrink-0">
                  <Icon className="text-cyan-200" />
                </div>

                <div>
                  <h2 className="text-lg font-black">
                    {item.title}
                  </h2>

                  <p className="text-white/60 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <BottomNav />
    </main>
  )
}