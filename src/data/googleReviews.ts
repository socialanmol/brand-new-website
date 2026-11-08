export interface GoogleReview {
  author: string;
  photoUrl?: string;
  rating: number;
  text: string;
  timeAgo: string;
}

export interface GoogleReviewsData {
  available?: boolean;
  rating: number;
  total: number;
  mapsUrl: string;
  reviews: GoogleReview[];
  isSample?: boolean;
}

