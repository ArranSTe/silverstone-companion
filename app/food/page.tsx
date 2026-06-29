"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  Clock,
  Coffee,
  Leaf,
  Minus,
  Pizza,
  Plus,
  RotateCcw,
  Sandwich,
  Utensils,
} from "lucide-react";

const foodItems = [
  {
    title: "Quick snacks",
    description: "Best for short gaps between sessions.",
    icon: Sandwich,
  },
  {
    title: "Hot food",
    description: "Use quieter times to avoid the biggest queues.",
    icon: Pizza,
  },
  {
    title: "Coffee",
    description: "Useful before morning practice or long travel days.",
    icon: Coffee,
  },
  {
    title: "Vegetarian / vegan",
    description: "Look for marked options before joining a long queue.",
    icon: Leaf,
  },
];

const vendors = [
  {
    name: "Fan Zone Food Village",
    type: "Mixed food vendors",
    price: "£–££",
    open: "Expected during circuit opening hours",
    note: "Exact 2026 vendor list and hours should be updated from the official event map when released.",
  },
  {
    name: "Silverstone Woodlands Food & Bar",
    type: "Camping food / bar",
    price: "£–££",
    open: "Camping/event dependent",
    note: "Woodlands usually has food, bar and entertainment facilities for F1 camping.",
  },
  {
    name: "Trackside Coffee Points",
    type: "Coffee / breakfast",
    price: "£",
    open: "Usually mornings and daytime",
    note: "Replace with official vendor names once Silverstone publishes the live map.",
  },
  {
    name: "Box Box Pizza",
    type: "Pizza / restaurant",
    price: "££",
    open: "Hospitality access / event dependent",
    note: "Only use this if your ticket or area gives access.",
  },
];

export default function FoodPage() {
  const [foodMapScale, setFoodMapScale] = useState(1);
  const [foodMapPosition, setFoodMapPosition] = useState({ x: 0, y: 0 });
  const [foodMapDragging, setFoodMapDragging] = useState(false);
  const [foodMapLastPoint, setFoodMapLastPoint] = useState({ x: 0, y: 0 });

  const foodMapLastTouchDistance = useRef<number | null>(null);
  const foodMapLastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  const zoomFoodMapIn = () => {
    setFoodMapScale((current) => Math.min(current + 0.25, 4));
  };

  const zoomFoodMapOut = () => {
    setFoodMapScale((current) => Math.max(current - 0.25, 0.35));
  };

  const resetFoodMap = () => {
    setFoodMapScale(1);
    setFoodMapPosition({ x: 0, y: 0 });
  };

  const getFoodMapDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getFoodMapCenter = (touches: React.TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  const handleFoodMapMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setFoodMapDragging(true);
    setFoodMapLastPoint({ x: event.clientX, y: event.clientY });
  };

  const handleFoodMapMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!foodMapDragging) return;

    const dx = event.clientX - foodMapLastPoint.x;
    const dy = event.clientY - foodMapLastPoint.y;

    setFoodMapPosition((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }));

    setFoodMapLastPoint({ x: event.clientX, y: event.clientY });
  };

  const handleFoodMapMouseUp = () => {
    setFoodMapDragging(false);
  };

  const handleFoodMapTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      setFoodMapDragging(true);
      setFoodMapLastPoint({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    }

    if (event.touches.length === 2) {
      setFoodMapDragging(false);
      foodMapLastTouchDistance.current = getFoodMapDistance(event.touches);
      foodMapLastTouchCenter.current = getFoodMapCenter(event.touches);
    }
  };

  const handleFoodMapTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.touches.length === 1 && foodMapDragging) {
      const touch = event.touches[0];

      const dx = touch.clientX - foodMapLastPoint.x;
      const dy = touch.clientY - foodMapLastPoint.y;

      setFoodMapPosition((current) => ({
        x: current.x + dx,
        y: current.y + dy,
      }));

      setFoodMapLastPoint({
        x: touch.clientX,
        y: touch.clientY,
      });
    }

    if (event.touches.length === 2) {
      const newDistance = getFoodMapDistance(event.touches);
      const newCenter = getFoodMapCenter(event.touches);

      if (foodMapLastTouchDistance.current && foodMapLastTouchCenter.current) {
        const zoomChange = newDistance / foodMapLastTouchDistance.current;

        setFoodMapScale((currentScale) => {
          return Math.min(Math.max(currentScale * zoomChange, 0.35), 4);
        });

        const dx = newCenter.x - foodMapLastTouchCenter.current.x;
        const dy = newCenter.y - foodMapLastTouchCenter.current.y;

        setFoodMapPosition((current) => ({
          x: current.x + dx,
          y: current.y + dy,
        }));
      }

      foodMapLastTouchDistance.current = newDistance;
      foodMapLastTouchCenter.current = newCenter;
    }
  };

  const handleFoodMapTouchEnd = () => {
    setFoodMapDragging(false);
    foodMapLastTouchDistance.current = null;
    foodMapLastTouchCenter.current = null;
  };

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Food stops</p>

        <h1 className="iphone-title">Food & Drink</h1>

        <p className="iphone-subtitle">
          Keep track of what to look for when you need food, coffee or a quick
          snack.
        </p>
      </header>

      <section className="rounded-[32px] bg-gradient-to-br from-orange-300/30 to-pink-300/20 border border-white/10 p-5 shadow-xl mb-5">
        <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
          <Utensils size={30} />
        </div>

        <h2 className="text-[30px] leading-[32px] font-black">
          Avoid peak queues
        </h2>

        <p className="text-white/70 mt-3 leading-relaxed">
          Try eating just before or just after the biggest track sessions.
          Everyone moves at the same time.
        </p>
      </section>

      <section className="iphone-card mb-5 bg-yellow-400/10">
        <div className="flex gap-3">
          <div className="h-11 w-11 rounded-2xl bg-yellow-300/20 flex items-center justify-center shrink-0">
            <AlertCircle className="text-yellow-200" size={24} />
          </div>

          <div>
            <h2 className="text-xl font-black">Silverstone Is Card Only!</h2>

            <p className="text-white/60 mt-2 leading-relaxed">
              Most Silverstone food is card only but still carry cash just
              incase.
            </p>
          </div>
        </div>
      </section>

      <section className="iphone-card mb-5">
        <div className="mb-4">
          <p className="iphone-eyebrow">Food map</p>

          <h2 className="text-2xl font-black">Food & Drink Map</h2>

          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Pinch with two fingers to zoom, or drag the map around.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40">
          <div
            className="h-[420px] w-full cursor-grab overflow-hidden touch-none active:cursor-grabbing bg-neutral-900"
            onMouseDown={handleFoodMapMouseDown}
            onMouseMove={handleFoodMapMouseMove}
            onMouseUp={handleFoodMapMouseUp}
            onMouseLeave={handleFoodMapMouseUp}
            onTouchStart={handleFoodMapTouchStart}
            onTouchMove={handleFoodMapTouchMove}
            onTouchEnd={handleFoodMapTouchEnd}
          >
            <img
              src="/silverstone-official-map.png"
              alt="Silverstone food and drink map"
              draggable={false}
              className="h-full w-full select-none object-contain"
              style={{
                transform: `translate(${foodMapPosition.x}px, ${foodMapPosition.y}px) scale(${foodMapScale})`,
                transformOrigin: "center center",
                transition: foodMapDragging
                  ? "none"
                  : "transform 0.08s ease-out",
              }}
            />
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={zoomFoodMapOut}
              className="rounded-full bg-white/90 p-3 text-black shadow-lg"
              aria-label="Zoom out"
            >
              <Minus size={20} />
            </button>

            <button
              onClick={resetFoodMap}
              className="rounded-full bg-white/90 p-3 text-black shadow-lg"
              aria-label="Reset map"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={zoomFoodMapIn}
              className="rounded-full bg-white/90 p-3 text-black shadow-lg"
              aria-label="Zoom in"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="iphone-grid">
        {foodItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="iphone-small-card">
              <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                <Icon className="text-cyan-200" size={24} />
              </div>

              <h2 className="text-lg font-black">{item.title}</h2>

              <p className="text-white/60 text-sm mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">Known food areas</h2>

        <p className="text-white/60 mt-2 leading-relaxed">
          Use the map above to find the nearest food and drink areas around the
          circuit.
        </p>
      </section>

      <section className="space-y-4 mt-5">
        {vendors.map((vendor) => (
          <div key={vendor.name} className="iphone-card">
            <h2 className="text-2xl font-black">{vendor.name}</h2>

            <p className="text-white/60 mt-1">
              {vendor.type} • {vendor.price}
            </p>

            <p className="text-cyan-200 mt-3 flex items-center gap-2 font-bold">
              <Clock size={16} />
              {vendor.open}
            </p>

            <p className="text-white/60 mt-3 leading-relaxed">
              {vendor.note}
            </p>
          </div>
        ))}
      </section>

      <section className="iphone-card mt-5">
        <h2 className="text-xl font-black">Useful tip</h2>

        <p className="text-white/60 mt-2 leading-relaxed">
          Carry a refillable water bottle and a couple of emergency snacks. It
          saves money and queue stress.
        </p>
      </section>
    </main>
  );
}