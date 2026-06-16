export const menuCategories = [
  { id: "rice", label: "Rice Dishes" },
  { id: "soups", label: "Soups & Stews" },
  { id: "grilled", label: "Grilled Specials" },
  { id: "sides", label: "Sides" },
  { id: "beverages", label: "Beverages" },
];

export const menuItems = [
  // Rice Dishes
  {
    id: 1,
    category: "rice",
    name: "Jollof Rice",
    description: "Our signature perfectly seasoned tomato-based rice, slow-cooked with herbs and spices for that authentic smoky flavor.",
    price: "$14.99",
    image: "/pictures/jollof_main_dish.jpeg",
    alt: "Komla's Kitchen signature Jollof Rice served in a bowl",
    popular: true,
  },
  {
    id: 2,
    category: "rice",
    name: "Jollof Rice with Chicken",
    description: "Classic jollof rice paired with succulent grilled chicken. A hearty and satisfying complete meal.",
    price: "$18.99",
    image: "/pictures/jollof.jpeg",
    alt: "Jollof rice served with grilled chicken",
    popular: true,
  },
  {
    id: 3,
    category: "rice",
    name: "Vegetable Fried Rice",
    description: "Fragrant fried rice tossed with fresh seasonal vegetables, onions, and African spices.",
    price: "$13.99",
    image: "/pictures/vegetable_rice.jpeg",
    alt: "African vegetable fried rice with fresh vegetables",
    popular: false,
  },
  {
    id: 4,
    category: "rice",
    name: "Jollof Rice Platter",
    description: "A generous platter of our famous jollof rice, perfect for sharing or a big appetite.",
    price: "$16.99",
    image: "/pictures/jollof2.jpeg",
    alt: "Large jollof rice platter",
    popular: false,
  },

  // Soups & Stews
  {
    id: 5,
    category: "soups",
    name: "Kontomire Stew",
    description: "Traditional Ghanaian cocoyam leaf stew simmered with smoked fish and aromatic spices. Best enjoyed with rice or fufu.",
    price: "$15.99",
    image: "/pictures/kontomire_stew.jpeg",
    alt: "Traditional Ghanaian kontomire stew with smoked fish",
    popular: true,
  },
  {
    id: 6,
    category: "soups",
    name: "Kontomire with Rice",
    description: "Hearty kontomire stew served over a bed of steamed white rice for a complete, nourishing meal.",
    price: "$17.99",
    image: "/pictures/kontomire_stew2.jpeg",
    alt: "Kontomire stew served with rice",
    popular: false,
  },
  {
    id: 7,
    category: "soups",
    name: "Okro Soup",
    description: "Rich and silky okra soup made with tender meat, crayfish, and palm oil. A West African comfort classic.",
    price: "$15.99",
    image: "/pictures/okro_soup.jpeg",
    alt: "West African okra soup with tender meat",
    popular: true,
  },

  // Grilled Specials
  {
    id: 8,
    category: "grilled",
    name: "Grilled Feast Platter",
    description: "An assortment of grilled meats and sides showcasing the best of Komla's Kitchen, ideal for celebrations.",
    price: "$24.99",
    image: "/pictures/dishes.jpeg",
    alt: "Komla's Kitchen grilled feast platter with assorted dishes",
    popular: true,
  },

  // Sides
  {
    id: 9,
    category: "sides",
    name: "Beans & Plantain",
    description: "Creamy stewed beans served alongside perfectly caramelized fried sweet plantains. A beloved West African pairing.",
    price: "$11.99",
    image: "/pictures/beans_and_plantain.jpeg",
    alt: "Stewed beans served with fried sweet plantains",
    popular: true,
  },
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

  // Beverages
  {
    id: 11,
    category: "beverages",
    name: "Sobolo (Hibiscus Drink)",
    description: "Refreshing hibiscus flower drink blended with ginger, cloves, and a hint of fruit. Naturally sweet and vibrant.",
    price: "$4.99",
    image: "/pictures/sobolo.jpg",
    alt: "Sobolo hibiscus drink served chilled",
    popular: false,
  },
  {
    id: 12,
    category: "beverages",
    name: "Ginger Lemonade",
    description: "Freshly squeezed lemon juice blended with real ginger and a touch of honey. Zesty and invigorating.",
    price: "$4.99",
    image: "/pictures/jollof_main.jpeg",
    alt: "Fresh ginger lemonade",
    popular: false,
  },
];

export const featuredDishes = menuItems.filter((item) => item.popular);
