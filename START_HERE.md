# 🚀 Escape Room Backend - START HERE

## What Has Been Built

A complete backend system for your Escape Room feature with:

✅ **PostgreSQL Database** with 5 tables
✅ **18 RESTful API Endpoints** for full CRUD operations
✅ **Frontend Integration** with leaderboard and session tracking
✅ **Type-Safe** with TypeScript and Prisma
✅ **Input Validation** with Zod
✅ **Complete Documentation**

---

## 📋 Prerequisites

Before you begin, make sure you have:

1. ✅ Node.js and npm (already installed)
2. ⬜ PostgreSQL installed on your system
   - Download: https://www.postgresql.org/download/windows/
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

---

## 🎯 Quick Start (10 minutes)

### Step 1: Install PostgreSQL (if not installed)

**Option A: Windows Installer**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer (keep default port 5432)
3. Remember your password!

**Option B: Docker (easier)**
```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### Step 2: Create Database

Open PowerShell and run:

```powershell
# Connect to PostgreSQL
psql -U postgres

# Create database (in psql prompt)
CREATE DATABASE escape_room_db;

# Exit
\q
```

Or if using Docker:
```bash
docker exec -it postgres psql -U postgres -c "CREATE DATABASE escape_room_db;"
```

### Step 3: Configure Environment

1. Open `.env.example` in the `ltu-html-generator` folder
2. Copy it to `.env`
3. Update the password in DATABASE_URL:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/escape_room_db?schema=public"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

### Step 4: Run Database Setup

Open terminal in the `ltu-html-generator` folder:

```bash
# Navigate to project folder
cd "C:\Hamid\Code Tutoring\Roman\ltu-html-generator"

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Seed database (adds initial stages)
npm run prisma:seed
```

You should see:
```
✅ Created stage: Stage 1: Format Code Correctly
✅ Created stage: Stage 2: Click Image to Debug Code
✅ Created stage: Stage 3: Generate Numbers
✅ Created stage: Stage 4: Data Transformation
🎉 Database seeding completed!
```

### Step 5: Activate Backend Integration

```bash
# Backup original page
mv app/escape-room/page.tsx app/escape-room/page-original.tsx

# Use backend version
mv app/escape-room/page-with-backend.tsx app/escape-room/page.tsx
```

Or manually:
1. Rename `app/escape-room/page.tsx` to `page-original.tsx`
2. Rename `app/escape-room/page-with-backend.tsx` to `page.tsx`

### Step 6: Start the Server

```bash
npm run dev
```

### Step 7: Test It!

1. Open http://localhost:3000/escape-room
2. Enter your name
3. Click "Start"
4. Play the game!
5. Check the leaderboard

---

## 🧪 Verify Everything Works

### Test 1: Check Database
```bash
npm run prisma:studio
```
Opens at http://localhost:5555 - you should see 4 stages

### Test 2: Test API
Open browser and visit:
- http://localhost:3000/api/stages (should show 4 stages)
- http://localhost:3000/api/users (should show empty array)
- http://localhost:3000/api/leaderboard (should show empty array)

### Test 3: Play the Game
1. Go to http://localhost:3000/escape-room
2. Enter your name
3. Start the timer
4. Complete a challenge
5. Check if it saves (look in Prisma Studio)

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `START_HERE.md` | This file - quick start guide |
| `BACKEND_README.md` | Complete documentation |
| `BACKEND_SETUP.txt` | Detailed setup instructions |
| `API_REFERENCE.md` | API endpoint reference |
| `IMPLEMENTATION_SUMMARY.md` | What was built |

---

## 🎮 How It Works

### Game Flow

1. **User enters name** → Creates User in database
2. **Clicks Start** → Creates GameSession
3. **Solves challenge** → Records StageAttempt
4. **Completes game** → Updates Session, adds to Leaderboard
5. **Views leaderboard** → Shows top 10 fastest times

### Data Flow

```
Frontend (React)
    ↓
API Client (lib/api.ts)
    ↓
API Routes (app/api/*)
    ↓
Prisma Client (lib/prisma.ts)
    ↓
PostgreSQL Database
```

---

## 🔧 Useful Commands

### Database Management
```bash
# View database in browser
npm run prisma:studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Create new migration after schema changes
npx prisma migrate dev --name your_migration_name

# Regenerate Prisma Client
npm run prisma:generate
```

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing API
```bash
# Get all stages
curl http://localhost:3000/api/stages

# Create a user
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@example.com\"}"

# Get leaderboard
curl http://localhost:3000/api/leaderboard
```

---

## 🐛 Troubleshooting

### "Can't reach database server"
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env`
- Test connection: `psql -U postgres -d escape_room_db`

### "Prisma Client not found"
```bash
npm run prisma:generate
```

### "Migration failed"
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
npm run prisma:seed
```

### "Port 3000 already in use"
```bash
# Kill the process
npx kill-port 3000
# Or change port
npm run dev -- -p 3001
```

### "Module not found: @/lib/prisma"
```bash
# Reinstall dependencies
npm install
npm run prisma:generate
```

---

## 🎯 What You Can Do Now

### For Users
- ✅ Play the escape room game
- ✅ See your completion time
- ✅ Compete on the leaderboard
- ✅ Track your attempts

### For Admins
- ✅ View all users in Prisma Studio
- ✅ See all game sessions
- ✅ Track player attempts
- ✅ Manage stages (add/edit/delete)
- ✅ View analytics

### For Developers
- ✅ Add new API endpoints
- ✅ Modify database schema
- ✅ Extend frontend features
- ✅ Add authentication
- ✅ Deploy to production

---

## 📊 API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/users` | GET, POST | User management |
| `/api/stages` | GET, POST | Stage management |
| `/api/sessions` | GET, POST | Game sessions |
| `/api/attempts` | POST | Record attempts |
| `/api/leaderboard` | GET, POST | Leaderboard |

See `API_REFERENCE.md` for complete details.

---

## 🚀 Next Steps

### Immediate (Required)
1. ✅ Install PostgreSQL
2. ✅ Create database
3. ✅ Configure .env
4. ✅ Run migrations
5. ✅ Seed database
6. ✅ Test the game

### Short Term (Recommended)
- 🔲 Add authentication (user login)
- 🔲 Add admin panel
- 🔲 Add more stages
- 🔲 Add difficulty levels
- 🔲 Add achievements

### Long Term (Optional)
- 🔲 Deploy to production (Vercel + Supabase)
- 🔲 Add multiplayer mode
- 🔲 Add real-time leaderboard updates
- 🔲 Add social features
- 🔲 Add analytics dashboard

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just follow the Quick Start steps above and you'll have a fully functional backend in 10 minutes!

**Need help?** Check the documentation files or the troubleshooting section.

**Questions?** All the code is well-commented and documented.

**Happy coding! 🚀**

