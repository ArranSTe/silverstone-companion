"use client"

<<<<<<< HEAD
import { useEffect, useState } from "react"
import BottomNav from "../components/BottomNav"
import { MapPin, Navigation, Trash2 } from "lucide-react"

type TentLocation = {
  label: string
  note: string
  savedAt: string
}

export default function TentMapPage() {
  const [label, setLabel] = useState("")
  const [note, setNote] = useState("")
  const [tentLocation, setTentLocation] = useState<TentLocation | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("silverstone-tent-location")

    if (saved) {
      setTentLocation(JSON.parse(saved))
    }
  }, [])

  const saveTentLocation = () => {
    const newLocation: TentLocation = {
      label: label.trim() || "My tent",
      note: note.trim(),
      savedAt: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setTentLocation(newLocation)
    localStorage.setItem("silverstone-tent-location", JSON.stringify(newLocation))
    setLabel("")
    setNote("")
  }

  const clearTentLocation = () => {
    setTentLocation(null)
    localStorage.removeItem("silverstone-tent-location")
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Camping helper</p>

        <h1 className="iphone-title">
          Find My Tent
        </h1>

        <p className="iphone-subtitle">
          Save a simple description of where your tent is so you can find it after a long day.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-green-300/25 to-cyan-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <MapPin size={30} />
        </div>

        <h2 className="text-[30px] leading-[32px] font-black">
          Tent location
        </h2>

        {tentLocation ? (
          <div className="mt-4">
            <p className="text-cyan-200 font-black text-xl">
              {tentLocation.label}
            </p>

            {tentLocation.note && (
              <p className="text-white/70 mt-2 leading-relaxed">
                {tentLocation.note}
              </p>
            )}

            <p className="text-white/50 text-sm mt-3">
              Saved {tentLocation.savedAt}
            </p>
          </div>
        ) : (
          <p className="text-white/70 mt-3 leading-relaxed">
            No tent location saved yet.
          </p>
        )}
      </section>

      <section className="iphone-card">
        <h2 className="text-xl font-black">
          Save location note
        </h2>

        <input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Example: Blue tent near row C"
          className="mt-4 w-full h-13 rounded-2xl bg-white/10 border border-white/10 px-4 outline-none placeholder:text-white/40"
        />

        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Example: 3 rows behind the burger van, near the red flag..."
          className="mt-3 w-full min-h-32 rounded-2xl bg-white/10 border border-white/10 p-4 outline-none resize-none placeholder:text-white/40"
        />

        <button
          onClick={saveTentLocation}
          className="mt-4 w-full min-h-[54px] rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
        >
          <Navigation size={20} />
          Save Tent Location
        </button>

        {tentLocation && (
          <button
            onClick={clearTentLocation}
            className="mt-3 w-full min-h-[54px] rounded-2xl bg-red-400/15 text-red-200 font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <Trash2 size={20} />
            Clear Location
          </button>
        )}
=======
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
>>>>>>> b7fdf86d610850e9c506c11bbbcc14d0596478e1
      </section>

      <BottomNav />
    </main>
  )
}