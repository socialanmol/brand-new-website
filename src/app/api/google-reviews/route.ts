import { SAMPLE_GOOGLE_REVIEWS } from "../../../data/googleReviews.ts";

export const revalidate = 3600; // refresh from Google at most once an hour

interface GoogleReview {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
}

const PLACE_ID = /^[A-Za-z0-9_-]{8,255}$/;

function clip(value: unknown, max: number): string {
  return String(value ?? "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

function httpsUrl(value: unknown, suffixes: string[]): string {
  try {
    const url = new URL(String(value ?? ""));
    const host = url.hostname.toLowerCase();
    const allowed = suffixes.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
    if (url.protocol !== "https:" || !allowed) return "";
    return url.toString();
  } catch {
    return "";
  }
}

function boundedRating(value: unknown): number {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 0;
  return Math.max(0, Math.min(5, rating));
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return Response.json(SAMPLE_GOOGLE_REVIEWS, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!PLACE_ID.test(placeId)) {
    return Response.json({ error: "Google request failed" }, { status: 502 });
  }

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
    },
    redirect: "error",
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    return Response.json({ error: "Google request failed" }, { status: 502 });
  }

  const place = await res.json();
  const reviews = ((place.reviews ?? []) as GoogleReview[])
    .map((r) => ({
      author: clip(r.authorAttribution?.displayName, 120) || "Google user",
      photoUrl: httpsUrl(r.authorAttribution?.photoUri, ["googleusercontent.com", "ggpht.com"]) || undefined,
      rating: boundedRating(r.rating),
      text: clip(r.text?.text, 2000),
      timeAgo: clip(r.relativePublishTimeDescription, 80),
    }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const total = Number(place.userRatingCount);
  return Response.json({
    rating: boundedRating(place.rating),
    total: Number.isFinite(total) ? Math.max(0, Math.round(total)) : 0,
    mapsUrl: httpsUrl(place.googleMapsUri, ["google.com"]) || "https://www.google.com/maps",
    reviews,
    isSample: false,
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}