export const PHONE_DISPLAY = "+1 (312) 554-5481";
export const PHONE_TEL = "tel:+13125545481";
export const PHONE2_DISPLAY = "+1 (708) 808-0303";
export const PHONE2_TEL = "tel:+17088080303";

export const weeklySchedule = [
  {
    id: "major",
    title: "Major Days",
    days: ["Wednesday", "Saturday", "Sunday"],
    dishes: [
      "Banku & Pepper with Fried or Grilled Tilapia",
      "Fufu with Peanut Butter, Palmnut or Light Soup",
      "Jollof with Grilled Chicken",
      "Ampesi with Kontomire",
      "Waakye",
      "All our soups",
    ],
    delivery: [
      { label: "Early delivery", time: "1:00 PM" },
      { label: "Late delivery", time: "5:00 PM" },
    ],
  },
  {
    id: "minor",
    title: "Minor Days",
    days: ["Monday", "Tuesday", "Thursday", "Friday"],
    dishes: ["Ghanaian Spaghetti", "Salad", "Gari & Beans (Gobɛ)"],
    delivery: [{ label: "Delivery window", time: "12:00 PM – 5:00 PM" }],
  },
];

// Google Business "write a review" link for Komla's Kitchen.
export const GOOGLE_REVIEW_URL = "https://g.page/r/CTAQ88sbRGdaEAI/review";
