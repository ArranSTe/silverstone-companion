"use client"

import { useEffect, useRef, useState } from "react"
import BottomNav from "../components/BottomNav"
import { LocateFixed, MapPin, Navigation, Tent } from "lucide-react"

export default function TentMapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletMap = useRef<any>(null)
  const tentMarker = useRef<any>(null)
  const userMarker = useRef<any>(null)

  const [status, setStatus] = useState("Map ready")

  useEffect(() => {
    async function loadMap() {
      const L = await import("leaflet")

      if (!mapRef.current || leafletMap.current) return

      leafletMap.current = L.map(mapRef.current).setView([52.0786, -1.0169], 15)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(leafletMap.current)

      L.marker([52.0786, -1.0169])
        .addTo(leafletMap.current)
        .bindPopup("Silverstone Circuit")

      const savedTent = localStorage.getItem("tent-location")

      if (savedTent) {
        const location = JSON.parse(savedTent)
        addTentMarker(L, location.latitude, location.longitude)
      }
    }

    loadMap()
  }, [])

  const addTentMarker = (L: any, latitude: number, longitude: number) => {
    if (!leafletMap.current) return

    const tentIcon = L.divIcon({
      html: `
        <div style="
          background:#00e5ff;
          color:#000;
          border-radius:999px;
          height:44px;
          width:44px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          border:2px solid white;
          box-shadow:0 10px 30px rgba(0,229,255,.45);
        ">
          ⛺
        </div>
      `,
      className: "",
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    })

    if (tentMarker.current) {
      tentMarker.current.remove()
    }

    tentMarker.current = L.marker([latitude, longitude], {
      icon: tentIcon,
    })
      .addTo(leafletMap.current)
      .bindPopup("My Tent")
      .openPopup()

    leafletMap.current.setView([latitude, longitude], 17)
  }

  const addUserMarker = (L: any, latitude: number, longitude: number) => {
    if (!leafletMap.current) return

    const userIcon = L.divIcon({
      html: `
        <div style="
          background:#ff2d55;
          color:white;
          border-radius:999px;
          height:42px;
          width:42px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:20px;
          border:3px solid white;
          box-shadow:0 10px 30px rgba(255,45,85,.45);
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

    userMarker.current = L.marker([latitude, longitude], {
      icon: userIcon,
    })
      .addTo(leafletMap.current)
      .bindPopup("You are here")
      .openPopup()

    leafletMap.current.setView([latitude, longitude], 17)
  }

  const showMe = async () => {
    setStatus("Finding your location...")

    if (!navigator.geolocation) {
      setStatus("Location is not supported on this device")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const L = await import("leaflet")

        addUserMarker(
          L,
          position.coords.latitude,
          position.coords.longitude
        )

        setStatus("Showing your current location")
      },
      () => {
        setStatus("Could not get your location. Check location permission.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }

  const pinMyTent = async () => {
    setStatus("Finding your location...")

    if (!navigator.geolocation) {
      setStatus("Location is not supported on this device")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }

        localStorage.setItem("tent-location", JSON.stringify(location))

        const L = await import("leaflet")
        addTentMarker(L, location.latitude, location.longitude)

        setStatus("Tent location saved on this device")
      },
      () => {
        setStatus("Could not get your location. Check location permission.")
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
        Find My Tent
      </h1>

      <p className="text-white/60 mt-2">
        Show yourself on the map and save your tent location.
      </p>

      <section className="glass rounded-[32px] h-[620px] mt-6 overflow-hidden">
        <div ref={mapRef} className="h-full w-full" />
      </section>

      <p className="text-white/60 mt-3 text-sm">
        {status}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <button
          onClick={showMe}
          className="glass rounded-3xl p-5 font-semibold flex items-center justify-center gap-2"
        >
          <LocateFixed />
          Show Me
        </button>

        <button
          onClick={pinMyTent}
          className="bg-pink-500 rounded-3xl p-5 font-semibold flex items-center justify-center gap-2"
        >
          <Tent />
          Pin Tent
        </button>
      </div>

      <button
        onClick={() => {
          if (leafletMap.current) {
            leafletMap.current.setView([52.0786, -1.0169], 15)
          }
        }}
        className="glass rounded-3xl p-5 mt-4 w-full flex items-center justify-center gap-2"
      >
        <Navigation />
        Centre on Silverstone
      </button>

      <section className="glass rounded-3xl p-5 mt-6">
        <div className="flex gap-3">
          <MapPin className="text-cyan-300 shrink-0" />

          <p className="text-white/60">
            Your tent location is saved locally on this device. Your current location updates only when you tap Show Me.
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}