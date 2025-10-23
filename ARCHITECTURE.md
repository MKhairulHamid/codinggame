# Escape Room Backend Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  (Next.js 15 + React 19 + TypeScript)                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Escape Room  │  │   Header     │  │   Footer     │     │
│  │     Page     │  │  Component   │  │  Component   │     │
│  └──────┬───────┘  └──────────────┘  └──────────────┘     │
│         │                                                    │
│         │ Uses                                              │
│         ▼                                                    │
│  ┌──────────────────────────────────────────────┐          │
│  │        API Client (lib/api.ts)               │          │
│  │  - userApi, stageApi, sessionApi             │          │
│  │  - attemptApi, leaderboardApi                │          │
│  └──────────────────┬───────────────────────────┘          │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      │ HTTP Requests
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                    API Layer                                │
│         (Next.js API Routes - App Router)                   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Users   │  │  Stages  │  │ Sessions │  │ Attempts │  │
│  │   API    │  │   API    │  │   API    │  │   API    │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │             │         │
│       │             │              │             │         │
│  ┌────┴─────────────┴──────────────┴─────────────┴─────┐  │
│  │              Leaderboard API                         │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                     │
│                       │ Uses                                │
│                       ▼                                     │
│  ┌────────────────────────────────────────────────────┐   │
│  │        Prisma Client (lib/prisma.ts)               │   │
│  │  - Singleton instance                              │   │
│  │  - Connection pooling                              │   │
│  │  - Type-safe queries                               │   │
│  └────────────────────┬───────────────────────────────┘   │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      │ SQL Queries
                      │
┌─────────────────────▼──────────────────────────────────────┐
│                 Database Layer                              │
│              (PostgreSQL)                                   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐            │
│  │  users   │  │  stages  │  │game_sessions │            │
│  └──────────┘  └──────────┘  └──────────────┘            │
│                                                              │
│  ┌────────────────┐  ┌──────────────┐                     │
│  │stage_attempts  │  │ leaderboard  │                     │
│  └────────────────┘  └──────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Frontend Layer

#### Escape Room Page (`app/escape-room/page.tsx`)
- **Purpose**: Main game interface
- **State Management**: React hooks (useState, useEffect, useRef)
- **Features**:
  - Timer management
  - Stage progression
  - Code submission
  - Leaderboard display
  - User authentication

#### API Client (`lib/api.ts`)
- **Purpose**: Centralized API communication
- **Exports**:
  - `userApi` - User operations
  - `stageApi` - Stage operations
  - `sessionApi` - Session operations
  - `attemptApi` - Attempt operations
  - `leaderboardApi` - Leaderboard operations

#### Type Definitions (`types/escape-room.ts`)
- **Purpose**: Shared TypeScript interfaces
- **Types**:
  - User, Stage, GameSession, StageAttempt, LeaderboardEntry
  - Request/Response types
  - API response wrapper

---

### 2. API Layer

#### API Routes Structure
```
app/api/
├── users/
│   ├── route.ts              # GET, POST
│   └── [id]/route.ts         # GET
├── stages/
│   ├── route.ts              # GET, POST
│   └── [id]/route.ts         # GET, PUT, DELETE
├── sessions/
│   ├── route.ts              # GET, POST
│   ├── [id]/route.ts         # GET, PUT
│   └── user/[userId]/route.ts # GET
├── attempts/
│   ├── route.ts              # POST
│   └── session/[sessionId]/route.ts # GET
└── leaderboard/
    ├── route.ts              # GET, POST
    └── user/[userId]/route.ts # GET
```

#### Request Flow
```
1. Client Request
   ↓
2. Route Handler (route.ts)
   ↓
3. Zod Validation
   ↓
4. Prisma Query
   ↓
5. Response Formatting
   ↓
6. Client Response
```

---

### 3. Database Layer

#### Schema Relationships

```
User (1) ──────────────→ (N) GameSession
  │                           │
  │                           │
  │                           ↓
  │                      (N) StageAttempt
  │                           │
  │                           │
  └──────────────→ (N) Leaderboard
                              │
Stage (1) ─────────────────→ (N) StageAttempt
```

#### Table Details

**users**
```sql
id          TEXT PRIMARY KEY
username    TEXT UNIQUE NOT NULL
email       TEXT UNIQUE
created_at  TIMESTAMP DEFAULT NOW()
updated_at  TIMESTAMP DEFAULT NOW()
```

**stages**
```sql
id          SERIAL PRIMARY KEY
title       TEXT NOT NULL
description TEXT NOT NULL
type        TEXT NOT NULL
challenge   TEXT NOT NULL
solution    TEXT NOT NULL
hint        TEXT NOT NULL
order       INTEGER UNIQUE NOT NULL
created_at  TIMESTAMP DEFAULT NOW()
updated_at  TIMESTAMP DEFAULT NOW()
```

**game_sessions**
```sql
id             TEXT PRIMARY KEY
user_id        TEXT REFERENCES users(id)
start_time     TIMESTAMP DEFAULT NOW()
end_time       TIMESTAMP
completed      BOOLEAN DEFAULT FALSE
total_time     INTEGER
timer_duration INTEGER NOT NULL
created_at     TIMESTAMP DEFAULT NOW()
updated_at     TIMESTAMP DEFAULT NOW()
```

**stage_attempts**
```sql
id           TEXT PRIMARY KEY
session_id   TEXT REFERENCES game_sessions(id)
stage_id     INTEGER REFERENCES stages(id)
user_code    TEXT NOT NULL
successful   BOOLEAN DEFAULT FALSE
hints_used   INTEGER DEFAULT 0
attempted_at TIMESTAMP DEFAULT NOW()
```

**leaderboard**
```sql
id              TEXT PRIMARY KEY
user_id         TEXT REFERENCES users(id)
completion_time INTEGER NOT NULL
completed_at    TIMESTAMP DEFAULT NOW()
```

---

## Data Flow Examples

### Example 1: Starting a Game

```
1. User enters name in frontend
   ↓
2. Frontend calls userApi.create()
   ↓
3. POST /api/users
   ↓
4. Validate with Zod
   ↓
5. prisma.user.create()
   ↓
6. Return user object
   ↓
7. Frontend stores userId
   ↓
8. User clicks "Start"
   ↓
9. Frontend calls sessionApi.create()
   ↓
10. POST /api/sessions
    ↓
11. prisma.gameSession.create()
    ↓
12. Return session object
    ↓
13. Frontend stores sessionId
    ↓
14. Timer starts
```

### Example 2: Submitting a Solution

```
1. User writes code and clicks submit
   ↓
2. Frontend validates solution locally
   ↓
3. Frontend calls attemptApi.create()
   ↓
4. POST /api/attempts
   ↓
5. Validate with Zod
   ↓
6. prisma.stageAttempt.create()
   ↓
7. Return attempt object
   ↓
8. If successful:
   - Move to next stage
   - Reset hint counter
   ↓
9. If last stage completed:
   - Calculate total time
   - Update session
   - Add to leaderboard
```

### Example 3: Completing the Game

```
1. User completes final stage
   ↓
2. Frontend calculates total time
   ↓
3. Frontend calls sessionApi.update()
   ↓
4. PUT /api/sessions/:id
   ↓
5. prisma.gameSession.update()
   ↓
6. Frontend calls leaderboardApi.addEntry()
   ↓
7. POST /api/leaderboard
   ↓
8. prisma.leaderboard.create()
   ↓
9. Frontend calls leaderboardApi.getTop()
   ↓
10. GET /api/leaderboard
    ↓
11. prisma.leaderboard.findMany()
    ↓
12. Display updated leaderboard
```

---

## Technology Stack Details

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: CSS Modules
- **State**: React Hooks

### Backend
- **Runtime**: Node.js 20
- **Framework**: Next.js API Routes
- **ORM**: Prisma 6
- **Validation**: Zod 3
- **Language**: TypeScript 5

### Database
- **DBMS**: PostgreSQL 14+
- **Connection**: Prisma Client
- **Migrations**: Prisma Migrate

---

## Security Layers

### Input Validation
```
Client Input
    ↓
Zod Schema Validation
    ↓
Prisma Type Safety
    ↓
PostgreSQL Constraints
```

### Error Handling
```
Try-Catch Blocks
    ↓
Zod Error Formatting
    ↓
HTTP Status Codes
    ↓
User-Friendly Messages
```

---

## Performance Optimizations

### Database
- ✅ Indexes on foreign keys
- ✅ Connection pooling (Prisma default)
- ✅ Efficient queries with Prisma

### API
- ✅ Type-safe queries (no runtime overhead)
- ✅ Minimal data transfer
- ✅ Proper HTTP caching headers

### Frontend
- ✅ React hooks for efficient re-renders
- ✅ Local validation before API calls
- ✅ Optimistic UI updates

---

## Scalability Considerations

### Current Implementation
- Single database instance
- Stateless API (scales horizontally)
- No caching layer

### Future Enhancements
- Redis for leaderboard caching
- Read replicas for database
- CDN for static assets
- Rate limiting
- Load balancing

---

## Deployment Architecture

### Development
```
localhost:3000 (Next.js Dev Server)
    ↓
localhost:5432 (PostgreSQL)
```

### Production (Recommended)
```
Vercel (Frontend + API)
    ↓
Supabase/Railway (PostgreSQL)
```

Alternative:
```
Docker Container (Next.js)
    ↓
Docker Container (PostgreSQL)
    ↓
Nginx (Reverse Proxy)
```

---

## File Structure

```
ltu-html-generator/
├── app/
│   ├── api/                    # API Routes
│   │   ├── users/
│   │   ├── stages/
│   │   ├── sessions/
│   │   ├── attempts/
│   │   └── leaderboard/
│   └── escape-room/            # Frontend
│       ├── page.tsx
│       └── page.module.css
├── lib/
│   ├── prisma.ts              # Prisma Client
│   └── api.ts                 # API Client
├── types/
│   └── escape-room.ts         # TypeScript Types
├── prisma/
│   ├── schema.prisma          # Database Schema
│   └── seed.ts                # Seed Script
├── .env                       # Environment Variables
└── package.json               # Dependencies
```

---

## Key Design Decisions

### Why Prisma?
- Type-safe database access
- Automatic migrations
- Great TypeScript support
- Active community

### Why PostgreSQL?
- ACID compliance
- Reliable and mature
- Great for relational data
- Excellent performance

### Why Next.js API Routes?
- Same codebase as frontend
- Easy deployment
- TypeScript support
- Serverless-ready

### Why Zod?
- Runtime type validation
- TypeScript integration
- Detailed error messages
- Lightweight

---

## Monitoring & Debugging

### Development Tools
- Prisma Studio (database GUI)
- Next.js Dev Server (hot reload)
- Browser DevTools (network tab)
- VS Code Debugger

### Logging
- Console logs in API routes
- Prisma query logs (dev mode)
- Error stack traces

### Testing
- Manual testing via browser
- API testing via curl/Postman
- Database inspection via Prisma Studio

---

This architecture provides a solid foundation for the Escape Room application with room for future enhancements and scaling.

