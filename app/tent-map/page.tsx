"use client"

import dynamic from "next/dynamic"
import { Flag, LocateFixed, MapPin, Save } from "lucide-react"

const TentMapClient = dynamic(() => import("../components/TentMapClient"), {
  ssr: false,
})

export default function TentMapPage() {
  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Camping helper</p>

        <h1 className="iphone-title">Find My Tent</h1>

        <p className="iphone-subtitle">
          Save your tent spot and use the live map to find your way back.
        </p>
      </header>

      <TentMapClient />
    </main>
  )
}