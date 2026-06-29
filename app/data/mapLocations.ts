export type MapLocation = {
  id: string
  name: string
  type:
    | "Gate"
    | "Camping"
    | "Bus"
    | "Toilets"
    | "Water"
    | "First Aid"
    | "Phone Charging"
    | "Food"
    | "Grandstand"
    | "Parking"
    | "Hospitality"
    | "Fan Zone"
  lat: number
  lng: number
}

export const mapLocations: MapLocation[] = [
  // Gates — approximate positions from official map
  { id: "gate-1", name: "Gate 1", type: "Gate", lat: 52.07355, lng: -1.01795 },
  { id: "gate-3", name: "Gate 3", type: "Gate", lat: 52.07425, lng: -1.01665 },
  { id: "gate-5", name: "Gate 5", type: "Gate", lat: 52.07615, lng: -1.02025 },
  { id: "gate-6", name: "Gate 6", type: "Gate", lat: 52.07535, lng: -1.02045 },
  { id: "gate-9", name: "Gate 9", type: "Gate", lat: 52.07635, lng: -1.00375 },
  { id: "gate-10", name: "Gate 10", type: "Gate", lat: 52.08185, lng: -1.00465 },
  { id: "gate-11", name: "Gate 11", type: "Gate", lat: 52.08245, lng: -1.00285 },
  { id: "gate-12", name: "Gate 12", type: "Gate", lat: 52.07285, lng: -1.00655 },
  { id: "gate-14", name: "Gate 14", type: "Gate", lat: 52.07625, lng: -1.03565 },
  { id: "gate-15", name: "Gate 15", type: "Gate", lat: 52.07345, lng: -1.03165 },
  { id: "gate-16", name: "Gate 16", type: "Gate", lat: 52.08115, lng: -1.03525 },
  { id: "gate-19", name: "Gate 19", type: "Gate", lat: 52.07465, lng: -1.03015 },
  { id: "gate-20", name: "Gate 20", type: "Gate", lat: 52.07355, lng: -1.03385 },

  // Campsites
  { id: "woodlands", name: "Silverstone Woodlands Campsite", type: "Camping", lat: 52.07115, lng: -1.00685 },
  { id: "dadford-road", name: "Dadford Road Campsite", type: "Camping", lat: 52.07175, lng: -1.03375 },
  { id: "golf-club", name: "Silverstone Golf Club Campsite", type: "Camping", lat: 52.07015, lng: -1.03085 },
  { id: "cartmel-fields", name: "Cartmel Fields Campsite", type: "Camping", lat: 52.07045, lng: -1.03725 },
  { id: "arden-paddocks", name: "Arden Paddocks Campsite", type: "Camping", lat: 52.07075, lng: -1.04065 },

  // Bus / coach
  { id: "bus-hub-1", name: "Bus Hub 1", type: "Bus", lat: 52.07325, lng: -1.02445 },
  { id: "bus-hub-2", name: "Bus Hub 2", type: "Bus", lat: 52.07315, lng: -1.01995 },
  { id: "coach-park-22", name: "Coach Park 22", type: "Bus", lat: 52.07415, lng: -1.04125 },

  // Parking
  { id: "parking-25-26", name: "Public Parking P25/P26", type: "Parking", lat: 52.08615, lng: -1.03335 },
  { id: "parking-35-36", name: "Parking P35/P36", type: "Parking", lat: 52.07325, lng: -1.01195 },
  { id: "parking-47-48", name: "Parking P47/P48", type: "Parking", lat: 52.08475, lng: -1.00535 },
  { id: "parking-51", name: "Parking P51", type: "Parking", lat: 52.07185, lng: -1.02775 },

  // Grandstands / viewing areas
  { id: "hamilton-a", name: "Hamilton Straight A", type: "Grandstand", lat: 52.07395, lng: -1.01765 },
  { id: "hamilton-b", name: "Hamilton Straight B", type: "Grandstand", lat: 52.07465, lng: -1.01685 },
  { id: "abbey", name: "Abbey Grandstands", type: "Grandstand", lat: 52.07395, lng: -1.01365 },
  { id: "farm-curve", name: "Farm Curve", type: "Grandstand", lat: 52.07905, lng: -1.01985 },
  { id: "village", name: "Village / Loop", type: "Grandstand", lat: 52.08065, lng: -1.02175 },
  { id: "wellington", name: "Wellington Enclosure", type: "Grandstand", lat: 52.08095, lng: -1.02825 },
  { id: "luffield", name: "Luffield", type: "Grandstand", lat: 52.08335, lng: -1.03225 },
  { id: "woodcote", name: "Woodcote", type: "Grandstand", lat: 52.07835, lng: -1.03345 },
  { id: "national-pits", name: "National Pits Straight", type: "Grandstand", lat: 52.07615, lng: -1.03115 },
  { id: "copse", name: "Copse", type: "Grandstand", lat: 52.08505, lng: -1.02725 },
  { id: "becketts", name: "Becketts", type: "Grandstand", lat: 52.08595, lng: -1.01745 },
  { id: "chapel", name: "Chapel", type: "Grandstand", lat: 52.08425, lng: -1.01095 },
  { id: "stowe", name: "Stowe / Vale", type: "Grandstand", lat: 52.07495, lng: -1.00635 },
  { id: "club", name: "Club Corner", type: "Grandstand", lat: 52.07315, lng: -1.01095 },
  { id: "lando-stand", name: "Landostand Area", type: "Grandstand", lat: 52.07285, lng: -1.00695 },

  // Hospitality
  { id: "red-bull", name: "Red Bull Pole Position", type: "Hospitality", lat: 52.07375, lng: -1.01495 },
  { id: "racing-green", name: "The Racing Green", type: "Hospitality", lat: 52.07815, lng: -1.03215 },
  { id: "legends-club", name: "Legends Club", type: "Hospitality", lat: 52.07965, lng: -1.03275 },
  { id: "heritage-club", name: "Heritage Club", type: "Hospitality", lat: 52.08315, lng: -1.02585 },
  { id: "ignition-club", name: "Ignition Club", type: "Hospitality", lat: 52.08535, lng: -1.02545 },
  { id: "octane-terrace", name: "Octane Terrace", type: "Hospitality", lat: 52.07365, lng: -1.01895 },
  { id: "fusion-lounge", name: "Fusion Lounge", type: "Hospitality", lat: 52.08625, lng: -1.01835 },
  { id: "starting-grid", name: "Starting Grid", type: "Hospitality", lat: 52.07395, lng: -1.01625 },

  // Facilities
  { id: "toilets-main-stage", name: "Toilets - Main Stage", type: "Toilets", lat: 52.07915, lng: -1.02595 },
  { id: "toilets-luffield", name: "Toilets - Luffield", type: "Toilets", lat: 52.08295, lng: -1.03385 },
  { id: "toilets-copse", name: "Toilets - Copse", type: "Toilets", lat: 52.08535, lng: -1.02795 },
  { id: "toilets-club", name: "Toilets - Club", type: "Toilets", lat: 52.07345, lng: -1.01095 },
  { id: "toilets-abbey", name: "Toilets - Abbey", type: "Toilets", lat: 52.07425, lng: -1.01455 },

  { id: "water-main-stage", name: "Water Point - Main Stage", type: "Water", lat: 52.07925, lng: -1.02445 },
  { id: "water-luffield", name: "Water Point - Luffield", type: "Water", lat: 52.08265, lng: -1.03275 },
  { id: "water-copse", name: "Water Point - Copse", type: "Water", lat: 52.08485, lng: -1.02625 },
  { id: "water-club", name: "Water Point - Club", type: "Water", lat: 52.07335, lng: -1.01175 },

  { id: "first-aid-main", name: "First Aid - Main Stage", type: "First Aid", lat: 52.07905, lng: -1.02295 },
  { id: "first-aid-copse", name: "First Aid - Copse", type: "First Aid", lat: 52.08445, lng: -1.02545 },
  { id: "first-aid-club", name: "First Aid - Club", type: "First Aid", lat: 52.07325, lng: -1.00995 },

  { id: "charging-main-stage", name: "Information & Phone Charging - Main Stage", type: "Phone Charging", lat: 52.07875, lng: -1.02525 },
  { id: "charging-abbey", name: "Information & Phone Charging - Abbey", type: "Phone Charging", lat: 52.07475, lng: -1.01425 },
  { id: "charging-copse", name: "Information & Phone Charging - Copse", type: "Phone Charging", lat: 52.08475, lng: -1.02695 },

  { id: "food-main-stage", name: "Food & Drink - Main Stage", type: "Food", lat: 52.07945, lng: -1.02485 },
  { id: "food-luffield", name: "Food & Drink - Luffield", type: "Food", lat: 52.08245, lng: -1.03185 },
  { id: "food-club", name: "Food & Drink - Club", type: "Food", lat: 52.07395, lng: -1.01085 },
  { id: "food-village", name: "Food & Drink - Village", type: "Food", lat: 52.08075, lng: -1.02095 },

  // Fan zones / key areas
  { id: "main-stage", name: "Main Stage", type: "Fan Zone", lat: 52.07875, lng: -1.02495 },
  { id: "historic-display", name: "Historic Display & Eddie Jordan Tribute", type: "Fan Zone", lat: 52.07985, lng: -1.01545 },
  { id: "t1-afterparty", name: "T1 Afterparty", type: "Fan Zone", lat: 52.07415, lng: -1.01435 },
  { id: "comedy-club", name: "Comedy Club", type: "Fan Zone", lat: 52.08065, lng: -1.00895 },
]