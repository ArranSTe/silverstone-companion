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

      <BottomNav />
    </main>
  )
}