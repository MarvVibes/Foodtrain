export const categories = [
  { id: "all", name: "All Specials", count: 18 },
  { id: "grills", name: "Flame Grills", count: 5 },
  { id: "kitchen", name: "FoodTrain Kitchen", count: 5 },
  { id: "combos", name: "Train Combos", count: 3 },
  { id: "sides", name: "Sides & Extras", count: 5 },
  { id: "drinks", name: "Chilled Drinks", count: 4 }
];

export const menuItems = [
  // --- FLAME GRILLS ---
  {
    id: "flame-grilled-chicken",
    name: "Flame-Grilled Quarter Chicken",
    category: "grills",
    price: 3600,
    originalPrice: 4000,
    portion: "1 Quarter Cut (Thigh & Leg)",
    prepTime: "20 mins",
    rating: 4.9,
    reviews: 620,
    badge: "Bestseller",
    description: "Marinated for 24 hours in our secret 12-spice blend and slow flame-grilled to tender, juicy perfection.",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Mild", "Medium Spicy", "Naija Fire 🔥"],
    defaultSpice: "Medium Spicy",
    availableSides: ["Fried Plantain (Dodo)", "Fried Yam", "French Fries", "Smoky Jollof Rice"],
    extras: [
      { name: "Extra Pepper Sauce", price: 500 },
      { name: "Sweet Coleslaw", price: 600 },
      { name: "Extra Yaji Spice Dip", price: 400 }
    ]
  },
  {
    id: "special-beef-suya",
    name: "Express Beef Suya Skewers",
    category: "grills",
    price: 3200,
    originalPrice: null,
    portion: "4 Generous Skewers + Onions",
    prepTime: "15 mins",
    rating: 5.0,
    reviews: 840,
    badge: "Must Try",
    description: "Thinly sliced prime tender beef dusted in authentic Kano yaji kuli-kuli pepper blend, charred over open red-hot coals.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Mild", "Hot", "Extra Yaji Fire 🔥🔥"],
    defaultSpice: "Hot",
    availableSides: ["Fried Yam", "Fried Plantain (Dodo)", "Warm Pita Bread"],
    extras: [
      { name: "Extra Red Onions & Tomatoes", price: 300 },
      { name: "Extra Suya Pepper Powder", price: 400 },
      { name: "Fresh Lime Wedge", price: 200 }
    ]
  },
  {
    id: "crispy-glazed-wings",
    name: "Sizzling BBQ Grilled Wings",
    category: "grills",
    price: 3800,
    originalPrice: 4200,
    portion: "6 Jumbo Wings",
    prepTime: "20 mins",
    rating: 4.8,
    reviews: 490,
    badge: "Trending",
    description: "Crispy skin flame-kissed chicken wings tossed in our sweet and smoky honey-habanero glaze.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Honey Mild", "Smoky Medium", "Habanero Heat 🔥"],
    defaultSpice: "Smoky Medium",
    availableSides: ["French Fries", "Fried Plantain", "Potato Wedges"],
    extras: [
      { name: "Ranch Dip", price: 600 },
      { name: "Extra Glaze Sauce", price: 500 }
    ]
  },
  {
    id: "grilled-turkey-wings",
    name: "Spicy Flame-Grilled Turkey",
    category: "grills",
    price: 4500,
    originalPrice: null,
    portion: "1 Huge Turkey Cut",
    prepTime: "25 mins",
    rating: 4.9,
    reviews: 310,
    badge: "Popular",
    description: "Thick, succulent cut of prime turkey, flame-seared and coated with crushed scotch bonnet peppers and garlic butter.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Medium Spicy", "Naija Fire 🔥"],
    defaultSpice: "Naija Fire 🔥",
    availableSides: ["Fried Yam", "Smoky Jollof Rice", "Fried Plantain"],
    extras: [
      { name: "Extra Pepper Dip", price: 500 },
      { name: "Fried Plantain Add-on", price: 1200 }
    ]
  },
  {
    id: "grilled-croaker-fish",
    name: "Whole Grilled Croaker Fish",
    category: "grills",
    price: 7500,
    originalPrice: 8500,
    portion: "1 Whole Fish (approx. 700g)",
    prepTime: "30 mins",
    rating: 4.9,
    reviews: 580,
    badge: "Chef Special",
    description: "Whole fresh croaker fish slit and stuffed with aromatic peppers, fresh basil, and ginger, grilled over natural charcoal.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Mild", "Medium", "Authentic Hot 🔥"],
    defaultSpice: "Medium",
    availableSides: ["Roasted Plantain (Boli)", "French Fries", "Fried Yam"],
    extras: [
      { name: "Extra Spicy Fish Sauce", price: 700 },
      { name: "Coleslaw & Onion Garnish", price: 500 }
    ]
  },

  // --- KITCHEN SPECIALTIES ---
  {
    id: "tender-asun",
    name: "Spicy Smoked Goat Meat (Asun)",
    category: "kitchen",
    price: 4800,
    originalPrice: null,
    portion: "1 Generous Bowl (Chopped Cuts)",
    prepTime: "20 mins",
    rating: 5.0,
    reviews: 950,
    badge: "Signature",
    description: "Tender goat meat slow-smoked with wood chips, stir-fried with charred habaneros, spring onions, and bell peppers.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Hot", "Naija Fire 🔥", "Volcano 🔥🔥🔥"],
    defaultSpice: "Naija Fire 🔥",
    availableSides: ["Fried Yam", "Plantain", "White Rice & Sauce"],
    extras: [
      { name: "Extra Pepper Sauce", price: 500 },
      { name: "Extra Soft Bread Roll", price: 400 }
    ]
  },
  {
    id: "gizz-snail-combo",
    name: "Gizz-Snail Royal Sizzle",
    category: "kitchen",
    price: 5200,
    originalPrice: 5800,
    portion: "4 Gizzard Cuts + 3 Giant Snails",
    prepTime: "20 mins",
    rating: 4.9,
    reviews: 730,
    badge: "Bestseller",
    description: "Our signature delicacy pairing crunchy fried chicken gizzards and jumbo Nigerian snails tossed in rich ata-din-din stew.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Medium Spicy", "Naija Fire 🔥"],
    defaultSpice: "Naija Fire 🔥",
    availableSides: ["Fried Plantain", "Fried Yam", "Jollof Rice"],
    extras: [
      { name: "Extra 2 Giant Snails", price: 2200 },
      { name: "Extra Gizzard Cuts", price: 1500 }
    ]
  },
  {
    id: "peppered-snail-plate",
    name: "Jumbo Peppered Snails",
    category: "kitchen",
    price: 4900,
    originalPrice: null,
    portion: "5 Selected Jumbo Snails",
    prepTime: "20 mins",
    rating: 4.8,
    reviews: 410,
    badge: "Delicacy",
    description: "Cleaned and tenderized rainforest snails, slow simmered in spicy pepper relish with caramelized red onions.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Medium", "Hot 🔥", "Extra Hot 🔥🔥"],
    defaultSpice: "Hot 🔥",
    availableSides: ["Fried Plantain", "Fried Yam", "French Fries"],
    extras: [
      { name: "Extra Onion & Pepper Gravy", price: 600 }
    ]
  },
  {
    id: "peppered-gizzard",
    name: "Crisp Peppered Gizzard",
    category: "kitchen",
    price: 3400,
    originalPrice: null,
    portion: "8 Tender Gizzard Pieces",
    prepTime: "15 mins",
    rating: 4.7,
    reviews: 380,
    badge: "Favorite",
    description: "Deep seasoned gizzard cuts flash-fried and drenched in hot, savory onion pepper glaze.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Mild", "Spicy", "Naija Fire 🔥"],
    defaultSpice: "Spicy",
    availableSides: ["Fried Plantain", "Yam Fries"],
    extras: [
      { name: "Extra Pepper Sauce", price: 500 }
    ]
  },
  {
    id: "smoky-party-jollof",
    name: "Smoky Firewood Party Jollof",
    category: "kitchen",
    price: 2800,
    originalPrice: 3200,
    portion: "1 Large Plate + Fried Plantains",
    prepTime: "15 mins",
    rating: 5.0,
    reviews: 1200,
    badge: "Top Rated",
    description: "The unmistakable Lagos party firewood smoke taste. Long grain parboiled rice cooked in rich reduced bell pepper broth.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Standard Naija Flavour", "Extra Spicy 🔥"],
    defaultSpice: "Standard Naija Flavour",
    availableSides: ["Grilled Quarter Chicken", "Beef Suya", "Fried Asun"],
    extras: [
      { name: "Add Grilled Chicken Cut", price: 2500 },
      { name: "Add Peppered Beef", price: 2000 },
      { name: "Extra Dodo (Plantain)", price: 1000 }
    ]
  },

  // --- TRAIN COMBOS ---
  {
    id: "conductors-mega-feast",
    name: "The Conductor's Mega Platter",
    category: "combos",
    price: 13500,
    originalPrice: 15500,
    portion: "Feeds 3 - 4 People",
    prepTime: "30 mins",
    rating: 5.0,
    reviews: 420,
    badge: "Family / Party",
    description: "The ultimate showstopper: Half flame-grilled chicken, 4 Suya skewers, portion of Asun, crispy fried yam, golden dodo, coleslaw, and 2 chilled drinks.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Mixed / Balanced", "Extra Peppery 🔥"],
    defaultSpice: "Mixed / Balanced",
    availableSides: ["Includes All Standard Sides"],
    extras: [
      { name: "Extra Suya Skewers (2x)", price: 1600 },
      { name: "Additional 2 Drinks", price: 1800 }
    ]
  },
  {
    id: "sizzle-duo-box",
    name: "Couples Sizzle Duo Box",
    category: "combos",
    price: 7900,
    originalPrice: 9000,
    portion: "Feeds 2 Persons",
    prepTime: "25 mins",
    rating: 4.9,
    reviews: 310,
    badge: "Date Night",
    description: "Quarter grilled chicken, 2 beef suya sticks, portion of fried yam, sweet dodo, double spicy pepper dip, and 2 signature drinks.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Mild & Sweet", "Hot & Spicy 🔥"],
    defaultSpice: "Hot & Spicy 🔥",
    availableSides: ["Yam & Plantain Combo Included"],
    extras: [
      { name: "Upgrade to Jumbo Snail", price: 1800 }
    ]
  },
  {
    id: "express-suya-box",
    name: "Late-Night Express Suya Box",
    category: "combos",
    price: 5500,
    originalPrice: null,
    portion: "1 - 2 Persons",
    prepTime: "15 mins",
    rating: 4.9,
    reviews: 510,
    badge: "Night Owl",
    description: "5 Beef Suya sticks, 1 Chicken Kebab, fried yam fingers, roasted groundnuts, sliced cabbage, and red onions with cold Chapman.",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Kano Classic Hot 🔥", "Extra Yaji 🔥🔥"],
    defaultSpice: "Kano Classic Hot 🔥",
    availableSides: ["Fried Yam Included"],
    extras: [
      { name: "Extra Yaji Blend", price: 400 }
    ]
  },

  // --- SIDES & EXTRAS ---
  {
    id: "fried-plantain-dodo",
    name: "Golden Fried Plantain (Dodo)",
    category: "sides",
    price: 1500,
    originalPrice: null,
    portion: "1 Full Plate",
    prepTime: "10 mins",
    rating: 4.9,
    reviews: 910,
    badge: "Classic",
    description: "Naturally sweet, ripe yellow plantains diced and fried to a deep caramelized golden glow.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Natural Sweet", "Sprinkled Chili Salt"],
    defaultSpice: "Natural Sweet",
    availableSides: [],
    extras: [
      { name: "Hot Pepper Dip", price: 400 }
    ]
  },
  {
    id: "roasted-plantain-boli",
    name: "Roasted Plantain (Boli)",
    category: "sides",
    price: 1600,
    originalPrice: null,
    portion: "1 Whole Ripe Boli",
    prepTime: "15 mins",
    rating: 4.8,
    reviews: 430,
    badge: "Street Icon",
    description: "Charcoal-roasted sweet ripe plantain with traditional smoky grilled crust.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Original"],
    defaultSpice: "Original",
    availableSides: [],
    extras: [
      { name: "Spicy Pepper Sauce", price: 500 },
      { name: "Fried Groundnuts", price: 400 }
    ]
  },
  {
    id: "crispy-fried-yam",
    name: "Crispy Nigerian Fried Yam",
    category: "sides",
    price: 1600,
    originalPrice: null,
    portion: "1 Generous Basket",
    prepTime: "15 mins",
    rating: 4.9,
    reviews: 770,
    badge: "Fan Favorite",
    description: "Crispy outside, fluffy inside Abuja white yam sticks fried fresh to order.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Light Salt", "Spiced Paprika Salt"],
    defaultSpice: "Light Salt",
    availableSides: [],
    extras: [
      { name: "Signature Pepper Sauce", price: 500 }
    ]
  },
  {
    id: "seasoned-french-fries",
    name: "Special Seasoned Fries",
    category: "sides",
    price: 2400,
    originalPrice: null,
    portion: "Large Pack",
    prepTime: "12 mins",
    rating: 4.7,
    reviews: 320,
    badge: "Snack",
    description: "Golden potato french fries tossed in our mild savory herb spice mix.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Mild Herbs", "Spicy Yaji Dust 🔥"],
    defaultSpice: "Mild Herbs",
    availableSides: [],
    extras: [
      { name: "Garlic Mayo", price: 500 },
      { name: "Ketchup & Chili", price: 300 }
    ]
  },
  {
    id: "sweet-creamy-coleslaw",
    name: "Crunchy Sweet Coleslaw",
    category: "sides",
    price: 1200,
    originalPrice: null,
    portion: "1 Medium Cup",
    prepTime: "5 mins",
    rating: 4.7,
    reviews: 210,
    badge: "Refreshing",
    description: "Finely shredded crisp cabbage, sweet carrots, and sweetcorn tossed in light creamy dressing.",
    image: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Sweet & Creamy"],
    defaultSpice: "Sweet & Creamy",
    availableSides: [],
    extras: []
  },

  // --- DRINKS ---
  {
    id: "signature-chapman",
    name: "FoodTrain Signature Chapman",
    category: "drinks",
    price: 1800,
    originalPrice: null,
    portion: "500ml Chilled Bottle",
    prepTime: "5 mins",
    rating: 5.0,
    reviews: 640,
    badge: "House Special",
    description: "Nigeria's favorite cocktail: sparkling blend of Fanta, Sprite, aromatic bitters, grenadine, cucumber, and lemon slices.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Chilled With Ice"],
    defaultSpice: "Chilled With Ice",
    availableSides: [],
    extras: []
  },
  {
    id: "hibiscus-zobo-blast",
    name: "Hibiscus Zobo Blast (Ginger & Cloves)",
    category: "drinks",
    price: 1400,
    originalPrice: null,
    portion: "500ml Chilled Bottle",
    prepTime: "3 mins",
    rating: 4.9,
    reviews: 480,
    badge: "100% Natural",
    description: "Brewed organic hibiscus flower infused with spicy fresh ginger, cloves, pineapple juice, and natural honey.",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Refreshing Cold"],
    defaultSpice: "Refreshing Cold",
    availableSides: [],
    extras: []
  },
  {
    id: "fresh-palm-cocktail",
    name: "Palm Wine Breeze Cocktail",
    category: "drinks",
    price: 2200,
    originalPrice: null,
    portion: "450ml Tumbler",
    prepTime: "5 mins",
    rating: 4.8,
    reviews: 290,
    badge: "Tropical",
    description: "Sweet organic fresh palm wine blended with chilled lime and pineapple juice.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Chilled"],
    defaultSpice: "Chilled",
    availableSides: [],
    extras: []
  },
  {
    id: "chilled-malta-guinness",
    name: "Ice Cold Malta / Soda Can",
    category: "drinks",
    price: 900,
    originalPrice: null,
    portion: "330ml Can",
    prepTime: "2 mins",
    rating: 4.8,
    reviews: 190,
    badge: "Classic",
    description: "Served frosty cold straight out of our sub-zero chillers.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=900&auto=format&fit=crop",
    spiceLevels: ["Ice Cold"],
    defaultSpice: "Ice Cold",
    availableSides: [],
    extras: []
  }
];
