"use client"

import BottomNav from "../components/BottomNav"
import { Coffee, Leaf, Pizza, Sandwich, Utensils } from "lucide-react"

const foodItems = [
  {
    title: "Quick snacks",
    description: "Best for short gaps between sessions.",
    icon: Sandwich,
  },
  {
    title: "Hot food",
    description: "Use quieter times to avoid the biggest queues.",
    icon: Pizza,
  },
  {
    title: "Coffee",
    description: "Useful before morning practice or long travel days.",
    icon: Coffee,
  },
  {
    title: "Vegetarian / vegan",
    description: "Look for marked options before joining a long queue.",
    icon: Leaf,
  },
]

export default function FoodPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Food stops</p>

        <h1 className="iphone-title">
          Food & Drink
        </h1>

        <p className="iphone-subtitle">
          Keep track of what to look for when you need food, coffee or a quick snack.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-orange-300/30 to-pink-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <Utensils size={30} />
        </div>

        <h2 className="text-[30px] leading-[32px] font-black">
          Avoid peak queues
        </h2>

        <p className="text-white/70 mt-3 leading-relaxed">
          Try eating just before or just after the biggest track sessions. Everyone moves at the same time.
        </p>
      </section>

      <section className="iphone-grid">
        {foodItems.map((item) => {
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

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">
          Useful tip
        </h2>

        <p className="text-white/60 mt-2 leading-relaxed">
          Carry a refillable water bottle and a couple of emergency snacks. It saves money and queue stress.
        </p>
      </section>

      <BottomNav />
    </main>
  )
}