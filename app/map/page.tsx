"use client"

import { useRef, useState } from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"

export default function MapPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 })

  const lastTouchDistance = useRef<number | null>(null)
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null)

  const zoomIn = () => {
    setScale((current) => Math.min(current + 0.25, 4))
  }

  const zoomOut = () => {
    setScale((current) => Math.max(current - 0.25, 0.35))
  }

  const resetMap = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const getCenter = (touches: React.TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true)
    setLastPoint({ x: event.clientX, y: event.clientY })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return

    const dx = event.clientX - lastPoint.x
    const dy = event.clientY - lastPoint.y

    setPosition((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }))

    setLastPoint({ x: event.clientX, y: event.clientY })
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      setDragging(true)
      setLastPoint({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      })
    }

    if (event.touches.length === 2) {
      setDragging(false)
      lastTouchDistance.current = getDistance(event.touches)
      lastTouchCenter.current = getCenter(event.touches)
    }
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (event.touches.length === 1 && dragging) {
      const touch = event.touches[0]

      const dx = touch.clientX - lastPoint.x
      const dy = touch.clientY - lastPoint.y

      setPosition((current) => ({
        x: current.x + dx,
        y: current.y + dy,
      }))

      setLastPoint({
        x: touch.clientX,
        y: touch.clientY,
      })
    }

    if (event.touches.length === 2) {
      const newDistance = getDistance(event.touches)
      const newCenter = getCenter(event.touches)

      if (lastTouchDistance.current && lastTouchCenter.current) {
        const zoomChange = newDistance / lastTouchDistance.current

        setScale((currentScale) => {
          const newScale = Math.min(Math.max(currentScale * zoomChange, 0.35), 4)
          return newScale
        })

        const dx = newCenter.x - lastTouchCenter.current.x
        const dy = newCenter.y - lastTouchCenter.current.y

        setPosition((current) => ({
          x: current.x + dx,
          y: current.y + dy,
        }))
      }

      lastTouchDistance.current = newDistance
      lastTouchCenter.current = newCenter
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
    lastTouchDistance.current = null
    lastTouchCenter.current = null
  }

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Circuit map</p>
        <h1 className="iphone-title">Silverstone Map</h1>
        <p className="iphone-subtitle">
          Pinch with two fingers to zoom, or drag to move around.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40">
        <div
          ref={containerRef}
          className="h-[620px] w-full cursor-grab overflow-hidden touch-none active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
            <img
              src="/silverstone-official-map.png"
              alt="Silverstone official map"
              draggable={false}
              className="h-full w-full select-none object-contain"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 0.08s ease-out",
              }}
            />
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={zoomOut}
            className="rounded-full bg-white/90 p-3 text-black shadow-lg"
            aria-label="Zoom out"
          >
            <Minus size={20} />
          </button>

          <button
            onClick={resetMap}
            className="rounded-full bg-white/90 p-3 text-black shadow-lg"
            aria-label="Reset map"
          >
            <RotateCcw size={20} />
          </button>

          <button
            onClick={zoomIn}
            className="rounded-full bg-white/90 p-3 text-black shadow-lg"
            aria-label="Zoom in"
          >
            <Plus size={20} />
          </button>
        </div>
      </section>
    </main>
  )
}