# Nebula — Astrology & Birth Chart App

A React Native (Expo) astrology app with birth chart generation, compatibility scoring, AI-powered astrology chat, and daily horoscopes.

## Features

- **Birth Chart Generation** — Enter your birth date/time to generate a full natal chart with planetary placements, houses, and aspects using the `astronomy-engine` library
- **Compatibility Scoring** — Compare two birth charts for romantic/soulmate compatibility with detailed insights
- **AI Astrology Chat** — Chat with "Nebula," an AI astrologer that reads your chart and answers questions about love, career, health, and spirituality
- **Daily Horoscopes** — Daily, weekly, and monthly horoscopes for all 12 zodiac signs
- **Cosmic Dashboard** — Home screen with daily insights, mood tracking, and current planetary alignments

## Tech Stack

- **Frontend:** React Native, Expo, React Navigation
- **Backend:** Node.js, Express
- **Astronomy:** `astronomy-engine` for precise planetary calculations
- **AI:** OpenAI API (optional) with deterministic local fallback

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npx expo`)

### Install & Run

```bash
# Install dependencies
npm install

# Start the Expo dev server
npx expo start

# Start the backend server (optional, for AI chat)
cd server
npm install
node server.js
```

The app runs on iOS, Android, and web via Expo.

## Project Structure

```
src/
  components/     # Reusable UI components (BirthChartWheel, ChatBubble, etc.)
  screens/        # Screen components (Home, Horoscope, BirthChart, etc.)
  navigation/     # Tab and stack navigation setup
  data/           # Astrological data (zodiac signs, planets, houses)
  utils/          # Business logic (chart calculation, compatibility, AI chat)
  constants/      # Colors, spacing, design tokens
server/           # Express backend for AI chat
```

## Configuration

Create `server/.env` with your OpenAI key (optional):

```
OPENAI_API_KEY=sk-your-key-here
PORT=3001
```

Without the API key, the AI chat uses deterministic local responses.
