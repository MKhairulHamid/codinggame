# ✅ Escape Room Backend Setup Checklist

Use this checklist to ensure everything is set up correctly.

---

## 📦 Prerequisites

- [ ] Node.js installed (v18 or higher)
- [ ] npm installed
- [ ] PostgreSQL installed (or Docker)
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

---

## 🗄️ Database Setup

### Install PostgreSQL
- [ ] Downloaded PostgreSQL from postgresql.org
- [ ] Installed PostgreSQL (default port 5432)
- [ ] Remembered the postgres user password
- [ ] PostgreSQL service is running

**OR**

- [ ] Docker installed
- [ ] PostgreSQL container running: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

### Create Database
- [ ] Opened psql or pgAdmin
- [ ] Created database: `CREATE DATABASE escape_room_db;`
- [ ] Verified database exists: `\l` (in psql)

### Test Connection
- [ ] Can connect to database: `psql -U postgres -d escape_room_db`
- [ ] Database is accessible on port 5432

---

## ⚙️ Project Configuration

### Environment Setup
- [ ] Located `.env.example` file in `ltu-html-generator` folder
- [ ] Copied `.env.example` to `.env`
- [ ] Updated DATABASE_URL with correct password
- [ ] Verified DATABASE_URL format: `postgresql://postgres:PASSWORD@localhost:5432/escape_room_db?schema=public`

### Dependencies
- [ ] Navigated to `ltu-html-generator` folder in terminal
- [ ] Ran `npm install`
- [ ] All packages installed successfully (no errors)
- [ ] Verified `node_modules` folder exists

---

## 🔧 Prisma Setup

### Generate Prisma Client
- [ ] Ran `npx prisma generate`
- [ ] Saw "✔ Generated Prisma Client" message
- [ ] No errors occurred

### Run Migrations
- [ ] Ran `npx prisma migrate dev --name init`
- [ ] Saw migration success message
- [ ] All 5 tables created (users, stages, game_sessions, stage_attempts, leaderboard)

### Seed Database
- [ ] Ran `npm run prisma:seed`
- [ ] Saw "✅ Created stage" messages for all 4 stages
- [ ] Saw "🎉 Database seeding completed!" message

### Verify Database
- [ ] Ran `npm run prisma:studio`
- [ ] Prisma Studio opened at http://localhost:5555
- [ ] Can see all 5 tables
- [ ] Stage table has 4 records
- [ ] Other tables are empty (expected)

---

## 🎨 Frontend Integration

### Backup Original
- [ ] Located `app/escape-room/page.tsx`
- [ ] Renamed to `app/escape-room/page-original.tsx`
- [ ] Original file is backed up

### Activate Backend Version
- [ ] Located `app/escape-room/page-with-backend.tsx`
- [ ] Renamed to `app/escape-room/page.tsx`
- [ ] New file is in place

### Verify Files
- [ ] `app/escape-room/page.tsx` exists (backend version)
- [ ] `app/escape-room/page-original.tsx` exists (backup)
- [ ] `lib/api.ts` exists
- [ ] `lib/prisma.ts` exists
- [ ] `types/escape-room.ts` exists

---

## 🚀 Start the Application

### Development Server
- [ ] Ran `npm run dev`
- [ ] Server started successfully
- [ ] No compilation errors
- [ ] Saw "Ready on http://localhost:3000"

### Access Application
- [ ] Opened http://localhost:3000 in browser
- [ ] Homepage loads correctly
- [ ] Navigated to http://localhost:3000/escape-room
- [ ] Escape Room page loads

---

## 🧪 Test API Endpoints

### Test in Browser
- [ ] Visited http://localhost:3000/api/stages
- [ ] Saw JSON response with 4 stages
- [ ] Visited http://localhost:3000/api/users
- [ ] Saw JSON response: `{"success":true,"data":[]}`
- [ ] Visited http://localhost:3000/api/leaderboard
- [ ] Saw JSON response: `{"success":true,"data":[]}`

### Test with curl (Optional)
- [ ] Ran `curl http://localhost:3000/api/stages`
- [ ] Got valid JSON response
- [ ] Ran `curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@example.com\"}"`
- [ ] User created successfully

---

## 🎮 Test Game Functionality

### Start Game
- [ ] Opened http://localhost:3000/escape-room
- [ ] Entered name in input field
- [ ] Clicked "Start" button
- [ ] Timer started counting down
- [ ] Saw "Click on the glowing object" message

### Play Game
- [ ] Clicked glowing object
- [ ] Challenge appeared
- [ ] Entered solution code
- [ ] Clicked "Submit Solution"
- [ ] Got feedback (success or error)
- [ ] Advanced to next stage (if correct)

### Complete Game
- [ ] Completed all 4 stages
- [ ] Saw victory message
- [ ] Completion time displayed
- [ ] Clicked "Leaderboard" button
- [ ] Saw entry in leaderboard

### Verify in Database
- [ ] Opened Prisma Studio (http://localhost:5555)
- [ ] Checked `users` table - new user exists
- [ ] Checked `game_sessions` table - session exists
- [ ] Checked `stage_attempts` table - attempts recorded
- [ ] Checked `leaderboard` table - entry exists

---

## 📊 Verify Data Persistence

### Create Multiple Users
- [ ] Played game with different names
- [ ] Each creates new user in database
- [ ] Each creates new session
- [ ] Each adds to leaderboard

### Check Leaderboard
- [ ] Leaderboard shows multiple entries
- [ ] Entries sorted by completion time (fastest first)
- [ ] Shows correct usernames
- [ ] Shows correct times

---

## 🔍 Common Issues Check

### Database Connection
- [ ] No "Can't reach database server" errors
- [ ] PostgreSQL is running
- [ ] DATABASE_URL is correct in `.env`

### Prisma Client
- [ ] No "Prisma Client not found" errors
- [ ] Ran `npx prisma generate` if needed

### API Errors
- [ ] No 500 errors in browser console
- [ ] API responses have `"success": true`
- [ ] No CORS errors

### Frontend Errors
- [ ] No TypeScript errors in terminal
- [ ] No React errors in browser console
- [ ] Page loads without blank screen

---

## 📚 Documentation Review

### Read Documentation
- [ ] Read `START_HERE.md`
- [ ] Skimmed `BACKEND_README.md`
- [ ] Reviewed `API_REFERENCE.md`
- [ ] Checked `ARCHITECTURE.md`
- [ ] Noted `IMPLEMENTATION_SUMMARY.md`

### Understand Structure
- [ ] Know where API routes are (`app/api/`)
- [ ] Know where frontend is (`app/escape-room/`)
- [ ] Know where Prisma files are (`prisma/`)
- [ ] Know where types are (`types/`)
- [ ] Know where utilities are (`lib/`)

---

## 🎯 Final Verification

### Full Game Flow
- [ ] Start with fresh browser (incognito mode)
- [ ] Enter name and start game
- [ ] Complete all 4 stages
- [ ] See victory message
- [ ] Check leaderboard
- [ ] See your entry

### Multiple Sessions
- [ ] Play again with same name
- [ ] Creates new session (not updating old one)
- [ ] Both sessions in database
- [ ] Leaderboard shows best time

### Data Integrity
- [ ] All foreign keys working
- [ ] No orphaned records
- [ ] Timestamps are correct
- [ ] Data types are correct

---

## ✨ Optional Enhancements

### Explore Features
- [ ] Tried Prisma Studio interface
- [ ] Viewed different tables
- [ ] Edited a record manually
- [ ] Deleted a test record

### Test Edge Cases
- [ ] Started game without entering name
- [ ] Tried submitting empty solution
- [ ] Let timer run out
- [ ] Checked error handling

### Performance
- [ ] Page loads quickly
- [ ] API responses are fast
- [ ] No lag when submitting solutions
- [ ] Leaderboard updates immediately

---

## 🎉 Success Criteria

You're done when:

✅ All checkboxes above are checked
✅ Game works end-to-end
✅ Data persists in database
✅ Leaderboard displays correctly
✅ No errors in console
✅ Can play multiple times

---

## 📞 Need Help?

If any checkbox fails:

1. Check the error message in terminal or browser console
2. Review the relevant documentation file
3. Check the Troubleshooting section in `START_HERE.md`
4. Verify all previous steps were completed
5. Try resetting: `npx prisma migrate reset`

---

## 🚀 Next Steps After Setup

Once everything is checked:

- [ ] Read `BACKEND_README.md` for advanced features
- [ ] Explore API endpoints in `API_REFERENCE.md`
- [ ] Understand architecture in `ARCHITECTURE.md`
- [ ] Plan custom features
- [ ] Consider deployment options

---

**Congratulations! 🎊**

If all checks pass, your Escape Room backend is fully operational!

Date Completed: _______________

Notes:
_________________________________
_________________________________
_________________________________

