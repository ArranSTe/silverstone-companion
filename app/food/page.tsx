import BottomNav from "../components/BottomNav"
import { Coffee, Utensils, Clock, AlertCircle } from "lucide-react"

const vendors = [
  {
    name: "Box Box Pizza",
    type: "Pizza / restaurant",
    price: "££",
    open: "Hospitality access / event dependent",
    note: "Named by Silverstone as part of selected hospitality ticket access.",
  },
  {
    name: "Fan Zone Food Village",
    type: "Mixed food vendors",
    price: "£–££",
    open: "Expected during circuit opening hours",
    note: "Exact 2026 vendor list and hours should be updated from the official event map when released.",
  },
  {
    name: "Silverstone Woodlands Food & Bar",
    type: "Camping food / bar",
    price: "£–££",
    open: "Camping/event dependent",
    note: "Woodlands lists food, bar and entertainment facilities for F1 camping.",
  },
  {
    name: "Trackside Coffee Points",
    type: "Coffee / breakfast",
    price: "£",
    open: "Usually mornings and daytime",
    note: "Replace with official vendor names once Silverstone publishes the live map.",
  },
]

export default function FoodPage() {
  return (
    <main className="min-h-screen p-6 pb-32">
      <h1 className="text-4xl font-bold">Food & Drink</h1>
      <p className="text-white/60 mt-2">
        Real known areas now, official 2026 vendor times to be added when published
      </p>

      <div className="glass rounded-3xl p-5 mt-6 bg-yellow-400/10">
        <div className="flex gap-3">
          <AlertCircle className="text-yellow-300" />
          <div>
            <h2 className="text-xl font-bold">Official times pending</h2>
            <p className="text-white/60 mt-2">
              The exact public food vendor list and opening times are usually best taken from the official Silverstone event map closer to the weekend.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="glass rounded-3xl p-5">
          <Coffee className="text-cyan-300" />
          <h2 className="text-xl font-bold mt-3">Coffee</h2>
          <p className="text-white/60">Breakfast priority</p>
        </div>

        <div className="glass rounded-3xl p-5">
          <Utensils className="text-pink-300" />
          <h2 className="text-xl font-bold mt-3">Food</h2>
          <p className="text-white/60">Fan zones & camping</p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {vendors.map((vendor) => (
          <div key={vendor.name} className="glass rounded-3xl p-5">
            <h2 className="text-2xl font-bold">{vendor.name}</h2>

            <p className="text-white/60 mt-1">
              {vendor.type} • {vendor.price}
            </p>

            <p className="text-cyan-300 mt-3 flex items-center gap-2">
              <Clock size={16} />
              {vendor.open}
            </p>

            <p className="text-white/60 mt-3">
              {vendor.note}
            </p>
          </div>
        ))}
      </div>

      <BottomNav />
    </main>
  )
}