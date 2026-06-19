<<<<<<< HEAD
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
=======
import BottomNav from "../components/BottomNav"
import { Bus, Car, Footprints } from "lucide-react"

const tips = [
  "Arrive before 7AM for smoother campsite access.",
  "Leave extra time after qualifying and the race.",
  "Save your parking zone before heading to the circuit.",
  "Use shuttle buses during peak walking times.",
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
]

export default function TransportPage() {
  return (
<<<<<<< HEAD
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
=======
    <main className="min-h-screen p-6 pb-32">
      <h1 className="text-4xl font-bold">Transport</h1>
      <p className="text-white/60 mt-2">Parking, shuttles and walking guidance</p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="glass rounded-3xl p-4">
          <Car className="text-pink-300" />
          <p className="font-bold mt-3">Parking</p>
          <p className="text-white/60 text-sm">Zone C</p>
        </div>

        <div className="glass rounded-3xl p-4">
          <Bus className="text-cyan-300" />
          <p className="font-bold mt-3">Shuttle</p>
          <p className="text-white/60 text-sm">20 mins</p>
        </div>

        <div className="glass rounded-3xl p-4">
          <Footprints className="text-purple-300" />
          <p className="font-bold mt-3">Walk</p>
          <p className="text-white/60 text-sm">18 mins</p>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 mt-6">
        <h2 className="text-2xl font-bold">Departure Suggestion</h2>
        <p className="text-white/60 mt-2">
          After the race, wait 60–90 minutes before leaving if you want to avoid the worst traffic.
        </p>
      </div>

      <div className="space-y-4 mt-6">
        {tips.map((tip) => (
          <div key={tip} className="glass rounded-3xl p-5">
            {tip}
          </div>
        ))}
      </div>
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1

      <BottomNav />
    </main>
  )
}