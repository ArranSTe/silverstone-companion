"use client"

import { useRef, useState } from "react"
import { MapPin, Minus, Plus, RotateCcw } from "lucide-react"

export default function MapPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 })

  const zoomIn = () => {
    setScale((current) => Math.min(current + 0.25, 4))
  }

  const zoomOut = () => {
    setScale((current) => Math.max(current - 0.25, 1))
  }

  const resetMap = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const startDrag = (clientX: number, clientY: number) => {
    setDragging(true)
    setLastPoint({ x: clientX, y: clientY })
  }

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragging) return

    const dx = clientX - lastPoint.x
    const dy = clientY - lastPoint.y

    setPosition((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }))

    setLastPoint({ x: clientX, y: clientY })
  }

  const stopDrag = () => {
    setDragging(false)
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (event.deltaY < 0) {
      setScale((current) => Math.min(current + 0.15, 4))
    } else {
      setScale((current) => Math.max(current - 0.15, 1))
    }
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Circuit guide</p>

        <h1 className="iphone-title">Map</h1>

        <p className="iphone-subtitle">
          Pinch, zoom, drag and move around the official Silverstone map.
        </p>
      </header>

      <section className="iphone-card mb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-cyan-300/20 flex items-center justify-center">
            <MapPin className="text-cyan-200" />
          </div>

          <div>
            <h2 className="text-xl font-black">Official map</h2>
            <p className="text-white/60 text-sm mt-1">
              Use the buttons or drag the map around.
            </p>
          </div>
        </div>
      </section>

      <section className="relative rounded-[32px] overflow-hidden border border-white/10 bg-black/30 shadow-2xl">
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          <button
            onClick={zoomOut}
            className="h-11 w-11 rounded-2xl glass flex items-center justify-center active:scale-95"
            aria-label="Zoom out"
          >
            <Minus size={20} />
          </button>

          <button
            onClick={resetMap}
            className="h-11 w-11 rounded-2xl glass flex items-center justify-center active:scale-95"
            aria-label="Reset map"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={zoomIn}
            className="h-11 w-11 rounded-2xl glass flex items-center justify-center active:scale-95"
            aria-label="Zoom in"
          >
            <Plus size={20} />
          </button>
        </div>

        <div
          ref={containerRef}
          className="relative h-[620px] w-full overflow-hidden touch-none cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={(event) => startDrag(event.clientX, event.clientY)}
          onMouseMove={(event) => moveDrag(event.clientX, event.clientY)}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={(event) => {
            const touch = event.touches[0]
            startDrag(touch.clientX, touch.clientY)
          }}
          onTouchMove={(event) => {
            const touch = event.touches[0]
            moveDrag(touch.clientX, touch.clientY)
          }}
          onTouchEnd={stopDrag}
        >
          <img
            src="/silverstone-official-map.jpg"
            alt="Official Silverstone map"
            draggable={false}
            className="absolute left-1/2 top-1/2 max-w-none select-none"
            style={{
              width: "1050px",
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
              transformOrigin: "center center",
            }}
          />
        </div>
      </section>

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">Map controls</h2>

        <p className="text-white/60 mt-2 leading-relaxed">
          Drag to move around. Use + and - to zoom. Press reset to centre the
          map again.
        </p>
      </section>
    </main>
  )
}