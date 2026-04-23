// ─────────────────────────────────────────
// CineCurator — Shared TypeScript Types
// ─────────────────────────────────────────

export interface City {
  id: string;
  name: string;
  region: string;
  featured: boolean;
  color: string; // card background color fallback
  imageUrl?: string;
}

export type MovieCategory = 'All Films' | 'IMAX' | 'Premiere' | 'Indie';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number | string;
  category: string;
  description?: string;
  isNew?: boolean;
  posterColor?: string;
  posterUrl?: string;
}

export interface Theater {
  name: string;
  address: string;
  format: 'IMAX' | 'Standard' | '4DX';
}

export type SeatStatus = 'available' | 'booked' | 'selected';

export interface BookingState {
  city: string | null;
  movie: Movie | null;
  date: string | null;
  showtime: string | null;
  selectedSeats: string[];
  totalPrice: number;
  bookingId: string | null;
}
