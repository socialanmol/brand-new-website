export interface GoogleReview {
  author: string;
  photoUrl?: string;
  rating: number;
  text: string;
  timeAgo: string;
}

export interface GoogleReviewsData {
  rating: number;
  total: number;
  mapsUrl: string;
  reviews: GoogleReview[];
  isSample?: boolean;
}

export const SAMPLE_GOOGLE_REVIEWS: GoogleReviewsData = {
  rating: 4.8,
  total: 128,
  mapsUrl: "https://www.google.com/maps",
  isSample: true,
  reviews: [
    {
      author: "Sample Reviewer",
      rating: 5,
      text: "Sample preview review. Live Google reviews will appear after Places API setup.",
      timeAgo: "Sample",
    },
    {
      author: "Sample Reviewer",
      rating: 5,
      text: "This is placeholder content for the Google Reviews badge.",
      timeAgo: "Sample",
    },
    {
      author: "Sample Reviewer",
      rating: 4,
      text: "Sample only — this is not a published customer review.",
      timeAgo: "Sample",
    },
  ],
};
