"use client"

import BottomNav from "../components/BottomNav"
import { Map, Coffee, Droplets, Shirt, Toilet, Utensils } from "lucide-react"

const mapItems = [
  {
    title: "Grandstands",
    description: "Find your stand and nearby entrances.",
    icon: Map,
  },
  {
    title: "Food & Drink",
    description: "Quick stops for meals, snacks and drinks.",
    icon: Utensils,
  },
  {
    title: "Toilets",
    description: "Know where the closest toilets are before sessions.",
    icon: Toilet,
  },
  {
    title: "Water Refill",
    description: "Refill points to avoid carrying loads of bottles.",
    icon: Droplets,
  },
  {
    title: "Merchandise",
    description: "Team gear and official Silverstone shops.",
    icon: Shirt,
  },
  {
    title: "Coffee",
    description: "Useful for early starts and long queue days.",
    icon: Coffee,
  },
]

export default function MapPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Circuit guide</p>

        <h1 className="iphone-title">
          Map
        </h1>

        <p className="iphone-subtitle">
          Quick guide to the main places you will want around Silverstone.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-yellow-300/30 to-cyan-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <Map size={30} />
        </div>

        <h2 className="text-[32px] leading-[34px] font-black">
          Find your way faster
        </h2>

        <p className="text-white/70 mt-3 leading-relaxed">
          Use this as your quick offline-friendly guide for stands, food, toilets, water points and shops.
        </p>
      </section>

      <section className="iphone-grid">
        {mapItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="iphone-small-card">
              <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                <Icon className="text-cyan-200" size={24} />
              </div>

              <h2 className="text-lg font-black">
                {item.title}
              </h2>

              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          )
        })}
      </section>

      <BottomNav />
    </main>
  )
}