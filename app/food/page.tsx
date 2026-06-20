"use client";

import {
  AlertCircle,
  Clock,
  Coffee,
  Leaf,
  Pizza,
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
            <h2 className="text-xl font-black">Official times pending</h2>

            <p className="text-white/60 mt-2 leading-relaxed">
              The exact public food vendor list and opening times should be
              updated from the official Silverstone event map closer to the
              weekend.
            </p>
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
          These are useful placeholders for planning. We can update them with
          exact 2026 vendor names and opening times later.
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