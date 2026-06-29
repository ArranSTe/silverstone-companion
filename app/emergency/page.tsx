"use client"

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

    </main>
  )
}