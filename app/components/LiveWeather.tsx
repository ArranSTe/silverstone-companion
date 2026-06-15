"use client"

import { useEffect, useState } from "react"
import { CloudRain, WifiOff } from "lucide-react"

type WeatherData = {
  temperature: number
  windspeed: number
  winddirection: number
  rain: number
  time: string
}

const fallbackWeather: WeatherData = {
  temperature: 0,
  windspeed: 0,
  winddirection: 0,
  rain: 0,
  time: "Offline",
}

function getWindDirection(degrees: number) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = Math.round(degrees / 45) % 8

  return directions[index]
}

export default function LiveWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    const savedWeather = localStorage.getItem("silverstone-weather")

    if (savedWeather) {
      setWeather(JSON.parse(savedWeather))
    } else {
      setWeather(fallbackWeather)
      setOffline(true)
    }

    async function fetchWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=52.0786&longitude=-1.0169&current_weather=true&hourly=precipitation_probability&timezone=Europe%2FLondon"
        )

        const data = await response.json()

        const liveWeather: WeatherData = {
          temperature: Math.round(data.current_weather.temperature),
          windspeed: Math.round(data.current_weather.windspeed),
          winddirection: Math.round(data.current_weather.winddirection),
          rain: data.hourly?.precipitation_probability?.[0] ?? 0,
          time: data.current_weather.time,
        }

        setWeather(liveWeather)
        localStorage.setItem("silverstone-weather", JSON.stringify(liveWeather))
        setOffline(false)
      } catch {
        setOffline(true)
      }
    }

    fetchWeather()
  }, [])

  if (!weather) {
    return (
      <div className="glass rounded-3xl p-6 mt-6">
        Loading weather...
      </div>
    )
  }

  const hasRealWeather = weather.time !== "Offline"
  const windDirection = getWindDirection(weather.winddirection)

  return (
    <div className="glass rounded-3xl p-6 mt-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white/60">
            Silverstone Weather
          </p>

          {hasRealWeather ? (
            <>
              <h2 className="text-5xl font-bold mt-2">
                {weather.temperature}°C
              </h2>

              <p className="text-cyan-300 mt-2">
                Wind {weather.windspeed} km/h {windDirection}
<span
  className="inline-flex ml-2 text-lg font-bold"
  style={{ transform: `rotate(${weather.winddirection}deg)` }}
>
  ↑
</span>
{" "}• Rain {weather.rain}%
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mt-2">
                Offline
              </h2>

              <p className="text-yellow-300 mt-2">
                Weather will update when data returns.
              </p>
            </>
          )}

          {offline && (
            <p className="text-yellow-300 text-sm mt-3 flex items-center gap-2">
              <WifiOff size={16} />
              {hasRealWeather
                ? "Showing last saved weather"
                : "No live weather available"}
            </p>
          )}
        </div>

        <CloudRain size={52} className="text-cyan-300" />
      </div>
    </div>
  )
}