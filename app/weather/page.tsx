<<<<<<< HEAD
"use client"

import BottomNav from "../components/BottomNav"
import LiveWeather from "../components/LiveWeather"

export default function WeatherPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Live conditions</p>

        <h1 className="iphone-title">
          Weather
        </h1>

        <p className="iphone-subtitle">
          Check temperature, rain chance, wind speed and wind direction before heading around the circuit.
        </p>
      </header>

      <LiveWeather />

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">
          Weather tips
        </h2>

        <div className="iphone-list mt-4">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="font-bold">Windy?</p>
            <p className="text-white/60 text-sm mt-1">
              Secure camping chairs, flags and loose kit before leaving your tent.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="font-bold">Rain likely?</p>
            <p className="text-white/60 text-sm mt-1">
              Pack a light waterproof and keep tickets/phone in a dry bag.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="font-bold">Sunny?</p>
            <p className="text-white/60 text-sm mt-1">
              Take sun cream, a cap and refill water often.
            </p>
          </div>
        </div>
      </section>
=======
import BottomNav from "../components/BottomNav"
import LiveWeather from "../components/LiveWeather"
import { Wind, Sun, Droplets } from "lucide-react"

export default function WeatherPage() {
  return (
    <main className="min-h-screen p-6 pb-32">
      <h1 className="text-4xl font-bold">Weather</h1>
      <p className="text-white/60 mt-2">
        Live Silverstone weather with offline fallback
      </p>

      <LiveWeather />

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="glass rounded-3xl p-4">
          <Wind className="text-cyan-300" />
          <p className="text-white/60 mt-3">Wind</p>
          <p className="font-bold">Live</p>
        </div>

        <div className="glass rounded-3xl p-4">
          <Sun className="text-yellow-300" />
          <p className="text-white/60 mt-3">UV</p>
          <p className="font-bold">Check day</p>
        </div>

        <div className="glass rounded-3xl p-4">
          <Droplets className="text-pink-300" />
          <p className="text-white/60 mt-3">Mud</p>
          <p className="font-bold">Weather based</p>
        </div>
      </div>

      <div className="glass rounded-3xl p-5 mt-6 bg-pink-500/10">
        <h2 className="text-xl font-bold">Camping Weather Reminder</h2>
        <p className="text-white/60 mt-2">
          Weather updates need data. When offline, the app shows the last saved Silverstone weather.
        </p>
      </div>
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1

      <BottomNav />
    </main>
  )
}