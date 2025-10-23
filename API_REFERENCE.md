# Escape Room API Reference

Quick reference for all API endpoints.

## Base URL
```
http://localhost:3000/api
```

---

## 👤 Users

### List All Users
```http
GET /api/users
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123abc",
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2025-10-23T10:00:00Z",
      "updatedAt": "2025-10-23T10:00:00Z"
    }
  ]
}
```

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2025-10-23T10:00:00Z",
    "updatedAt": "2025-10-23T10:00:00Z"
  }
}
```

### Get User by ID
```http
GET /api/users/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2025-10-23T10:00:00Z",
    "updatedAt": "2025-10-23T10:00:00Z"
  }
}
```

---

## 🎯 Stages

### Get All Stages
```http
GET /api/stages
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Stage 1: Format Code Correctly",
      "description": "Fix the indentation and formatting of this JavaScript code",
      "type": "code-format",
      "challenge": "function hello(){console.log(\"Hello\");return true;}",
      "solution": "function hello() {\n  console.log(\"Hello\");\n  return true;\n}",
      "hint": "Add proper line breaks and indentation (2 spaces)",
      "order": 1,
      "createdAt": "2025-10-23T10:00:00Z",
      "updatedAt": "2025-10-23T10:00:00Z"
    }
  ]
}
```

### Get Stage by ID
```http
GET /api/stages/:id
```

### Create Stage
```http
POST /api/stages
Content-Type: application/json

{
  "title": "Stage 5: New Challenge",
  "description": "Solve this problem",
  "type": "debug",
  "challenge": "const x = 1;",
  "solution": "const x = 2;",
  "hint": "Change the value",
  "order": 5
}
```

### Update Stage
```http
PUT /api/stages/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "hint": "Updated hint"
}
```

### Delete Stage
```http
DELETE /api/stages/:id
```

---

## 🎮 Game Sessions

### Get All Sessions
```http
GET /api/sessions
GET /api/sessions?userId=clx123abc
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx456def",
      "userId": "clx123abc",
      "startTime": "2025-10-23T10:00:00Z",
      "endTime": "2025-10-23T10:30:00Z",
      "completed": true,
      "totalTime": 1234,
      "timerDuration": 1800,
      "createdAt": "2025-10-23T10:00:00Z",
      "updatedAt": "2025-10-23T10:30:00Z",
      "user": {
        "id": "clx123abc",
        "username": "john_doe"
      }
    }
  ]
}
```

### Create Session
```http
POST /api/sessions
Content-Type: application/json

{
  "userId": "clx123abc",
  "timerDuration": 1800
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "clx456def",
    "userId": "clx123abc",
    "startTime": "2025-10-23T10:00:00Z",
    "endTime": null,
    "completed": false,
    "totalTime": null,
    "timerDuration": 1800,
    "createdAt": "2025-10-23T10:00:00Z",
    "updatedAt": "2025-10-23T10:00:00Z",
    "user": {
      "id": "clx123abc",
      "username": "john_doe"
    }
  }
}
```

### Get Session by ID
```http
GET /api/sessions/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx456def",
    "userId": "clx123abc",
    "startTime": "2025-10-23T10:00:00Z",
    "endTime": "2025-10-23T10:30:00Z",
    "completed": true,
    "totalTime": 1234,
    "timerDuration": 1800,
    "user": {
      "id": "clx123abc",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "attempts": [
      {
        "id": "clx789ghi",
        "sessionId": "clx456def",
        "stageId": 1,
        "userCode": "function hello() {...}",
        "successful": true,
        "hintsUsed": 0,
        "attemptedAt": "2025-10-23T10:05:00Z",
        "stage": {
          "id": 1,
          "title": "Stage 1: Format Code Correctly",
          "type": "code-format"
        }
      }
    ]
  }
}
```

### Update Session
```http
PUT /api/sessions/:id
Content-Type: application/json

{
  "endTime": "2025-10-23T10:30:00Z",
  "completed": true,
  "totalTime": 1234
}
```

### Get User's Sessions
```http
GET /api/sessions/user/:userId
```

---

## 📝 Stage Attempts

### Record Attempt
```http
POST /api/attempts
Content-Type: application/json

{
  "sessionId": "clx456def",
  "stageId": 1,
  "userCode": "function hello() {\n  console.log('Hello');\n  return true;\n}",
  "successful": true,
  "hintsUsed": 0
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "clx789ghi",
    "sessionId": "clx456def",
    "stageId": 1,
    "userCode": "function hello() {...}",
    "successful": true,
    "hintsUsed": 0,
    "attemptedAt": "2025-10-23T10:05:00Z",
    "stage": {
      "id": 1,
      "title": "Stage 1: Format Code Correctly",
      "description": "Fix the indentation...",
      "type": "code-format"
    },
    "session": {
      "id": "clx456def",
      "userId": "clx123abc"
    }
  }
}
```

### Get Session Attempts
```http
GET /api/attempts/session/:sessionId
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx789ghi",
      "sessionId": "clx456def",
      "stageId": 1,
      "userCode": "function hello() {...}",
      "successful": true,
      "hintsUsed": 0,
      "attemptedAt": "2025-10-23T10:05:00Z",
      "stage": {
        "id": 1,
        "title": "Stage 1: Format Code Correctly",
        "type": "code-format",
        "order": 1
      }
    }
  ]
}
```

---

## 🏆 Leaderboard

### Get Top Times
```http
GET /api/leaderboard
GET /api/leaderboard?limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxabc123",
      "userId": "clx123abc",
      "completionTime": 1234,
      "completedAt": "2025-10-23T10:30:00Z",
      "user": {
        "id": "clx123abc",
        "username": "john_doe"
      }
    }
  ]
}
```

### Add Leaderboard Entry
```http
POST /api/leaderboard
Content-Type: application/json

{
  "userId": "clx123abc",
  "completionTime": 1234
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "clxabc123",
    "userId": "clx123abc",
    "completionTime": 1234,
    "completedAt": "2025-10-23T10:30:00Z",
    "user": {
      "id": "clx123abc",
      "username": "john_doe"
    }
  }
}
```

### Get User's Best Time
```http
GET /api/leaderboard/user/:userId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxabc123",
    "userId": "clx123abc",
    "completionTime": 1234,
    "completedAt": "2025-10-23T10:30:00Z",
    "user": {
      "id": "clx123abc",
      "username": "john_doe"
    },
    "rank": 1
  }
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid input",
  "details": [
    {
      "path": ["username"],
      "message": "String must contain at least 3 character(s)"
    }
  ]
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to create user"
}
```

---

## 🔧 Common Workflows

### Complete Game Flow

1. **Create User**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"player1","email":"player1@example.com"}'
# Save userId from response
```

2. **Start Session**
```bash
curl -X POST http://localhost:3000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"userId":"clx123abc","timerDuration":1800}'
# Save sessionId from response
```

3. **Record Attempts** (for each stage)
```bash
curl -X POST http://localhost:3000/api/attempts \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId":"clx456def",
    "stageId":1,
    "userCode":"function hello() {...}",
    "successful":true,
    "hintsUsed":0
  }'
```

4. **Complete Session**
```bash
curl -X PUT http://localhost:3000/api/sessions/clx456def \
  -H "Content-Type: application/json" \
  -d '{
    "endTime":"2025-10-23T10:30:00Z",
    "completed":true,
    "totalTime":1234
  }'
```

5. **Add to Leaderboard**
```bash
curl -X POST http://localhost:3000/api/leaderboard \
  -H "Content-Type: application/json" \
  -d '{"userId":"clx123abc","completionTime":1234}'
```

---

## 📊 Data Types

### Stage Types
- `code-format` - Code formatting challenges
- `debug` - Debug code challenges
- `generate-numbers` - Number generation challenges
- `data-transform` - Data transformation challenges

### Time Format
- All times in seconds (integer)
- Example: 1234 seconds = 20 minutes 34 seconds

### Date Format
- ISO 8601 format
- Example: `2025-10-23T10:30:00Z`

---

## 🚀 Quick Test

```bash
# Test all endpoints
curl http://localhost:3000/api/stages
curl http://localhost:3000/api/users
curl http://localhost:3000/api/leaderboard
```

