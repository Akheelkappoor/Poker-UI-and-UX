# Poker UI (Vite + React)

Frontend for a multiplayer poker game. The app connects to a Node.js backend that provides REST endpoints and a WebSocket for real-time updates.

## Requirements
- Node.js 18+ (or compatible with Vite 4)
- npm

## Setup
```bash
npm install
```

Create a `.env` file based on `.env.example` and set the API/WS URLs:
```bash
cp .env.example .env
```

## Environment Variables
These are read by the Vite app at build/runtime:

- `VITE_CREATE_ROOM_URL`
- `VITE_GET_ROOM_URL`
- `VITE_JOIN_ROOM_URL`
- `VITE_ALREADY_JOINED_URL`
- `VITE_START_GAME_URL`
- `VITE_LEAVE_ROOM_URL`
- `VITE_RAISE_URL`
- `VITE_MOVE_URL`
- `VITE_ROUND_URL`
- `VITE_FAILED_URL`
- `VITE_WS_URL`
- `VITE_ADMIN_PIN`

Example local setup:
```
VITE_CREATE_ROOM_URL=http://localhost:4541/api/room
VITE_GET_ROOM_URL=http://localhost:4541/api/room
VITE_JOIN_ROOM_URL=http://localhost:4541/api/join
VITE_ALREADY_JOINED_URL=http://localhost:4541/api/join/joined
VITE_START_GAME_URL=http://localhost:4541/api/room/start
VITE_LEAVE_ROOM_URL=http://localhost:4541/api/player/drop
VITE_RAISE_URL=http://localhost:4541/api/player/raise
VITE_MOVE_URL=http://localhost:4541/api/player/move
VITE_ROUND_URL=http://localhost:4541/api/room/round
VITE_FAILED_URL=http://localhost:4541/api/player/failed
VITE_WS_URL=ws://localhost:4541
VITE_ADMIN_PIN=1234
```

When deployed behind HTTPS, use `wss://` for the WebSocket URL.

## Run
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Notes
- This repo is the frontend only. You must run a compatible backend that serves the REST endpoints and WebSocket.
- WebSocket connections will not work on serverless hosts that do not support long-lived connections (for example, Vercel functions).
