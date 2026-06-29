"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Eye,
  MapPinned,
  Minus,
  Plus,
  RotateCcw,
  Star,
  X,
} from "lucide-react";

type Grandstand = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
};

const CHECKED_GRANDSTANDS_KEY = "silverstone-checked-grandstands";

const bestGrandstands: Grandstand[] = [
  {
    id: "lando",
    name: "Lando Stand",
    location: "Around the Loop / Aintree area",
    description:
      "Great atmosphere and a popular choice for Lando fans. Good for seeing cars through a technical part of the lap.",
    image: "/grandstands/stowe.jpg",
  },
  {
    id: "club-corner",
    name: "Club Corner",
    location: "Final corner / start-finish area",
    description:
      "One of the best overall views. You can see cars coming through the final section and onto the main straight.",
    image: "/grandstands/club-corner.jpg",
  },
  {
    id: "abbey",
    name: "Abbey",
    location: "Turn 1",
    description:
      "Very fast first-corner view with lots of action at the start of the race.",
    image: "/grandstands/abbey.jpg",
  },
  {
    id: "village",
    name: "Village",
    location: "Village corner",
    description:
      "Good for braking-zone action and seeing cars change direction through the slower technical section.",
    image: "/grandstands/village.jpg",
  },
  {
    id: "becketts",
    name: "Becketts",
    location: "Maggotts / Becketts complex",
    description:
      "Brilliant place to see F1 cars changing direction at high speed. Proper wow-factor viewing.",
    image: "/grandstands/becketts.jpg",
  },
  {
    id: "Stirling",
    name: "Striling",
    location: "End of national pits straight",
    description: "Great for overtaking attempts and heavy braking.",
    image: "/grandstands/stowe.jpg",
  },
];

const otherGrandstands: Grandstand[] = [
  {
    id: "hamilton-straight",
    name: "Hamilton Straight",
    location: "Start / finish straight",
    description:
      "Best for the grid, race start, pit lane, podium area and seeing the cars at full speed.",
    image: "/grandstands/hamilton-straight.jpg",
  },
  {
    id: "farm-curve",
    name: "Farm Curve",
    location: "Between Abbey and Village",
    description:
      "Good speed and flow, with cars heading towards the tighter Village section.",
    image: "/grandstands/farm-curve.jpg",
  },
  {
    id: "the-loop",
    name: "The Loop",
    location: "Loop section",
    description:
      "Slower technical corner where cars bunch up. Good for seeing car control and close battles.",
    image: "/grandstands/the-loop.jpg",
  },
  {
    id: "national",
    name: "National Pits Straight",
    location: "Old Pits",
    description: "Good place to see cars accelerate hard",
    image: "/grandstands/national.jpg",
  },
  {
    id: "brooklands",
    name: "Brooklands",
    location: "End of Wellington Straight",
    description:
      "Strong overtaking spot with heavy braking at the end of the straight.",
    image: "/grandstands/brooklands.jpg",
  },
  {
    id: "luffield",
    name: "Luffield",
    location: "Luffield corner",
    description:
      "Long corner with a good view of cars through a slower, more visible section.",
    image: "/grandstands/luffield.jpg",
  },
  {
    id: "woodcote",
    name: "Woodcote",
    location: "Before Hamilton Straight",
    description:
      "Good for seeing cars exit Luffield and build speed towards the main straight.",
    image: "/grandstands/woodcote.jpg",
  },
  {
    id: "copse",
    name: "Copse",
    location: "Copse corner",
    description: "Very fast corner. Great for speed, noise and commitment.",
    image: "/grandstands/copse.jpg",
  },
  {
    id: "chapel",
    name: "Chapel",
    location: "Exit of Becketts",
    description:
      "Good for watching cars fire onto Hangar Straight after the fast direction changes.",
    image: "/grandstands/chapel.jpg",
  },
  {
    id: "vale",
    name: "Vale",
    location: "Before Club corner",
    description: "Heavy braking and late-race action before cars head into Club.",
    image: "/grandstands/vale.jpg",
  },
];

function GrandstandCard({
  grandstand,
  checked,
  onToggle,
  onView,
}: {
  grandstand: Grandstand;
  checked: boolean;
  onToggle: () => void;
  onView: () => void;
}) {
  return (
    <article className="iphone-card">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <MapPinned className="text-cyan-200" size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-black">{grandstand.name}</h2>

          <p className="text-cyan-200 font-bold mt-1">
            {grandstand.location}
          </p>

          <p className="text-white/60 mt-3 leading-relaxed">
            {grandstand.description}
          </p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onToggle}
              className={`h-11 rounded-full px-4 font-black flex items-center gap-2 transition active:scale-95 ${
                checked
                  ? "bg-green-300 text-black"
                  : "bg-white/10 text-white border border-white/10"
              }`}
            >
              <Check size={18} />
              {checked ? "Checked" : "Tick"}
            </button>

            <button
              type="button"
              onClick={onView}
              className="h-11 rounded-full px-4 font-black flex items-center gap-2 bg-cyan-300 text-black transition active:scale-95"
            >
              <Eye size={18} />
              View
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function GrandstandsPage() {
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [mapDragging, setMapDragging] = useState(false);
  const [mapLastPoint, setMapLastPoint] = useState({ x: 0, y: 0 });

  const [checkedGrandstands, setCheckedGrandstands] = useState<string[]>([]);
  const [selectedGrandstand, setSelectedGrandstand] =
    useState<Grandstand | null>(null);

  const mapLastTouchDistance = useRef<number | null>(null);
  const mapLastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(CHECKED_GRANDSTANDS_KEY);

    if (saved) {
      try {
        setCheckedGrandstands(JSON.parse(saved));
      } catch {
        localStorage.removeItem(CHECKED_GRANDSTANDS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      CHECKED_GRANDSTANDS_KEY,
      JSON.stringify(checkedGrandstands)
    );
  }, [checkedGrandstands]);

  const zoomMapIn = () => {
    setMapScale((current) => Math.min(current + 0.25, 4));
  };

  const zoomMapOut = () => {
    setMapScale((current) => Math.max(current - 0.25, 0.35));
  };

  const resetMap = () => {
    setMapScale(1);
    setMapPosition({ x: 0, y: 0 });
  };

  const getMapDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getMapCenter = (touches: React.TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  const handleMapMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setMapDragging(true);
    setMapLastPoint({ x: event.clientX, y: event.clientY });
  };

  const handleMapMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapDragging) return;

    const dx = event.clientX - mapLastPoint.x;
    const dy = event.clientY - mapLastPoint.y;

    setMapPosition((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }));

    setMapLastPoint({ x: event.clientX, y: event.clientY });
  };

  const handleMapMouseUp = () => {
    setMapDragging(false);
  };

  const handleMapTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1) {
      setMapDragging(true);
      setMapLastPoint({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    }

    if (event.touches.length === 2) {
      setMapDragging(false);
      mapLastTouchDistance.current = getMapDistance(event.touches);
      mapLastTouchCenter.current = getMapCenter(event.touches);
    }
  };

  const handleMapTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.touches.length === 1 && mapDragging) {
      const touch = event.touches[0];

      const dx = touch.clientX - mapLastPoint.x;
      const dy = touch.clientY - mapLastPoint.y;

      setMapPosition((current) => ({
        x: current.x + dx,
        y: current.y + dy,
      }));

      setMapLastPoint({
        x: touch.clientX,
        y: touch.clientY,
      });
    }

    if (event.touches.length === 2) {
      const newDistance = getMapDistance(event.touches);
      const newCenter = getMapCenter(event.touches);

      if (mapLastTouchDistance.current && mapLastTouchCenter.current) {
        const zoomChange = newDistance / mapLastTouchDistance.current;

        setMapScale((currentScale) => {
          return Math.min(Math.max(currentScale * zoomChange, 0.35), 4);
        });

        const dx = newCenter.x - mapLastTouchCenter.current.x;
        const dy = newCenter.y - mapLastTouchCenter.current.y;

        setMapPosition((current) => ({
          x: current.x + dx,
          y: current.y + dy,
        }));
      }

      mapLastTouchDistance.current = newDistance;
      mapLastTouchCenter.current = newCenter;
    }
  };

  const handleMapTouchEnd = () => {
    setMapDragging(false);
    mapLastTouchDistance.current = null;
    mapLastTouchCenter.current = null;
  };

  const openGrandstandView = (grandstand: Grandstand) => {
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  setSelectedGrandstand(grandstand);
};


  const toggleGrandstand = (grandstandId: string) => {
    setCheckedGrandstands((current) => {
      if (current.includes(grandstandId)) {
        return current.filter((id) => id !== grandstandId);
      }

      return [...current, grandstandId];
    });
  };

  return (
    <main className="iphone-page text-white">
      <header className="iphone-header">
        <p className="iphone-eyebrow">Viewing spots</p>

        <h1 className="iphone-title">Grandstands</h1>

        <p className="iphone-subtitle">
          Use the map to find grandstands, tick off the ones you want to visit,
          and open view photos before choosing where to sit.
        </p>
      </header>

      <section className="iphone-card mb-5">
        <div className="mb-4">
          <p className="iphone-eyebrow">Circuit map</p>

          <h2 className="text-2xl font-black">Grandstand Map</h2>

          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Pinch with two fingers to zoom, or drag the map around.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40">
          <div
            className="h-[420px] w-full cursor-grab overflow-hidden touch-none active:cursor-grabbing bg-neutral-900"
            onMouseDown={handleMapMouseDown}
            onMouseMove={handleMapMouseMove}
            onMouseUp={handleMapMouseUp}
            onMouseLeave={handleMapMouseUp}
            onTouchStart={handleMapTouchStart}
            onTouchMove={handleMapTouchMove}
            onTouchEnd={handleMapTouchEnd}
          >
            <img
              src="/stand-map.jpg"
              alt="Silverstone grandstand map"
              draggable={false}
              className="h-full w-full select-none object-contain"
              style={{
                transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`,
                transformOrigin: "center center",
                transition: mapDragging ? "none" : "transform 0.08s ease-out",
              }}
            />
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              type="button"
              onClick={zoomMapOut}
              className="rounded-full bg-white/90 p-3 text-black shadow-lg"
              aria-label="Zoom out"
            >
              <Minus size={20} />
            </button>

            <button
              type="button"
              onClick={resetMap}
              className="rounded-full bg-white/90 p-3 text-black shadow-lg"
              aria-label="Reset map"
            >
              <RotateCcw size={20} />
            </button>

            <button
              type="button"
              onClick={zoomMapIn}
              className="rounded-full bg-white/90 p-3 text-black shadow-lg"
              aria-label="Zoom in"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-11 w-11 rounded-2xl bg-yellow-300/20 flex items-center justify-center">
            <Star className="text-yellow-200" size={23} />
          </div>

          <div>
            <p className="iphone-eyebrow">Top picks</p>
            <h2 className="text-2xl font-black">Best Grandstands</h2>
          </div>
        </div>

        <div className="space-y-4">
          {bestGrandstands.map((grandstand) => (
            <GrandstandCard
              key={grandstand.id}
              grandstand={grandstand}
              checked={checkedGrandstands.includes(grandstand.id)}
              onToggle={() => toggleGrandstand(grandstand.id)}
              onView={() => openGrandstandView(grandstand)}
            />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <div className="mb-4">
          <p className="iphone-eyebrow">More viewing spots</p>
          <h2 className="text-2xl font-black">Other Grandstands</h2>
        </div>

        <div className="space-y-4">
          {otherGrandstands.map((grandstand) => (
            <GrandstandCard
              key={grandstand.id}
              grandstand={grandstand}
              checked={checkedGrandstands.includes(grandstand.id)}
              onToggle={() => toggleGrandstand(grandstand.id)}
              onView={() => openGrandstandView(grandstand)}
            />
          ))}
        </div>
      </section>
{selectedGrandstand && (
  <div className="fixed inset-0 z-[9999] bg-black/95 overflow-y-auto">
    <div className="min-h-screen flex items-start justify-center px-4 pt-[calc(env(safe-area-inset-top)+18px)] pb-6">
      <div className="relative w-full max-w-xl rounded-[32px] bg-black/80 p-4 pt-16 border border-white/10">
        <button
          type="button"
          onClick={() => setSelectedGrandstand(null)}
          className="absolute right-4 top-4 z-[10000] h-11 w-11 rounded-full bg-white/15 text-white flex items-center justify-center active:scale-95 border border-white/10"
          aria-label="Close grandstand view"
        >
          <X size={25} />
        </button>

        <div className="mb-4 pr-12">
          <p className="text-cyan-200 text-sm font-black">
            {selectedGrandstand.location}
          </p>

          <h2 className="text-3xl font-black">
            {selectedGrandstand.name}
          </h2>
        </div>

        <img
          src={selectedGrandstand.image}
          alt={`${selectedGrandstand.name} view`}
          className="max-h-[60vh] w-full rounded-3xl object-contain bg-neutral-900"
        />

        <p className="mt-4 text-white/60 leading-relaxed">
          {selectedGrandstand.description}
        </p>
      </div>
    </div>
  </div>
)}
    </main>
  );
}