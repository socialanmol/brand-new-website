import { SAMPLE_GOOGLE_REVIEWS } from "../../../data/googleReviews.ts";

export const revalidate = 3600; // refresh from Google at most once an hour

interface GoogleReview {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return Response.json(SAMPLE_GOOGLE_REVIEWS, {
      headers: { "Cache-Control": `public, max-age=${revalidate}` },
    });
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
    },
  });

  if (!res.ok) {
    return Response.json({ error: "Google request failed" }, { status: 502 });
  }

  const place = await res.json();
  const reviews = ((place.reviews ?? []) as GoogleReview[])
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? "Google user",
      photoUrl: r.authorAttribution?.photoUri,
      rating: r.rating ?? 0,
      text: r.text?.text ?? "",
      timeAgo: r.relativePublishTimeDescription ?? "",
    }))
    .sort((a, b) => b.rating - a.rating) // highest-rated first
    .slice(0, 5);

  return Response.json({
    rating: place.rating ?? 0,
    total: place.userRatingCount ?? 0,
    mapsUrl: place.googleMapsUri ?? "https://www.google.com/maps",
    reviews,
    isSample: false,
  }, {
    headers: { "Cache-Control": `public, max-age=${revalidate}` },
  });
}