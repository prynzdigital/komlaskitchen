// Live Google reviews via the Places API (New). Runs on the server only, so the
// API key never reaches the browser. Results are cached and refreshed daily.
//
// Setup (hosting environment variables):
//   GOOGLE_PLACES_API_KEY  required — a Google Cloud key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID        optional — skips the one-off lookup by name/address below
//
// Without a key, getGoogleReviews() returns null and the site shows its own testimonials.

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/?q=place_id:";

const LOOKUP_QUERY = "Komla's Kitchen, 3718 S Indiana Ave, Chicago, IL";
const LISTING = { latitude: 41.8269088, longitude: -87.6219592 };
const DAY = 60 * 60 * 24;

async function findPlaceId(key) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      // IDs-only field mask keeps this lookup on Google's free tier.
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({
      textQuery: LOOKUP_QUERY,
      locationBias: { circle: { center: LISTING, radius: 500 } },
      pageSize: 1,
    }),
    next: { revalidate: DAY * 7 },
  });
  if (!res.ok) throw new Error(`Places search ${res.status}`);
  const data = await res.json();
  return data.places?.[0]?.id || null;
}

const clip = (text, max) => (text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, "")}…` : text);

export async function getGoogleReviews() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const placeId = process.env.GOOGLE_PLACE_ID || (await findPlaceId(key));
    if (!placeId || !/^[\w-]+$/.test(placeId)) return null;

    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: DAY },
    });
    if (!res.ok) throw new Error(`Place details ${res.status}`);
    const place = await res.json();

    const reviews = (place.reviews || [])
      .map((r) => ({
        author: r.authorAttribution?.displayName || "Google user",
        authorUrl: r.authorAttribution?.uri || null,
        photo: r.authorAttribution?.photoUri || null,
        rating: Math.round(Number(r.rating) || 0),
        when: r.relativePublishTimeDescription || "",
        text: clip((r.text?.text || r.originalText?.text || "").trim(), 320),
      }))
      .filter((r) => r.text);

    if (!reviews.length) return null;
    return {
      rating: Number(place.rating) || null,
      count: Number(place.userRatingCount) || 0,
      mapsUrl: place.googleMapsUri || `${GOOGLE_MAPS_URL}${placeId}`,
      reviews,
    };
  } catch (err) {
    console.error("Google reviews unavailable:", err.message);
    return null;
  }
}
