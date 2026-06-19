"use client"

import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
<<<<<<< HEAD
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

=======
import { Plus, Check } from "lucide-react"

type PackingSection = {
  title: string
  items: string[]
}

const defaultSections: PackingSection[] = [
  {
    title: "Camping Gear",
    items: [
      "Tent",
      "Sleeping bag",
      "Camping chair",
      "Pillow",
      "Torch",
      "Mallet",
      "Tent pegs",
      "Ground mat",
      "Blanket",
    ],
  },
  {
    title: "Clothing",
    items: [
      "Waterproof jacket",
      "Warm hoodie",
      "Spare socks",
      "Comfortable shoes",
      "Hat",
      "Sunglasses",
      "Spare clothes",
    ],
  },
  {
    title: "Electronics",
    items: [
      "Power bank",
      "Phone charging cable",
      "Plug adapter",
      "Head torch batteries",
      "Portable speaker",
    ],
  },
  {
    title: "Food & Cooking",
    items: [
      "Snacks",
      "Breakfast food",
      "Camping stove",
      "Gas canister",
      "Reusable cup",
      "Reusable water bottle",
      "Cool box",
    ],
  },
  {
    title: "Race Essentials",
    items: [
      "Race tickets",
      "Lanyard",
      "Ear protection",
      "Sun cream",
      "Cap",
      "Small backpack",
      "Portable seat pad",
    ],
  },
  {
    title: "Toiletries",
    items: [
      "Toothbrush",
      "Toothpaste",
      "Wet wipes",
      "Toilet roll",
      "Hand sanitiser",
      "Medication",
      "Towel",
    ],
  },
]

export default function PackingPage() {
  const [checked, setChecked] = useState<string[]>([])
  const [customItems, setCustomItems] = useState<string[]>([])
  const [customItem, setCustomItem] = useState("")

  const defaultItems = defaultSections.flatMap((section) => section.items)
  const allItems = [...defaultItems, ...customItems]

  useEffect(() => {
    const savedChecked = localStorage.getItem("packing-checked")
    const savedCustomItems = localStorage.getItem("packing-custom-items")

    if (savedChecked) {
      setChecked(JSON.parse(savedChecked))
    }

    if (savedCustomItems) {
      setCustomItems(JSON.parse(savedCustomItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("packing-checked", JSON.stringify(checked))
    localStorage.setItem("packing-custom-items", JSON.stringify(customItems))
  }, [checked, customItems])

  const toggleItem = (item: string) => {
    setChecked((previousItems) =>
      previousItems.includes(item)
        ? previousItems.filter((existingItem) => existingItem !== item)
        : [...previousItems, item]
    )
  }

  const addItem = () => {
    const trimmedItem = customItem.trim()

    if (!trimmedItem) return

    setCustomItems((previousItems) => [...previousItems, trimmedItem])
    setCustomItem("")
  }

  const progress =
    allItems.length === 0
      ? 0
      : Math.round((checked.length / allItems.length) * 100)

  return (
    <main className="min-h-screen px-5 pt-6 pb-40">
      <header>
        <h1 className="text-4xl font-bold">
          Packing
        </h1>

        <p className="text-white/60 mt-2">
          Camping and race weekend checklist
        </p>
      </header>

      <section className="glass rounded-3xl p-6 mt-6">
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-white/60">
              Packed
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {checked.length}/{allItems.length}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-cyan-300 text-3xl font-bold">
              {progress}%
            </p>

            <p className="text-white/50 text-sm">
              complete
            </p>
          </div>
        </div>

        <div className="h-3 bg-white/10 rounded-full mt-5 overflow-hidden">
          <div
            className="h-full bg-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      <section className="glass rounded-3xl p-4 mt-6 flex items-center gap-3">
        <input
          value={customItem}
          onChange={(event) => setCustomItem(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addItem()
            }
          }}
          placeholder="Add custom item..."
          className="bg-transparent outline-none flex-1 min-w-0 text-white placeholder:text-white/40"
        />

        <button
          onClick={addItem}
          className="bg-pink-500 rounded-2xl p-3 shrink-0"
          aria-label="Add item"
        >
          <Plus size={22} />
        </button>
      </section>

      <div className="mt-8 space-y-10">
        {defaultSections.map((section) => (
          <section key={section.title}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {section.title}
              </h2>

              <p className="text-white/40 text-sm">
                {
                  section.items.filter((item) => checked.includes(item))
                    .length
                }/{section.items.length}
              </p>
            </div>

            <div className="space-y-3">
              {section.items.map((item) => {
                const isChecked = checked.includes(item)

                return (
                  <button
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={`
                      w-full
                      rounded-3xl
                      px-5
                      py-4
                      flex
                      items-center
                      gap-4
                      text-left
                      transition-all
                      active:scale-[0.98]
                      ${
                        isChecked
                          ? "bg-pink-500/20 border border-pink-500/70"
                          : "glass"
                      }
                    `}
                  >
                    <span
                      className={`
                        h-7
                        w-7
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        shrink-0
                        ${
                          isChecked
                            ? "bg-pink-500 border-pink-500"
                            : "border-white/30"
                        }
                      `}
                    >
                      {isChecked && <Check size={16} />}
                    </span>

                    <span
                      className={`
                        text-base
                        leading-snug
                        ${
                          isChecked
                            ? "line-through text-white/50"
                            : "text-white"
                        }
                      `}
                    >
                      {item}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        ))}

        {customItems.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                Custom Items
              </h2>

              <p className="text-white/40 text-sm">
                {
                  customItems.filter((item) => checked.includes(item))
                    .length
                }/{customItems.length}
              </p>
            </div>

            <div className="space-y-3">
              {customItems.map((item) => {
                const isChecked = checked.includes(item)

                return (
                  <button
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={`
                      w-full
                      rounded-3xl
                      px-5
                      py-4
                      flex
                      items-center
                      gap-4
                      text-left
                      transition-all
                      active:scale-[0.98]
                      ${
                        isChecked
                          ? "bg-pink-500/20 border border-pink-500/70"
                          : "glass"
                      }
                    `}
                  >
                    <span
                      className={`
                        h-7
                        w-7
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        shrink-0
                        ${
                          isChecked
                            ? "bg-pink-500 border-pink-500"
                            : "border-white/30"
                        }
                      `}
                    >
                      {isChecked && <Check size={16} />}
                    </span>

                    <span
                      className={`
                        text-base
                        leading-snug
                        ${
                          isChecked
                            ? "line-through text-white/50"
                            : "text-white"
                        }
                      `}
                    >
                      {item}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        )}
      </div>

>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
      <BottomNav />
    </main>
  )
}