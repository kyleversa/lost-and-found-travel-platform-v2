import type { FoundDestination } from "@/lib/types";

export const foundDestinations: FoundDestination[] = [
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    image: "/images/paris.webp",
    tagline: "Midnight walks, morning pastries, and frames worth keeping.",
    visitedOn: "May 2024",
    journal:
      "Paris stopped being a postcard the night we got lost in Le Marais after wrap. I stopped chasing landmarks and started chasing light, narrow streets, wine bars, the kind of ambient sound you can't fake in post.",
    tripRecap:
      "Three-day trip: one museum walkthrough, one food crawl, one golden-hour Seine sequence. Posted a 90-second reel, two carousel edits, and a long-form journal piece. Would absolutely revisit in autumn.",
    wouldReturn: true,
    highlights: [
      "Sunrise Pont Neuf sequence, no tourists, pure gold light",
      "Three-hour lunch that became unplanned candid moments gold",
      "Gallery hopping in the 11th for texture and colour stories",
    ],
    hiddenGems: [
      {
        name: "Le Comptoir Général",
        category: "experience",
        note: "Eclectic bar energy along Canal Saint-Martin, ideal for nightlife cutaways.",
        address: "84 Quai de Jemmapes",
      },
      {
        name: "Du Pain et des Idées",
        category: "restaurant",
        note: "Pistachio escargot pastry, grab fast, eat faster.",
        address: "34 Rue Yves Toudic",
      },
    ],
    shootDays: [
      {
        day: 1,
        label: "Arrival & golden hour",
        blocks: [
          {
            time: "06:30",
            title: "Pont Neuf sunrise visit",
            category: "shoot",
            note: "Tripod, wide lens, 20 minutes of usable light.",
            location: "Pont Neuf",
          },
          {
            time: "12:30",
            title: "Marche lunch candid moments",
            category: "food",
            note: "Handheld market textures + sit-down interview bite.",
            location: "Le Marais",
          },
        ],
      },
    ],
    ratings: {
      hospitality: 4,
      walkability: 5,
      adventure: 3,
      contentPotential: 5,
    },
    books: [
      {
        title: "The Only Street in Paris",
        author: "Elaine Sciolino",
        tags: ["Neighborhood deep dive", "On-trip read"],
        note: "Still on the shelf, a reminder of why Le Marais worked on camera.",
      },
    ],
    media: [
      {
        title: "Midnight in Paris",
        creator: "Woody Allen",
        type: "Film",
        year: "2011",
        tags: ["Mood reference", "Post-trip rewatch"],
      },
    ],
    mapPins: [
      { name: "Pont Neuf", lat: 48.8566, lng: 2.3412, category: "experience" },
      { name: "Le Marais", lat: 48.8566, lng: 2.3622, category: "neighborhood" },
    ],
  },
  {
    slug: "new-york-city",
    city: "New York City",
    country: "USA",
    image: "/images/new_york_city.webp",
    tagline: "A city that never slows down on autopilot.",
    visitedOn: "October 2023",
    journal:
      "New York is a pace, not a place. I kept a running shot list of corners that felt cinematic, bodega flowers, subway buskers, rooftop light, and let the schedule breathe around what the city handed us.",
    tripRecap:
      "Five-day trip: Central Park culture piece, Brooklyn bridge sequence, West Village jazz night. The Shakespeare-in-the-park moment was unplanned and became the hook for the whole edit.",
    wouldReturn: true,
    highlights: [
      "Free Shakespeare in Central Park, unplanned hero clip",
      "Brooklyn Bridge dusk walk-through",
      "Basement jazz session in the West Village",
    ],
    hiddenGems: [
      {
        name: "The Met Cloisters",
        category: "museum",
        note: "Quiet counterweight to midtown chaos, weekday mornings only.",
        address: "99 Margaret Corbin Dr",
      },
      {
        name: "Russ & Daughters Cafe",
        category: "restaurant",
        note: "Classic appetizing, great overhead food shots.",
        address: "127 Orchard St",
      },
    ],
    shootDays: [
      {
        day: 2,
        label: "Bridge & skyline",
        blocks: [
          {
            time: "17:00",
            title: "Brooklyn Bridge walk-through",
            category: "walk",
            note: "Gimbal + wide. One hero shot, one detail montage.",
            location: "Brooklyn Bridge",
          },
        ],
      },
    ],
    ratings: {
      hospitality: 3,
      walkability: 5,
      adventure: 5,
      contentPotential: 5,
    },
    books: [
      {
        title: "Here Is New York",
        author: "E. B. White",
        tags: ["Short read", "City mood"],
      },
    ],
    media: [
      {
        title: "Frances Ha",
        creator: "Noah Baumbach",
        type: "Film",
        year: "2012",
        tags: ["Urban romance", "Edit inspiration"],
      },
    ],
    mapPins: [
      { name: "Central Park", lat: 40.7829, lng: -73.9654, category: "experience" },
      { name: "Brooklyn Bridge", lat: 40.7061, lng: -73.9969, category: "experience" },
    ],
  },
  {
    slug: "tuscany",
    city: "Tuscany",
    country: "Italy",
    image: "/images/tuscany.webp",
    tagline: "Slow roads, olive groves, and the luxury of time on camera.",
    visitedOn: "September 2022",
    journal:
      "Tuscany rewrote my planning instinct. The best moments came from the unscheduled day, invited to an olive harvest, long table outside, wine that tasted like the hillside. Sometimes the plan is to have no plan.",
    tripRecap:
      "Four-day countryside edit: Chianti drive montage, farmhouse lunch feature, hill town sketching sequence. Lowest stress trip of the year, high authenticity payoff.",
    wouldReturn: true,
    highlights: [
      "Sunset drive through Chianti backroads",
      "Farmhouse lunch with estate-grown ingredients",
      "Unplanned piazza sketching candid moments",
    ],
    hiddenGems: [
      {
        name: "Bagno Vignoni",
        category: "neighborhood",
        note: "Thermal village square, surreal wide shots, very still energy.",
        address: "Bagno Vignoni, SI",
      },
      {
        name: "Agriturismo stay",
        category: "hotel",
        note: "Working farm lodging, morning golden hour from the terrace.",
      },
    ],
    shootDays: [
      {
        day: 3,
        label: "Harvest day",
        blocks: [
          {
            time: "10:00",
            title: "Olive harvest day",
            category: "shoot",
            note: "Documentary-style, hands, baskets, family table payoff.",
          },
        ],
      },
    ],
    ratings: {
      hospitality: 5,
      walkability: 4,
      adventure: 3,
      contentPotential: 4,
    },
    books: [
      {
        title: "Under the Tuscan Sun",
        author: "Frances Mayes",
        tags: ["Travel memoir", "Mood reference"],
      },
    ],
    media: [
      {
        title: "Call Me by Your Name",
        creator: "Luca Guadagnino",
        type: "Film",
        year: "2017",
        tags: ["Visual reference", "Northern Italy palette"],
      },
    ],
    mapPins: [
      { name: "Chianti region", lat: 43.4668, lng: 11.3167, category: "experience" },
      { name: "Bagno Vignoni", lat: 43.0297, lng: 11.6122, category: "neighborhood" },
    ],
  },
  {
    slug: "london",
    city: "London",
    country: "England",
    image: "/images/london.webp",
    tagline: "History layered over novelty, a city of contrasts in every frame.",
    visitedOn: "April 2024",
    journal:
      "London became a neighbourhood study. Imperial grandeur next to indie bookshops, rain then sudden Thames gold, the edit practically cut itself once I stopped forcing the big hits.",
    tripRecap:
      "Four-day trip: Broadway Market culture piece, West End night, Daunt Books research montage. Rain actually helped, moody transitions between segments.",
    wouldReturn: true,
    highlights: [
      "Broadway Market Sunday crawl",
      "Last-minute West End show candid moments",
      "Modern tea tea salon visit",
    ],
    hiddenGems: [
      {
        name: "Daunt Books",
        category: "experience",
        note: "Edwardian bookshop by country, perfect static beauty shots.",
        address: "83 Marylebone High St",
      },
      {
        name: "Dishoom",
        category: "restaurant",
        note: "Bombay cafe culture, bacon naan roll hero shot.",
        address: "Various locations",
      },
    ],
    shootDays: [
      {
        day: 1,
        label: "Market morning",
        blocks: [
          {
            time: "09:00",
            title: "Broadway Market crawl",
            category: "walk",
            note: "Handheld vendor interactions + food close-ups.",
            location: "Broadway Market",
          },
        ],
      },
    ],
    ratings: {
      hospitality: 4,
      walkability: 5,
      adventure: 4,
      contentPotential: 5,
    },
    books: [
      {
        title: "London: The Biography",
        author: "Peter Ackroyd",
        tags: ["Deep dive", "Research archive"],
      },
    ],
    media: [
      {
        title: "Paddington",
        creator: "Paul King",
        type: "Film",
        year: "2014",
        tags: ["Whimsical", "City love letter"],
      },
    ],
    mapPins: [
      { name: "Broadway Market", lat: 51.5375, lng: -0.0617, category: "neighborhood" },
      { name: "Daunt Books", lat: 51.5207, lng: -0.1517, category: "experience" },
    ],
  },
  {
    slug: "barcelona",
    city: "Barcelona",
    country: "Spain",
    image: "/images/barcelona.webp",
    tagline: "Gaudí by day, tapas by night, Mediterranean ease in every cut.",
    visitedOn: "June 2023",
    journal:
      "Barcelona was architecture meets appetite. I kept returning to the same market stall, the same rooftop, the same bench overlooking the sea, repetition became its own story arc in the final edit.",
    tripRecap:
      "Three-day architecture + food sprint: early Sagrada entry, Gothic Quarter golden hour, paella Sunday feature with a family from a cooking class. Strong carousel performance.",
    wouldReturn: true,
    highlights: [
      "Pre-crowd Sagrada Família exterior sequence",
      "Gothic Quarter golden hour walk-through",
      "Paella Sunday feature with local family",
    ],
    hiddenGems: [
      {
        name: "El Xampanyet",
        category: "restaurant",
        note: "Tiny cava bar, intimate talking-head spot near Picasso Museum.",
        address: "C/ de Montcada, 22",
      },
      {
        name: "Bunkers del Carmel",
        category: "experience",
        note: "Panoramic sunset, bottle, blanket, wide skyline shot.",
        address: "Carrer de Marià Labèrnia",
      },
    ],
    shootDays: [
      {
        day: 2,
        label: "Architecture day",
        blocks: [
          {
            time: "07:30",
            title: "Sagrada exterior visit",
            category: "shoot",
            note: "Beat the buses. Tripod + detail lens for tile work.",
            location: "Sagrada Família",
          },
        ],
      },
    ],
    ratings: {
      hospitality: 5,
      walkability: 4,
      adventure: 4,
      contentPotential: 5,
    },
    books: [
      {
        title: "Homage to Catalonia",
        author: "George Orwell",
        tags: ["History", "Context read"],
      },
    ],
    media: [
      {
        title: "Vicky Cristina Barcelona",
        creator: "Woody Allen",
        type: "Film",
        year: "2008",
        tags: ["Atmosphere", "Pre-trip watch list"],
      },
    ],
    mapPins: [
      { name: "Sagrada Família", lat: 41.4036, lng: 2.1744, category: "museum" },
      { name: "Bunkers del Carmel", lat: 41.4186, lng: 2.1617, category: "experience" },
    ],
  },
];
