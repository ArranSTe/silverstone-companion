<<<<<<< HEAD
"use client"

import BottomNav from "../components/BottomNav"
import { Cross, MapPin, Phone, ShieldAlert } from "lucide-react"

export default function EmergencyPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Safety</p>

        <h1 className="iphone-title">
          Emergency
        </h1>

        <p className="iphone-subtitle">
          Quick safety reminders and useful information if something goes wrong.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-red-400/30 to-orange-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <ShieldAlert size={30} />
        </div>

        <h2 className="text-[30px] leading-[32px] font-black">
          Stay calm, get help
        </h2>

        <p className="text-white/70 mt-3 leading-relaxed">
          If it is serious, speak to Silverstone staff or medical teams immediately and follow venue instructions.
        </p>
      </section>

      <section className="iphone-list">
        <div className="iphone-card">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-2xl bg-red-400/20 flex items-center justify-center shrink-0">
              <Phone className="text-red-200" />
            </div>

            <div>
              <h2 className="text-lg font-black">
                Emergency services
              </h2>

              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                Call 999 for serious medical, fire or police emergencies.
              </p>
            </div>
          </div>
        </div>

        <div className="iphone-card">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center shrink-0">
              <Cross className="text-cyan-200" />
            </div>

            <div>
              <h2 className="text-lg font-black">
                Medical points
              </h2>

              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                Use the circuit map or ask staff for the nearest first aid or medical point.
              </p>
            </div>
          </div>
        </div>

        <div className="iphone-card">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-2xl bg-yellow-300/20 flex items-center justify-center shrink-0">
              <MapPin className="text-yellow-200" />
            </div>

            <div>
              <h2 className="text-lg font-black">
                Know your location
              </h2>

              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                Look for nearby gates, grandstands, food stalls or signs so staff can find you quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
=======
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
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1

      <BottomNav />
    </main>
  )
}