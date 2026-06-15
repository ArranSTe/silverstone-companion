import BottomNav from "../components/BottomNav"

const cards = [
  { title: "Quiet Hours", text: "Keep noise low between 11PM and 7AM." },
  { title: "Generator Rules", text: "Use only in permitted areas and never inside tents." },
  { title: "Morning Checklist", text: "Charge phone, refill water, check weather, pack waterproofs." },
  { title: "Night Checklist", text: "Secure tent, save torch location, close food bags, check power bank." },
  { title: "Ice & Water", text: "Water refill points are available across the campsite." },
  { title: "Camping Tip", text: "Take a photo of your tent location and nearby landmarks." },
]

export default function CampingPage() {
  return (
    <main className="min-h-screen p-6 pb-32">
      <h1 className="text-4xl font-bold">Camping Hub</h1>
      <p className="text-white/60 mt-2">Rules, reminders and campsite survival tips</p>

      <div className="glass rounded-3xl p-6 mt-6">
        <p className="text-cyan-300 text-sm">Tonight</p>
        <h2 className="text-2xl font-bold mt-1">High winds overnight</h2>
        <p className="text-white/60 mt-2">
          Secure guy ropes, chairs and anything lightweight before heading out.
        </p>
      </div>

      <div className="space-y-4 mt-6">
        {cards.map((card) => (
          <div key={card.title} className="glass rounded-3xl p-5">
            <h2 className="text-xl font-bold">{card.title}</h2>
            <p className="text-white/60 mt-2">{card.text}</p>
          </div>
        ))}
      </div>

      <BottomNav />
    </main>
  )
}