import type { LostDestination } from "@/lib/types";

export const lostDestinations: LostDestination[] = [
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    image: "/images/tokyo.webp",
    tagline: "Neon precision meets quiet ritual, a city built for contrast edits.",
    dreamNote:
      "Tokyo planning is half izakaya shortlist, half museum map. I'm building around opposites: Shinjuku at night, Meiji Shrine at dawn, Daikanyama for slow slow neighborhood wanders.",
    bestTime: "Late March to April for cherry blossoms, or November for crisp clear days.",
    budget: "moderate",
    inspiration: "Lost in Translation for mood, but the real brief is contrast and rhythm.",
    researchNotes: [
      "Book teamLab on a weekday slot, easier to visit without crowd chaos.",
      "Anchor in one neighborhood for half the trip to cut transit dead time.",
      "Build a ramen crawl by ward, each spot is a micro-segment.",
    ],
    savedPlaces: [
      {
        name: "Bar High Five",
        category: "experience",
        note: "Omakase cocktails in Ginza, talking-head + pour shots.",
        address: "4th Floor, 5-4-15 Ginza, Chuo City",
      },
      {
        name: "Tsukiji Outer Market",
        category: "neighborhood",
        note: "Morning food walk before the city accelerates.",
        address: "Tsukiji, Chuo City",
      },
    ],
    itinerary: [
      {
        day: 1,
        label: "Arrival & neon night",
        blocks: [
          {
            time: "16:00",
            title: "Check-in + gear prep",
            category: "rest",
            note: "Battery check, ND filters, audio check.",
          },
          {
            time: "20:00",
            title: "Shinjuku neon walk-through",
            category: "walk",
            note: "Handheld gimbal, slow shutter light trails.",
            location: "Shinjuku",
          },
        ],
      },
      {
        day: 2,
        label: "Quiet morning / loud afternoon",
        blocks: [
          {
            time: "06:30",
            title: "Meiji Shrine opening",
            category: "shoot",
            note: "Stillness contrast piece, wide + ambient sound.",
            location: "Meiji Jingu",
          },
          {
            time: "13:00",
            title: "Daikanyama bookstore crawl",
            category: "walk",
            note: "Texture B-roll, cover details, street style cutaways.",
            location: "Daikanyama",
          },
        ],
      },
    ],
    budgetItems: [
      {
        label: "Boutique hotel (Shinjuku, 5 nights)",
        amount: 1450,
        currency: "USD",
        tier: "essential",
        note: "Need strong Wi‑Fi for nightly uploads.",
      },
      {
        label: "teamLab tickets",
        amount: 38,
        currency: "USD",
        tier: "essential",
      },
      {
        label: "Omakase cocktail bar",
        amount: 120,
        currency: "USD",
        tier: "splurge",
        note: "One hero nightlife sequence.",
      },
      {
        label: "Portable LED panel",
        amount: 89,
        currency: "USD",
        tier: "optional",
        note: "Hotel room talking-head setup.",
      },
    ],
    packingList: [
      { item: "Mirrorless camera + 24-70mm lens", category: "gear" },
      { item: "Compact gimbal", category: "gear" },
      { item: "Lav mic + backup audio recorder", category: "content" },
      { item: "ND filters for neon nights", category: "gear" },
      { item: "Portable power bank (20k mAh)", category: "content" },
    ],
    ratings: {
      popularity: 5,
      views: 4,
      budget: 2,
      contentPotential: 5,
    },
    books: [
      {
        title: "Tokyo Vice",
        author: "Jake Adelstein",
        tags: ["Pre-trip hype", "Culture deep dive"],
        note: "Watch-list companion, gets you in the mood before landing.",
      },
    ],
    media: [
      {
        title: "Lost in Translation",
        creator: "Sofia Coppola",
        type: "Film",
        year: "2003",
        tags: ["Mood board", "Pre-trip watch"],
      },
    ],
    mapPins: [
      { name: "Shinjuku", lat: 35.6938, lng: 139.7034, category: "neighborhood" },
      { name: "Meiji Jingu", lat: 35.6764, lng: 139.6993, category: "museum" },
      { name: "Daikanyama", lat: 35.6486, lng: 139.7029, category: "neighborhood" },
    ],
  },
  {
    slug: "sydney",
    city: "Sydney",
    country: "Australia",
    image: "/images/sydney.webp",
    tagline: "Harbour light, coastal walks, and a long-haul trip worth the jet lag.",
    dreamNote:
      "Sydney is the big trip folder, coastal hikes, harbour golden hour, one splurge hotel night for the hero terrace moment.",
    bestTime: "October to November for spring warmth without peak summer crowds.",
    budget: "splurge",
    inspiration: "Coastal Australia docs + every Opera House blue-hour reference saved on my board.",
    researchNotes: [
      "Pair Sydney with two Blue Mountains days for contrast content.",
      "One harbour-view splurge night, inner-city stay for the rest.",
      "Ferries are content, not just transit, schedule them intentionally.",
    ],
    savedPlaces: [
      {
        name: "Bondi to Coogee walk",
        category: "experience",
        note: "Day-one hero coastal sequence, morning light only.",
      },
      {
        name: "Carriageworks Farmers Market",
        category: "neighborhood",
        note: "Saturday market culture piece.",
        address: "245 Wilson St, Eveleigh",
      },
    ],
    itinerary: [
      {
        day: 1,
        label: "Coastal hero day",
        blocks: [
          {
            time: "06:00",
            title: "Bondi to Coogee walk",
            category: "walk",
            note: "Full coastal path, gimbal + drone if permitted.",
            location: "Bondi Beach",
          },
          {
            time: "18:30",
            title: "Opera House blue hour",
            category: "shoot",
            note: "Tripod skyline sequence from Circular Quay.",
            location: "Sydney Opera House",
          },
        ],
      },
    ],
    budgetItems: [
      {
        label: "Harbour-view hotel (1 night)",
        amount: 520,
        currency: "USD",
        tier: "splurge",
        note: "Terrace golden-hour hero shot.",
      },
      {
        label: "Inner-city stay (4 nights)",
        amount: 680,
        currency: "USD",
        tier: "essential",
      },
      {
        label: "Blue Mountains day trip",
        amount: 180,
        currency: "USD",
        tier: "optional",
      },
    ],
    packingList: [
      { item: "Weather-sealed camera body", category: "gear" },
      { item: "Wide-angle lens for harbour shots", category: "gear" },
      { item: "Sunscreen + hat (on-camera friendly)", category: "clothing" },
      { item: "Foldable reflector", category: "content" },
    ],
    ratings: {
      popularity: 4,
      views: 5,
      budget: 3,
      contentPotential: 5,
    },
    books: [
      {
        title: "In a Sunburned Country",
        author: "Bill Bryson",
        tags: ["Pre-trip hype", "Travel memoir"],
      },
    ],
    media: [
      {
        title: "Finding Nemo",
        creator: "Andrew Stanton",
        type: "Film",
        year: "2003",
        tags: ["Harbour mood", "Light reference"],
      },
    ],
    mapPins: [
      { name: "Bondi Beach", lat: -33.8908, lng: 151.2743, category: "experience" },
      { name: "Sydney Opera House", lat: -33.8568, lng: 151.2153, category: "experience" },
    ],
  },
  {
    slug: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    image: "/images/bangkok.webp",
    tagline: "Street food temples, river light, and organized chaos to lean into.",
    dreamNote:
      "Bangkok is the street-food planning bible, canal tours, night markets, rooftop bars that actually deliver on the view.",
    bestTime: "November to February during the cool season.",
    budget: "budget-friendly",
    inspiration: "Street Food: Asia and every night-market thread I've bookmarked.",
    researchNotes: [
      "Split Old Town temples and modern Thonglor cafes for contrast edits.",
      "Book a cooking class early, doubles as content and research.",
      "River boats = scenic rides + practical transport.",
    ],
    savedPlaces: [
      {
        name: "Jay Fai",
        category: "restaurant",
        note: "Michelin street-food legend, research reservation strategy.",
        address: "327 Maha Chai Rd",
      },
      {
        name: "Talad Noi",
        category: "neighborhood",
        note: "Old Bangkok alley culture, morning photography walk.",
      },
    ],
    itinerary: [
      {
        day: 1,
        label: "Street food sprint",
        blocks: [
          {
            time: "08:00",
            title: "Tsukiji-style market crawl",
            category: "food",
            note: "Overhead shots, sizzle audio, vendor interviews.",
          },
          {
            time: "19:00",
            title: "Rooftop bar skyline",
            category: "shoot",
            note: "One clean skyline timelapse.",
          },
        ],
      },
    ],
    budgetItems: [
      {
        label: "Boutique stay (4 nights)",
        amount: 320,
        currency: "USD",
        tier: "essential",
      },
      {
        label: "Cooking class + market tour",
        amount: 75,
        currency: "USD",
        tier: "essential",
        note: "Great story + great photos.",
      },
      {
        label: "Jay Fai reservation meal",
        amount: 90,
        currency: "USD",
        tier: "splurge",
      },
    ],
    packingList: [
      { item: "Fast prime lens for low light", category: "gear" },
      { item: "Light linen shirts (heat + on-camera)", category: "clothing" },
      { item: "Waterproof field bag", category: "gear" },
      { item: "Compact tripod for food shots", category: "content" },
    ],
    ratings: {
      popularity: 4,
      views: 4,
      budget: 5,
      contentPotential: 5,
    },
    books: [
      {
        title: "Bangkok Wakes to Rain",
        author: "Pitchaya Sudbanthad",
        tags: ["Pre-trip read", "Local perspective"],
      },
    ],
    media: [
      {
        title: "Street Food: Asia",
        creator: "Netflix",
        type: "Documentary",
        year: "2019",
        tags: ["Shot list fuel", "Pre-trip watch"],
      },
    ],
    mapPins: [
      { name: "Talad Noi", lat: 13.7373, lng: 100.5145, category: "neighborhood" },
      { name: "Jay Fai", lat: 13.7525, lng: 100.5064, category: "restaurant" },
    ],
  },
  {
    slug: "santorini",
    city: "Santorini",
    country: "Greece",
    image: "/images/santorini.webp",
    tagline: "Caldera light, cliffside stays, and a splurge-tier sunset dossier.",
    dreamNote:
      "Santorini is the aspirational reel, designed around light, wine, and one perfect terrace. Less coverage, more hero moments.",
    bestTime: "September to October for warm seas and fewer cruise-ship crowds.",
    budget: "splurge",
    inspiration: "Cliffside light studies and winemaker interviews, not the cruise-ship version.",
    researchNotes: [
      "Imerovigli over Oia for caldera views with slightly more calm.",
      "Rent an ATV for one day; walk everywhere else.",
      "Skip crowded sunset dinners, watch from the terrace instead.",
    ],
    savedPlaces: [
      {
        name: "Venetsanos Winery",
        category: "experience",
        note: "Caldera-view tasting, better value than many sunset dinners.",
      },
      {
        name: "Ammoudi Bay",
        category: "neighborhood",
        note: "Seafood lunch at the water's edge below Oia.",
      },
    ],
    itinerary: [
      {
        day: 1,
        label: "Caldera light study",
        blocks: [
          {
            time: "07:00",
            title: "Terrace golden hour",
            category: "shoot",
            note: "Static wide + detail glassware macro.",
          },
          {
            time: "17:30",
            title: "Winery tasting feature",
            category: "food",
            note: "Tasting notes + pour photos.",
            location: "Venetsanos Winery",
          },
        ],
      },
    ],
    budgetItems: [
      {
        label: "Caldera-view suite (3 nights)",
        amount: 980,
        currency: "USD",
        tier: "splurge",
        note: "The hero terrace justifies the spend.",
      },
      {
        label: "Winery tasting + transport",
        amount: 110,
        currency: "USD",
        tier: "essential",
      },
      {
        label: "ATV rental (1 day)",
        amount: 45,
        currency: "USD",
        tier: "optional",
      },
    ],
    packingList: [
      { item: "Neutral linen wardrobe", category: "clothing" },
      { item: "Polarizing filter for water shots", category: "gear" },
      { item: "Mini tripod for terrace timelapse", category: "content" },
    ],
    ratings: {
      popularity: 5,
      views: 5,
      budget: 2,
      contentPotential: 5,
    },
    books: [
      {
        title: "The Island",
        author: "Victoria Hislop",
        tags: ["Poolside read", "Mood"],
      },
    ],
    media: [
      {
        title: "Mamma Mia!",
        creator: "Phyllida Lloyd",
        type: "Film",
        year: "2008",
        tags: ["Aspirational mood", "Pre-trip watch"],
      },
    ],
    mapPins: [
      { name: "Imerovigli", lat: 36.4318, lng: 25.4201, category: "neighborhood" },
      { name: "Venetsanos Winery", lat: 36.3908, lng: 25.4422, category: "experience" },
    ],
  },
  {
    slug: "istanbul",
    city: "Istanbul",
    country: "Turkey",
    image: "/images/istanbul.webp",
    tagline: "Continents collide, mosques, bazaars, and Bosphorus blue hour.",
    dreamNote:
      "Istanbul is the layered-history board, Byzantine, Ottoman, modern. Hammams, meze, ferry hops, all mapped like a multi-episode series.",
    bestTime: "April to May or September to October for pleasant walking weather.",
    budget: "moderate",
    inspiration: "Orhan Pamuk's Istanbul for tone, architecture and ferry light for visuals.",
    researchNotes: [
      "Base in Karaköy or Beyoğlu for walkable modern energy.",
      "One full bazaar day, one full Bosphorus ferry day.",
      "Research hamam etiquette before booking ahead.",
    ],
    savedPlaces: [
      {
        name: "Karaköy Güllüoğlu",
        category: "restaurant",
        note: "Benchmark baklava, macro food hero shot.",
        address: "Kemankeş Karamustafa Paşa, Mumhane Cd.",
      },
      {
        name: "Çırağan Palace terrace",
        category: "hotel",
        note: "Aspirational Bosphorus tea, even if I stay elsewhere.",
      },
    ],
    itinerary: [
      {
        day: 1,
        label: "Old city layers",
        blocks: [
          {
            time: "08:30",
            title: "Blue hour at Hagia Sophia",
            category: "shoot",
            note: "Blue-hour backup scheduled for day 2.",
            location: "Hagia Sophia",
          },
          {
            time: "14:00",
            title: "Grand Bazaar texture crawl",
            category: "walk",
            note: "Colour, craft, ambient sound, no rush.",
            location: "Grand Bazaar",
          },
        ],
      },
    ],
    budgetItems: [
      {
        label: "Karaköy boutique hotel (4 nights)",
        amount: 540,
        currency: "USD",
        tier: "essential",
      },
      {
        label: "Hamam experience + shoot slot",
        amount: 95,
        currency: "USD",
        tier: "splurge",
        note: "Check filming permissions first.",
      },
      {
        label: "Bosphorus dinner cruise",
        amount: 70,
        currency: "USD",
        tier: "optional",
      },
    ],
    packingList: [
      { item: "Scarf for mosque visits (and on-camera modesty)", category: "clothing" },
      { item: "Wide + portrait lens combo", category: "gear" },
      { item: "Portable audio for ambient bazaar sound", category: "content" },
    ],
    ratings: {
      popularity: 4,
      views: 5,
      budget: 4,
      contentPotential: 5,
    },
    books: [
      {
        title: "A Strangeness in My Mind",
        author: "Orhan Pamuk",
        tags: ["Pre-trip read", "Local perspective"],
      },
    ],
    media: [
      {
        title: "Crossing the Bridge",
        creator: "BBC",
        type: "Documentary",
        year: "2005",
        tags: ["History context", "Pre-trip watch"],
      },
    ],
    mapPins: [
      { name: "Hagia Sophia", lat: 41.0086, lng: 28.9802, category: "museum" },
      { name: "Grand Bazaar", lat: 41.0108, lng: 28.968, category: "neighborhood" },
      { name: "Karaköy", lat: 41.0225, lng: 28.9744, category: "neighborhood" },
    ],
  },
];
