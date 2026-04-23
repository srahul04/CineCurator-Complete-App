# 🎬 CineCurator — The Ultimate Real-Time Movie Experience

**CineCurator** is a high-fidelity, production-ready mobile application prototype built with **Expo** and **React Native**. It transforms the movie-going experience by integrating real-time global movie metadata, authentic cinematic posters, and live YouTube trailers into a premium, gold-standard UI.

---

## 🌟 Premium Features

### 🔐 Secure Auth-First Architecture
*   **Gatekeeper Entry**: The app starts with a secure login flow, ensuring a membership-only feel.
*   **Test Credentials**: 
    *   **Email**: `test123@gmail.com`
    *   **Password**: `test123`

### 📡 Absolute Real-Time Ecosystem
*   **Trakt.tv Metadata**: Real-time trending, popular, and anticipated movie data from global databases.
*   **TVmaze Dynamic Posters**: Every movie banner is fetched live using an intelligent search system—no more stock placeholders.
*   **YouTube Search Trailers**: Uses the **YouTube Data API v3** to search for and play official trailers instantly.
*   **Live Mapping**: Automated categorization of movies into **IMAX**, **Premiere**, and **Indie** based on real-time metadata.

### 🛡️ Smart Navigation & UX
*   **Navigation Guard**: A custom-built interceptor for back-gestures that prevents redundant history loops and provides a smart "Exit or Home" popup.
*   **End-to-End Booking**: A seamless flow from city selection to seat booking, culminating in a dynamic digital ticket.
*   **Upcoming Explorer**: A dedicated grid view for future blockbusters with live release tracking.

### 💎 Loyalty & Social
*   **CineGold System**: A branded, animated loyalty card with real-time stat tracking (Movies watched, upcoming bookings).
*   **Native Sharing**: Invite friends to your movies directly via native OS share sheets.

---

## 🛠️ Technology Stack
*   **Framework**: Expo (React Native)
*   **Navigation**: Expo Router (File-based)
*   **API Client**: Axios with interceptors for secure header management.
*   **Services**: Trakt.tv API, YouTube Data API v3, TVmaze API.
*   **Theme**: Custom Vanilla CSS Design System (Premium Maroon & Gold).

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following API keys in your `.env` file:
```env
EXPO_PUBLIC_TRAKT_CLIENT_ID=your_id
EXPO_PUBLIC_TRAKT_CLIENT_SECRET=your_secret
EXPO_PUBLIC_YOUTUBE_API_KEY=your_key
```

### 2. Installation
```bash
npm install
```

### 3. Run the App
```bash
npx expo start
```

---

## 📸 Design Philosophy
CineCurator follows a **Dark Cinematic** aesthetic, utilizing high-contrast typography, smooth transitions, and premium micro-interactions to create a luxury user experience.

---
*Built with ❤️ for Movie Lovers Everywhere.*
