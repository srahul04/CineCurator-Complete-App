import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookingState, Movie } from '../types';

// ─────────────────────────────────────────
// Context type definition
// ─────────────────────────────────────────
interface BookingContextType {
  booking: BookingState;
  setCity: (city: string) => void;
  setMovie: (movie: Movie) => void;
  setShowtime: (date: string, time: string) => void;
  setSeats: (seats: string[]) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
}

const defaultState: BookingState = {
  city: null,
  movie: null,
  date: null,
  showtime: null,
  selectedSeats: [],
  totalPrice: 0,
  bookingId: null,
};

export const BookingContext = createContext<BookingContextType>({} as BookingContextType);

// Custom hook for easy consumption
export const useBooking = (): BookingContextType => useContext(BookingContext);

// ─────────────────────────────────────────
// Provider
// ─────────────────────────────────────────
export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(defaultState);

  const setCity = (city: string) =>
    setBooking(prev => ({ ...prev, city }));

  const setMovie = (movie: Movie) =>
    setBooking(prev => ({ ...prev, movie }));

  const setShowtime = (date: string, showtime: string) =>
    setBooking(prev => ({ ...prev, date, showtime }));

  const setSeats = (seats: string[]) =>
    setBooking(prev => ({ ...prev, selectedSeats: seats, totalPrice: seats.length * 180 }));

  const confirmBooking = () =>
    setBooking(prev => ({
      ...prev,
      bookingId: `#CNM-${Math.floor(10000 + Math.random() * 90000)}`,
    }));

  const resetBooking = () => setBooking(defaultState);

  return (
    <BookingContext.Provider
      value={{ booking, setCity, setMovie, setShowtime, setSeats, confirmBooking, resetBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}
