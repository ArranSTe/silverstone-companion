"use client"

<<<<<<< HEAD
import BottomNav from "../components/BottomNav"
import { Map, Coffee, Droplets, Shirt, Toilet, Utensils } from "lucide-react"

const mapItems = [
  {
    title: "Grandstands",
    description: "Find your stand and nearby entrances.",
    icon: Map,
  },
  {
    title: "Food & Drink",
    description: "Quick stops for meals, snacks and drinks.",
    icon: Utensils,
  },
  {
    title: "Toilets",
    description: "Know where the closest toilets are before sessions.",
    icon: Toilet,
  },
  {
    title: "Water Refill",
    description: "Refill points to avoid carrying loads of bottles.",
    icon: Droplets,
  },
  {
    title: "Merchandise",
    description: "Team gear and official Silverstone shops.",
    icon: Shirt,
  },
  {
    title: "Coffee",
    description: "Useful for early starts and long queue days.",
    icon: Coffee,
  },
]

export default function MapPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Circuit guide</p>

        <h1 className="iphone-title">
          Map
        </h1>

        <p className="iphone-subtitle">
          Quick guide to the main places you will want around Silverstone.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-yellow-300/30 to-cyan-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <Map size={30} />
        </div>

        <h2 className="text-[32px] leading-[34px] font-black">
          Find your way faster
        </h2>

        <p className="text-white/70 mt-3 leading-relaxed">
          Use this as your quick offline-friendly guide for stands, food, toilets, water points and shops.
        </p>
      </section>

      <section className="iphone-grid">
        {mapItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="iphone-small-card">
              <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                <Icon className="text-cyan-200" size={24} />
              </div>

              <h2 className="text-lg font-black">
                {item.title}
              </h2>

              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          )
        })}
      </section>

=======
import { useEffect, useRef, useState } from "react"
import BottomNav from "../components/BottomNav"
import { Info, LocateFixed } from "lucide-react"

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletMap = useRef<any>(null)
  const userMarker = useRef<any>(null)

  const [status, setStatus] = useState("Use the button below to show your approximate position.")

  // Approximate GPS boundary for the Silverstone event map image
  const gpsBounds = {
    north: 52.088,
    south: 52.069,
    west: -1.043,
    east: -1.000,
  }

  function gpsToImagePoint(latitude: number, longitude: number) {
    const x =
      ((longitude - gpsBounds.west) / (gpsBounds.east - gpsBounds.west)) * 100

    const y =
      ((gpsBounds.north - latitude) / (gpsBounds.north - gpsBounds.south)) * 100

    return { x, y }
  }

  useEffect(() => {
    async function loadImageMap() {
      const L = await import("leaflet")

      if (!mapRef.current || leafletMap.current) return

      const bounds = L.latLngBounds([
        [0, 0],
        [100, 100],
      ])

      leafletMap.current = L.map(mapRef.current, {
        crs: L.CRS.Simple,
        minZoom: -1,
        maxZoom: 8,
        zoomControl: true,
        attributionControl: false,
      })

      L.imageOverlay("/silverstone-official-map.jpg", bounds).addTo(
        leafletMap.current
      )

      leafletMap.current.fitBounds(bounds)
      leafletMap.current.setMaxBounds(bounds.pad(0.2))
    }

    loadImageMap()
  }, [])

  const showMe = async () => {
    setStatus("Finding your location...")

    if (!navigator.geolocation) {
      setStatus("Location is not supported on this device.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const L = await import("leaflet")

        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const point = gpsToImagePoint(latitude, longitude)

        if (!leafletMap.current) return

        const userIcon = L.divIcon({
          html: `
            <div style="
              height:42px;
              width:42px;
              border-radius:999px;
              background:#00e5ff;
              color:#000;
              display:flex;
              align-items:center;
              justify-content:center;
              border:3px solid white;
              box-shadow:0 10px 30px rgba(0,229,255,.45);
              font-size:20px;
              font-weight:800;
            ">
              ●
            </div>
          `,
          className: "",
          iconSize: [42, 42],
          iconAnchor: [21, 21],
        })

        if (userMarker.current) {
          userMarker.current.remove()
        }

        userMarker.current = L.marker([point.y, point.x], {
          icon: userIcon,
        })
          .addTo(leafletMap.current)
          .bindPopup("You are here - approximate")
          .openPopup()

        leafletMap.current.setView([point.y, point.x], 4)

        setStatus("Showing your approximate position on the official map.")
      },
      () => {
        setStatus("Could not get your location. Check browser location permission.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }

  return (
    <main className="min-h-screen px-5 pt-6 pb-40">
      <h1 className="text-4xl font-bold">
        Official Map
      </h1>

      <p className="text-white/60 mt-2">
        Zoom, move around, and show your approximate position on the saved event map.
      </p>

      <section className="glass rounded-3xl p-4 mt-6 flex gap-3">
        <Info className="text-cyan-300 shrink-0" />

        <p className="text-white/60 text-sm">
          This map is a saved JPG, so your position is approximate. Use Find My Tent for accurate GPS.
        </p>
      </section>

      <section className="glass rounded-[32px] h-[620px] mt-6 overflow-hidden">
        <div ref={mapRef} className="h-full w-full" />
      </section>

      <p className="text-white/60 mt-3 text-sm">
        {status}
      </p>

      <button
        onClick={showMe}
        className="mt-5 bg-pink-500 rounded-3xl p-5 w-full font-semibold flex items-center justify-center gap-3"
      >
        <LocateFixed />
        Show Me On Map
      </button>

>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
      <BottomNav />
    </main>
  )
}