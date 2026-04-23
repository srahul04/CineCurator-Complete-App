// ─────────────────────────────────────────
// CineCurator — Mock Data
// ─────────────────────────────────────────

import { City, Movie, Theater } from '../types';

export const CITIES: City[] = [
  { id: 'chennai',   name: 'Chennai',   region: 'SOUTH INDIA',    featured: true,  color: '#F4D4D8', imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=600&auto=format&fit=crop' },
  { id: 'bangalore', name: 'Bangalore', region: 'SILICON VALLEY', featured: true,  color: '#E8D0D8', imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop' },
  { id: 'hyderabad', name: 'Hyderabad', region: 'CITY OF PEARLS', featured: true,  color: '#E8C0C8', imageUrl: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=600&auto=format&fit=crop' },
  { id: 'mumbai',    name: 'Mumbai',    region: 'FINANCIAL HUB',  featured: false, color: '#E0D0D8' },
  { id: 'delhi',     name: 'Delhi NCR', region: 'THE CAPITAL',    featured: false, color: '#E0C8D8' },
  { id: 'kolkata',   name: 'Kolkata',   region: 'CITY OF JOY',    featured: false, color: '#D8D8D8' },
];

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Neon Horizon: Part II',
    genre: 'SCI-FI THRILLER',
    duration: '2h 45m',
    rating: 4.9,
    category: 'IMAX',
    isNew: true,
    posterColor: '#1A3A5C',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Midnight In Paris',
    genre: 'ROMANCE DRAMA',
    duration: '1h 55m',
    rating: 4.7,
    category: 'Indie',
    isNew: false,
    posterColor: '#2C1A3A',
    posterUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'The Silent Engine',
    genre: 'ACTION ADVENTURE',
    duration: '2h 10m',
    rating: 4.5,
    category: 'Premiere',
    isNew: false,
    posterColor: '#1A2C3A',
    posterUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Dreamweavers',
    genre: 'ANIMATION FAMILY',
    duration: '1h 38m',
    rating: 4.8,
    category: 'All Films',
    isNew: false,
    posterColor: '#1A3A2C',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'The Grand Horizon',
    genre: 'SCI-FI / DRAMA',
    duration: '2h 15m',
    rating: 4.9,
    category: 'IMAX',
    isNew: true,
    posterColor: '#3A2A1A',
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop',
  },
];

export const THEATER: Theater = {
  name: 'Grand Royal Cinema',
  address: '4517 Washington Ave, Manchester',
  format: 'IMAX',
};

export const SHOWTIMES: string[] = [
  '10:00 AM',
  '01:00 PM',
  '03:30 PM',
  '06:00 PM',
  '08:45 PM',
  '11:15 PM',
];

export const BOOKED_SEATS: string[] = [
  'A1', 'A3', 'B2', 'C4', 'D1', 'D5', 'E3', 'F6',
];

export const SEAT_PRICE = 180; // ₹ per seat

// Generates next 7 days as ['Wed 24', 'Thu 25', ...]
export function getNextSevenDays(): string[] {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const result: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    result.push(`${days[d.getDay()]} ${d.getDate()}`);
  }
  return result;
}
