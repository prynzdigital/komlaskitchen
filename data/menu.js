export const menuCategories = [
  { id: "trays", label: "Family Trays" },
  { id: "rice", label: "Rice Dishes" },
  { id: "soups", label: "Soups & Stews" },
  { id: "grilled", label: "Grilled Specials" },
  { id: "sides", label: "Sides" },
  { id: "beverages", label: "Beverages" },
];

export const menuItems = [
  // Family Trays — party/family-size, priced by tray size
  {
    id: 101,
    category: "trays",
    name: "Jollof or Fried Rice Tray",
    description: "Choose Jollof or Fried Rice as your base, add a protein, and feed the whole family or party.",
    image: "/pictures/jollof_main_dish.jpeg",
    alt: "Jollof or fried rice tray, perfect for parties and family gatherings",
    popular: true,
    baseOptions: ["Jollof Rice", "Fried Rice"],
    sizes: [
      { label: "Small", price: 85 },
      { label: "Medium", price: 110 },
      { label: "Large", price: 150 },
    ],
    proteinAddOns: [
      { name: "No Protein", prices: { Small: 0, Medium: 0, Large: 0 } },
      { name: "Chicken", prices: { Small: 25, Medium: 35, Large: 45 } },
      { name: "Goat", prices: { Small: 35, Medium: 45, Large: 60 } },
    ],
  },
  {
    id: 102,
    category: "trays",
    name: "Okro Soup",
    description: "Rich okro soup made family-size, comes with goat, tripe, and mackerel included — deselect any you'd rather not have, price stays the same.",
    image: "/pictures/okro_soup.webp",
    alt: "Okro soup with goat, tripe, and mackerel",
    popular: true,
    sizes: [
      { label: "Small", price: 55 },
      { label: "Medium", price: 90 },
      { label: "Large", price: 140 },
    ],
    includedProteins: ["Goat", "Tripe", "Mackerel"],
  },
  {
    id: 103,
    category: "trays",
    name: "Beans & Plantain Tray",
    description: "Creamy stewed beans with fried sweet plantain, family-size.",
    image: "/pictures/beans_and_plantain.jpeg",
    alt: "Beans and plantain tray",
    badge: "Available Mondays only",
    sizes: [
      { label: "Small", price: 30 },
      { label: "Medium", price: 45 },
      { label: "Large", price: 60 },
    ],
  },

  // Rice Dishes
  // {
  //   id: 2,
  //   category: "rice",
  //   name: "Jollof Rice with Chicken",
  //   description: "Classic jollof rice paired with succulent grilled chicken. A hearty and satisfying complete meal.",
  //   price: "$18.99",
  //   image: "/pictures/jollof.jpeg",
  //   alt: "Jollof rice served with grilled chicken",
  //   popular: true,
  // },
  // {
  //   id: 4,
  //   category: "rice",
  //   name: "Jollof Rice Platter",
  //   description: "A generous platter of our famous jollof rice, perfect for sharing or a big appetite.",
  //   price: "$16.99",
  //   image: "/pictures/jollof2.jpeg",
  //   alt: "Large jollof rice platter",
  //   popular: false,
  // },

  // Soups & Stews
  {
    id: 5,
    category: "soups",
    name: "Kontomire Stew",
    description: "Traditional Ghanaian cocoyam leaf stew simmered with aromatic spices, served with boiled eggs. Choose your protein.",
    image: "/pictures/kontomire_stew.jpg",
    alt: "Traditional Ghanaian kontomire stew with smoked fish",
    popular: true,
    sizes: [
      { label: "Small (1 egg)", price: 25 },
      { label: "Medium (3 eggs)", price: 45 },
      { label: "Large (6 eggs)", price: 90 },
    ],
    proteinOptions: ["Goat", "Fish/Mackerel"],
  },
  {
    id: 6,
    category: "soups",
    name: "Kontomire with Rice",
    description: "Hearty kontomire stew served over steamed white rice with boiled eggs, for a complete meal. Choose your protein.",
    image: "/pictures/kontomire_stew2.jpg",
    alt: "Kontomire stew served with rice",
    popular: false,
    sizes: [
      { label: "Small (1 egg)", price: 30 },
      { label: "Medium (3 eggs)", price: 50 },
      { label: "Large (6 eggs)", price: 95 },
    ],
    proteinOptions: ["Goat", "Fish/Mackerel"],
  },

  // Grilled Specials
  {
    id: 8,
    category: "grilled",
    name: "Party Platter (Custom)",
    description: "A custom assortment of grilled meats and sides built around your party's size and taste — call us to build yours.",
    image: "/pictures/dishes.jpeg",
    alt: "Komla's Kitchen custom party platter with assorted dishes",
    popular: true,
    callOnly: true,
  },

  // Sides
  {
    id: 10,
    category: "sides",
    name: "Fried Plantain",
    description: "Golden, caramelized sweet plantain slices fried to perfection. A versatile side that complements any main dish.",
    price: "$6.99",
    image: "/pictures/beans_and_plantain2.jpeg",
    alt: "Golden fried sweet plantain slices",
    popular: false,
  },
  {
    id: 13,
    category: "sides",
    name: "Kelewele",
    description: "Spiced fried plantain cubes seasoned with ginger, chili, and aromatic spices — a beloved Ghanaian street food snack.",
    image: "/pictures/kelewele.jpg",
    alt: "Ghanaian kelewele spiced fried plantain",
    popular: true,
    sizes: [
      { label: "Small", price: 25 },
      { label: "Medium", price: 45 },
      { label: "Large", price: 60 },
    ],
  },
  {
    id: 104,
    category: "sides",
    name: "Banku",
    description: "Traditional fermented corn and cassava dough, the perfect pairing for any soup.",
    image: null,
    alt: "Banku",
    sizes: [
      { label: "6 pieces", price: 7 },
      { label: "8 pieces", price: 10 },
      { label: "10 pieces", price: 12 },
    ],
  },
  {
    id: 105,
    category: "sides",
    name: "Grilled Tilapia",
    description: "Whole grilled tilapia, seasoned and charred to perfection.",
    image: null,
    alt: "Grilled tilapia",
    sizes: [{ label: "2 pieces", price: 40 }],
  },
  {
    id: 106,
    category: "sides",
    name: "Boiled Eggs",
    description: "Simple boiled eggs, a classic side.",
    image: null,
    alt: "Boiled eggs",
    sizes: [{ label: "5 pieces", price: 5 }],
  },
  {
    id: 107,
    category: "sides",
    name: "Ghana Salad",
    description: "Fresh Ghanaian-style salad with a creamy dressing.",
    image: null,
    alt: "Ghana salad",
    sizes: [
      { label: "Small", price: 20 },
      { label: "Medium", price: 35 },
      { label: "Large", price: 50 },
    ],
  },

  // Beverages
  {
    id: 11,
    category: "beverages",
    name: "Sobolo (Hibiscus Drink)",
    description: "Refreshing hibiscus flower drink blended with ginger, cloves, and a hint of fruit. Naturally sweet and vibrant.",
    image: "/pictures/sobolo.jpg",
    alt: "Sobolo hibiscus drink served chilled",
    popular: false,
    sizes: [
      { label: "Small", price: 12 },
      { label: "Medium", price: 20 },
      { label: "Large", price: 30 },
    ],
  },
  {
    id: 12,
    category: "beverages",
    name: "Ginger Lemonade",
    description: "Freshly squeezed lemon juice blended with real ginger and a touch of honey. Zesty and invigorating.",
    image: null,
    alt: "Fresh ginger lemonade",
    popular: false,
    sizes: [
      { label: "Small", price: 12 },
      { label: "Medium", price: 20 },
      { label: "Large", price: 30 },
    ],
  },
];

export const featuredDishes = menuItems.filter((item) => item.popular);
