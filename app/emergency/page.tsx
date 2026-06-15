import BottomNav from "../components/BottomNav"
import { AlertTriangle, Cross, Shield, Umbrella } from "lucide-react"

export default function EmergencyPage() {
  return (
    <main className="min-h-screen p-6 pb-32">
      <h1 className="text-4xl font-bold text-red-400">Emergency</h1>
      <p className="text-white/60 mt-2">Offline help and safety information</p>

      <div className="space-y-4 mt-6">
        <button className="w-full bg-red-500 rounded-3xl p-6 text-left">
          <Cross />
          <h2 className="text-2xl font-bold mt-3">Medical Assistance</h2>
          <p className="text-white/80 mt-1">Find nearest medical tent or call event staff.</p>
        </button>

        <button className="w-full bg-orange-500 rounded-3xl p-6 text-left">
          <Shield />
          <h2 className="text-2xl font-bold mt-3">Security</h2>
          <p className="text-white/80 mt-1">Report safety issues, theft or crowd concerns.</p>
        </button>

        <button className="w-full bg-yellow-400 text-black rounded-3xl p-6 text-left">
          <AlertTriangle />
          <h2 className="text-2xl font-bold mt-3">Lost Property</h2>
          <p className="mt-1">Check event lost property desks and information points.</p>
        </button>
      </div>

      <div className="glass rounded-3xl p-6 mt-6">
        <Umbrella className="text-cyan-300" />
        <h2 className="text-2xl font-bold mt-3">Weather Emergency</h2>
        <p className="text-white/60 mt-2">
          In severe weather, avoid exposed areas, secure tents and follow event staff instructions.
        </p>
      </div>

      <BottomNav />
    </main>
  )
}