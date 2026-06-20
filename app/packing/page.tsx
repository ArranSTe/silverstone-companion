"use client"

import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { Backpack, CheckCircle2, Circle } from "lucide-react"

const baseItems = [
  "Tickets / QR codes",
  "Phone charger",
  "Power bank",
  "Water bottle",
  "Waterproof jacket",
  "Sun cream",
  "Cap or hat",
  "Comfortable trainers",
  "Ear defenders",
  "Snacks",
  "Medication",
  "Warm hoodie",
  "Hand sanitiser",
]

const campingItems = [
  "Tent",
  "Sleeping bag",
  "Camping chair",
  "Torch",
  "Cool box",
  "Camping stove",
  "Toiletries bag",
]

const hotelItems = [
  "Hotel booking confirmation",
  "Travel clothes",
  "Evening clothes",
  "Wash bag",
  "Phone plug adapter",
  "Car park details",
]

export default function PackingPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [stayType, setStayType] = useState<"Camping" | "Hotel">("Camping")

  useEffect(() => {
    const savedPacking = localStorage.getItem("silverstone-packing")
    const savedPreferences = localStorage.getItem("silverstone-preferences")

    if (savedPacking) {
      setCheckedItems(JSON.parse(savedPacking))
    }

    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences)
      setStayType(preferences.stayType || "Camping")
    }
  }, [])

  const packingItems =
    stayType === "Camping"
      ? [...baseItems, ...campingItems]
      : [...baseItems, ...hotelItems]

  const toggleItem = (item: string) => {
    const nextItems = checkedItems.includes(item)
      ? checkedItems.filter((checked) => checked !== item)
      : [...checkedItems, item]

    setCheckedItems(nextItems)
    localStorage.setItem("silverstone-packing", JSON.stringify(nextItems))
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">
          {stayType} checklist
        </p>

        <h1 className="iphone-title">
          Packing
        </h1>

        <p className="iphone-subtitle">
          Tick things off as you pack so nothing important gets forgotten.
        </p>
      </header>

      <section className="iphone-card mb-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center">
            <Backpack className="text-cyan-200" />
          </div>

          <div>
            <h2 className="text-xl font-black">
              Packed
            </h2>

            <p className="text-white/60 mt-1">
              {checkedItems.filter((item) => packingItems.includes(item)).length} of {packingItems.length} items ticked
            </p>
          </div>
        </div>
      </section>

      <section className="iphone-list">
        {packingItems.map((item) => {
          const checked = checkedItems.includes(item)

          return (
            <button
              key={item}
              onClick={() => toggleItem(item)}
              className="iphone-button w-full text-left"
            >
              {checked ? (
                <CheckCircle2 className="text-cyan-200" />
              ) : (
                <Circle className="text-white/45" />
              )}

              <span className={checked ? "line-through text-white/45" : ""}>
                {item}
              </span>
            </button>
          )
        })}
      </section>

      <BottomNav />
    </main>
  )
}