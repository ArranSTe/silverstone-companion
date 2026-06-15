import BottomNav from "../components/BottomNav"
import { Bus, Car, Footprints } from "lucide-react"

const tips = [
  "Arrive before 7AM for smoother campsite access.",
  "Leave extra time after qualifying and the race.",
  "Save your parking zone before heading to the circuit.",
  "Use shuttle buses during peak walking times.",
]

export default function TransportPage() {
  return (
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

      <BottomNav />
    </main>
  )
}