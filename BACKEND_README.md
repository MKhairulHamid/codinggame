# Escape Room Backend

A complete backend implementation for the Escape Room feature using PostgreSQL, Prisma ORM, and Next.js API Routes.

## Features

- ✅ User management
- ✅ Stage management (CRUD operations)
- ✅ Game session tracking
- ✅ Stage attempt recording
- ✅ Leaderboard system
- ✅ RESTful API endpoints
- ✅ Type-safe with TypeScript
- ✅ Input validation with Zod

## Tech Stack

- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: Next.js 15 API Routes (App Router)
- **Language**: TypeScript
- **Validation**: Zod

## Quick Start

### 1. Install PostgreSQL

Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE escape_room_db;

# Exit
\q
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/escape_room_db?schema=public"
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Migrations

```bash
npx prisma migrate dev --name init
```

### 6. Seed Database

```bash
npm run prisma:seed
```

### 7. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Database Schema

### User
- Stores player information
- Fields: id, username, email, createdAt, updatedAt

### Stage
- Stores escape room challenges
- Fields: id, title, description, type, challenge, solution, hint, order

### GameSession
- Tracks individual game attempts
- Fields: id, userId, startTime, endTime, completed, totalTime, timerDuration

### StageAttempt
- Tracks attempts at each stage
- Fields: id, sessionId, stageId, userCode, successful, hintsUsed, attemptedAt

### Leaderboard
- Tracks best completion times
- Fields: id, userId, completionTime, completedAt

## API Endpoints

### Users

```
GET    /api/users           - List all users
POST   /api/users           - Create new user
GET    /api/users/:id       - Get user by ID
```

**Create User Example:**
```json
POST /api/users
{
  "username": "john_doe",
  "email": "john@example.com"
}
```

### Stages

```
GET    /api/stages          - Get all stages
GET    /api/stages/:id      - Get stage by ID
POST   /api/stages          - Create stage (admin)
PUT    /api/stages/:id      - Update stage (admin)
DELETE /api/stages/:id      - Delete stage (admin)
```

**Get All Stages Example:**
```bash
curl http://localhost:3000/api/stages
```

### Sessions

```
GET    /api/sessions                  - Get all sessions
POST   /api/sessions                  - Start new session
GET    /api/sessions/:id              - Get session details
PUT    /api/sessions/:id              - Update session
GET    /api/sessions/user/:userId     - Get user's sessions
```

**Create Session Example:**
```json
POST /api/sessions
{
  "userId": "clx123abc",
  "timerDuration": 1800
}
```

**Update Session Example:**
```json
PUT /api/sessions/clx456def
{
  "endTime": "2025-10-23T10:30:00Z",
  "completed": true,
  "totalTime": 1234
}
```

### Attempts

```
POST   /api/attempts                        - Record attempt
GET    /api/attempts/session/:sessionId     - Get session attempts
```

**Record Attempt Example:**
```json
POST /api/attempts
{
  "sessionId": "clx456def",
  "stageId": 1,
  "userCode": "function hello() {\n  console.log('Hello');\n}",
  "successful": true,
  "hintsUsed": 0
}
```

### Leaderboard

```
GET    /api/leaderboard                  - Get top times (default: 10)
POST   /api/leaderboard                  - Add entry
GET    /api/leaderboard/user/:userId     - Get user's best time
```

**Get Leaderboard Example:**
```bash
curl http://localhost:3000/api/leaderboard?limit=10
```

**Add Leaderboard Entry Example:**
```json
POST /api/leaderboard
{
  "userId": "clx123abc",
  "completionTime": 1234
}
```

## Frontend Integration

The frontend has been updated to integrate with the backend API. Two versions are available:

1. **Original Version** (`app/escape-room/page.tsx`)
   - Works standalone without backend
   - Uses hardcoded stages

2. **Backend-Integrated Version** (`app/escape-room/page-with-backend.tsx`)
   - Fetches stages from API
   - Creates user and session
   - Records attempts
   - Submits to leaderboard
   - Displays leaderboard

To use the backend-integrated version, rename the files:

```bash
# Backup original
mv app/escape-room/page.tsx app/escape-room/page-original.tsx

# Use backend version
mv app/escape-room/page-with-backend.tsx app/escape-room/page.tsx
```

## Development Tools

### Prisma Studio

View and edit database records with a GUI:

```bash
npm run prisma:studio
```

Opens at http://localhost:5555

### Generate Prisma Client

After schema changes:

```bash
npm run prisma:generate
```

### Create Migration

After schema changes:

```bash
npx prisma migrate dev --name your_migration_name
```

### Reset Database

**WARNING: Deletes all data**

```bash
npx prisma migrate reset
```

## Testing the API

### Using curl

```bash
# Get all stages
curl http://localhost:3000/api/stages

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com"}'

# Get leaderboard
curl http://localhost:3000/api/leaderboard?limit=10
```

### Using Browser

Navigate to:
- http://localhost:3000/api/stages
- http://localhost:3000/api/users
- http://localhost:3000/api/leaderboard

### Using Postman or Thunder Client

Import the endpoints and test with the examples above.

## Error Handling

All API endpoints return responses in this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message",
  "details": [ ... ]  // Optional validation errors
}
```

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Verify PostgreSQL is listening on port 5432
4. Test connection: `psql -U postgres -d escape_room_db`

### Prisma Client Not Found

```bash
npm run prisma:generate
```

### Migration Errors

```bash
# Reset and start fresh
npx prisma migrate reset
npx prisma migrate dev --name init
npm run prisma:seed
```

### API Returns 500 Errors

1. Check server logs in terminal
2. Verify database is running
3. Check Prisma Client is generated
4. Ensure migrations are applied

## Project Structure

```
ltu-html-generator/
├── app/
│   └── api/
│       ├── users/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── stages/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── sessions/
│       │   ├── route.ts
│       │   ├── [id]/route.ts
│       │   └── user/[userId]/route.ts
│       ├── attempts/
│       │   ├── route.ts
│       │   └── session/[sessionId]/route.ts
│       └── leaderboard/
│           ├── route.ts
│           └── user/[userId]/route.ts
├── lib/
│   ├── prisma.ts          # Prisma client singleton
│   └── api.ts             # Frontend API utilities
├── types/
│   └── escape-room.ts     # Shared TypeScript types
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
└── .env                   # Environment variables
```

## License

MIT

## Support

For issues or questions, please refer to the BACKEND_SETUP.txt file or check the Prisma documentation at https://www.prisma.io/docs

