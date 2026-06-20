"use client"

import { useEffect, useMemo, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import { LocateFixed, MapPin, Save } from "lucide-react"

type LocationPoint = {
  lat: number
  lng: number
}

function FlyToLocation({ location }: { location: LocationPoint | null }) {
  const map = useMap()

  useEffect(() => {
    if (!location) return

    map.flyTo([location.lat, location.lng], 17, {
      duration: 1,
    })
  }, [location, map])

  return null
}

export default function TentMapClient() {
  const [currentLocation, setCurrentLocation] = useState<LocationPoint | null>(
    null
  )
  const [tentLocation, setTentLocation] = useState<LocationPoint | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [locationError, setLocationError] = useState("")
  const [mapReady, setMapReady] = useState(false)

  const userIcon = useMemo(() => {
    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #67e8f9;
          border: 4px solid white;
          box-shadow: 0 0 0 8px rgba(103, 232, 249, 0.25), 0 8px 24px rgba(0,0,0,0.45);
        "></div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    })
  }, [])

  const tentIcon = useMemo(() => {
    return L.divIcon({
      className: "",
      html: `
        <div style="
          transform: translate(-50%, -100%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 18px 18px 18px 4px;
          background: #22c55e;
          border: 3px solid white;
          box-shadow: 0 12px 30px rgba(0,0,0,0.45);
          color: white;
          font-size: 24px;
          font-weight: 900;
        ">⛺</div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 42],
    })
  }, [])

  useEffect(() => {
    const savedTent = localStorage.getItem("silverstone-tent-location")

    if (savedTent) {
      try {
        setTentLocation(JSON.parse(savedTent))
      } catch {
        localStorage.removeItem("silverstone-tent-location")
      }
    }

    if (!navigator.geolocation) {
      setLocationError("GPS is not supported on this device.")
      setMapReady(true)
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })

        setAccuracy(position.coords.accuracy)
        setLocationError("")
        setMapReady(true)
      },
      () => {
        setLocationError(
          "Location permission is blocked. Allow location access to see yourself on the map."
        )
        setMapReady(true)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  const saveTentLocation = () => {
    if (!currentLocation) {
      alert("I cannot find your current location yet. Check location permission and try again.")
      return
    }

    const confirmChange = confirm(
      "Do you really want to change your tent location?"
    )

    if (!confirmChange) return

    localStorage.setItem(
      "silverstone-tent-location",
      JSON.stringify(currentLocation)
    )

    setTentLocation(currentLocation)

    alert("Tent location saved.")
  }

  const centreOnMe = () => {
    if (!currentLocation) {
      alert("I cannot find your current location yet.")
      return
    }

    setCurrentLocation({ ...currentLocation })
  }

  const startPosition: [number, number] = currentLocation
    ? [currentLocation.lat, currentLocation.lng]
    : tentLocation
    ? [tentLocation.lat, tentLocation.lng]
    : [52.0786, -1.0169]

  return (
    <div className="space-y-5">
      <section className="iphone-card">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center shrink-0">
            <MapPin className="text-cyan-200" />
          </div>

          <div>
            <h2 className="text-xl font-black">Find my tent</h2>

            <p className="text-white/60 mt-1 leading-relaxed">
              Your blue dot shows where you are now. Save your tent location
              when you are standing at your tent.
            </p>
          </div>
        </div>
      </section>

      {locationError && (
        <section className="iphone-card bg-yellow-400/10">
          <p className="text-yellow-100 font-bold">Location issue</p>
          <p className="text-white/60 mt-2">{locationError}</p>
        </section>
      )}

      <section className="relative overflow-hidden rounded-[32px] border border-white/10 shadow-2xl bg-black/30">
        <div className="absolute left-3 right-3 top-3 z-[1000] flex gap-2">
          <button
            onClick={saveTentLocation}
            className="flex-1 h-12 rounded-2xl bg-cyan-300 text-black font-black flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <Save size={18} />
            Save my tent location
          </button>

          <button
            onClick={centreOnMe}
            className="h-12 w-12 rounded-2xl glass flex items-center justify-center active:scale-95"
            aria-label="Centre on me"
          >
            <LocateFixed size={21} />
          </button>
        </div>

        <div className="h-[620px] w-full">
          {mapReady && (
            <MapContainer
              center={startPosition}
              zoom={0}
              scrollWheelZoom={true}
              className="h-full w-full z-0"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FlyToLocation location={currentLocation} />

              {currentLocation && (
                <>
                  <Marker
                    position={[currentLocation.lat, currentLocation.lng]}
                    icon={userIcon}
                  >
                    <Popup>You are here</Popup>
                  </Marker>

                  {accuracy && (
                    <Circle
                      center={[currentLocation.lat, currentLocation.lng]}
                      radius={accuracy}
                      pathOptions={{
                        color: "#67e8f9",
                        fillColor: "#67e8f9",
                        fillOpacity: 0.12,
                      }}
                    />
                  )}
                </>
              )}

              {tentLocation && (
                <Marker
                  position={[tentLocation.lat, tentLocation.lng]}
                  icon={tentIcon}
                >
                  <Popup>Your saved tent location</Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </div>
      </section>

      <section className="iphone-card">
        <h2 className="text-xl font-black">How to use it</h2>

        <p className="text-white/60 mt-2 leading-relaxed">
          Stand beside your tent, tap “Save my tent location”, then confirm.
          The green tent marker will stay saved even if you close the app.
        </p>

        {tentLocation && (
          <p className="text-cyan-200 mt-3 text-sm font-bold">
            Tent saved: {tentLocation.lat.toFixed(6)},{" "}
            {tentLocation.lng.toFixed(6)}
          </p>
        )}
      </section>
    </div>
  )
}