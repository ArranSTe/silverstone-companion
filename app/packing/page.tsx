"use client"

import { useEffect, useState } from "react"
import { Backpack, CheckCircle2, Circle } from "lucide-react"

const baseItems = [
      "Phone",
      "Tickets downloaded",
      "Printed backup tickets",
      "Parking confirmation",
      "ID",
      "Bank card",
      "Cash",
      "Small backpack under 20 litres",
      "Power bank",
      "Charging cable",
      "Refillable plastic water bottle",
      "Snacks",
      "Packed lunch",
      "Sun cream",
      "Lip balm with SPF",
      "Sunglasses",
      "Cap",
      "Bucket hat",
      "Rain poncho",
      "Waterproof jacket",
      "Hoodie",
      "Hand sanitiser",
      "Tissues",
      "Medication",
      "Painkillers",
      "Plasters",
      "Blister plasters",
      "Binoculars",
      "AirTag or tracker",
      "Car keys",
      "Spare socks",
      "Plastic bag for rubbish",
      "Plastic bag for wet clothes"
]

const campingItems = [
  "Camping confirmation",
      "Tent",
      "Tent pegs",
      "Mallet",
      "Guy ropes",
      "Groundsheet",
      "Tent footprint",
      "Tent carpet",
      "Picnic rug",
      "Tarp",
      "Duct tape",
      "Cable ties",
      "Bin bags",
      "Camping chairs",
      "Folding table",
      "Windbreak",
      "Torch",
      "Lantern",
      "Head torch",
      "Spare batteries",
      "Sleeping bag",
      "Pillow",
      "Air bed",
      "Sleeping mat",
      "Air bed pump",
      "Blanket",
      "Eye mask",
      "Warm socks",
      "Sleeping clothes",
      "Towel",
      "Microfibre towel",
      "Shower sliders",
      "Camping stove",
      "Gas canisters",
      "Lighter",
      "Matches",
      "Saucepan",
      "Frying pan",
      "Kettle",
      "Mugs",
      "Plates",
      "Bowls",
      "Cutlery",
      "Tea towel",
      "Kitchen roll",
      "Foil",
      "Food bags",
      "Cool box",
      "Cereal bars",
      "Bread rolls",
      "Wraps",
      "Crisps",
      "Biscuits",
      "Fruit",
      "Tea",
      "Coffee",
      "Milk",
      "Water bottles",
      "Dirty clothes bag",
          "Toothbrush",
      "Toothpaste",
      "Deodorant",
      "Shower gel",
  "Toilet roll",
  "Wet wipes",
]

const hotelItems = [
      "Hotel booking confirmation",
      "Room key or app check-in",
      "Phone charger",
      "Plug adaptor if needed",
      "Power bank",
      "Toothbrush",
      "Toothpaste",
      "Deodorant",
      "Shower gel",
      "Shampoo",
      "Conditioner",
      "Face wash",
      "Moisturiser",
      "Hairbrush",
      "Comb",
      "Razor",
      "Skincare products",
      "Pyjamas",
      "Clean clothes",
      "Underwear",
      "Socks",
      "Trainers",
      "Backup shoes",
      "Dirty clothes bag",
      "Laundry bag",
      "Medication",
      "Glasses",
      "Contact lenses",
      "Contact lens solution",
      "Makeup or grooming items",
      "Small evening bag",
      "Travel pillow",
      "Ear plugs",
      "Eye mask",
      "Snacks for the room",
      "Water bottle",
      "Car parking details",
      "Taxi or shuttle details"
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

    </main>
  )
}