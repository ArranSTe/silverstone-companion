"use client"

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


    </main>
  )
}