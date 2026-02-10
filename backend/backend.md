# Backend Pseudocode for User Authentication System

## Overview
Express.js backend with MongoDB (Mongoose) for user authentication and management.

## Directory Structure
```
backend/
├── models/
│   └── User.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── routes/
│   └── authRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── database.js
└── server.js
```

## Core Classes & Components

### 1. User Model (models/User.js)
```javascript
CLASS User {
  PROPERTIES:
    - name: String, required
    - username: String, required, unique
    - email: String, required, unique, validated
    - password: String, required, hashed
    - spotifyConnected: Boolean, default false
    - spotifyAccessToken: String, optional
    - spotifyRefreshToken: String, optional
    - spotifyUserId: String, optional
    - createdAt: Date, default now
    - updatedAt: Date, default now
  
  METHODS:
    - pre-save: hash password before saving
    - comparePassword(candidatePassword): returns Boolean
}
```

### 2. Authentication Controller (controllers/authController.js)
```javascript
CLASS AuthController {
  
  METHOD signUp(REQUEST, RESPONSE):
    INPUT: { name, username, email, password, confirmPassword }
    
    VALIDATION STEPS:
      1. Check if passwords match
      2. Validate email format
      3. Check if email/username already exists
      4. Validate password strength
    
    PROCESS:
      IF validation passes:
        CREATE new User object
        HASH password using bcrypt
        SAVE user to database
        GENERATE JWT token
        RESPONSE: { success: true, token, user: { id, name, email } }
      ELSE:
        RESPONSE: { success: false, errors: validationErrors }
    
  METHOD signIn(REQUEST, RESPONSE):
    INPUT: { email, password }
    
    PROCESS:
      FIND user by email in database
      IF user exists:
        COMPARE password hash
        IF password matches:
          GENERATE JWT token
          RESPONSE: { success: true, token, user: { id, name, email } }
        ELSE:
          RESPONSE: { success: false, error: "Invalid credentials" }
      ELSE:
        RESPONSE: { success: false, error: "User not found" }
    
  METHOD connectSpotify(REQUEST, RESPONSE):
    INPUT: { userId, spotifyAuthCode } via authenticated request
    
    PROCESS:
      EXCHANGE auth code for Spotify tokens (OAuth 2.0)
      GET Spotify user profile
      UPDATE user in database:
        - spotifyConnected: true
        - spotifyAccessToken: encryptedToken
        - spotifyRefreshToken: encryptedToken
        - spotifyUserId: spotifyProfile.id
      RESPONSE: { success: true, message: "Spotify connected" }
    
  METHOD forgotPassword(REQUEST, RESPONSE):
    INPUT: { email }
    
    PROCESS:
      FIND user by email
      IF user exists:
        GENERATE password reset token (expires in 1 hour)
        SEND email with reset link
        RESPONSE: { success: true, message: "Reset email sent" }
      ELSE:
        RESPONSE: { success: false, error: "Email not found" }
}
```

### 3. User Controller (controllers/userController.js)
```javascript
CLASS UserController {
  
  METHOD getUserProfile(REQUEST, RESPONSE):
    INPUT: userId from JWT token
    
    PROCESS:
      FIND user by ID, exclude password field
      IF user exists:
        RESPONSE: { success: true, user }
      ELSE:
        RESPONSE: { success: false, error: "User not found" }
    
  METHOD updateUserProfile(REQUEST, RESPONSE):
    INPUT: { userId, updates } via authenticated request
    
    PROCESS:
      VALIDATE updates (allow only specific fields)
      FIND user by ID and UPDATE
      RESPONSE: { success: true, updatedUser }
    
  METHOD checkUsernameAvailability(REQUEST, RESPONSE):
    INPUT: { username } as query parameter
    
    PROCESS:
      COUNT users with given username
      IF count == 0:
        RESPONSE: { available: true }
      ELSE:
        RESPONSE: { available: false }
}
```

### 4. Authentication Middleware (middleware/authMiddleware.js)
```javascript
FUNCTION verifyToken(REQUEST, RESPONSE, NEXT):
  GET token from request headers
  IF token exists:
    VERIFY token using JWT secret
    IF token valid:
      EXTRACT userId from token
      ATTACH userId to request object
      CALL NEXT()
    ELSE:
      RESPONSE: 401, { error: "Invalid token" }
  ELSE:
    RESPONSE: 401, { error: "No token provided" }
```

### 5. Routes (routes/authRoutes.js)
```javascript
ROUTER authRoutes {
  
  ENDPOINTS:
    POST /api/auth/signup
      -> AuthController.signUp
      NO authentication required
    
    POST /api/auth/signin
      -> AuthController.signIn
      NO authentication required
    
    POST /api/auth/connect-spotify
      -> AuthController.connectSpotify
      REQUIRES: verifyToken middleware
    
    POST /api/auth/forgot-password
      -> AuthController.forgotPassword
      NO authentication required
    
    GET /api/auth/check-username/:username
      -> UserController.checkUsernameAvailability
      NO authentication required
    
    GET /api/users/profile
      -> UserController.getUserProfile
      REQUIRES: verifyToken middleware
    
    PUT /api/users/profile
      -> UserController.updateUserProfile
      REQUIRES: verifyToken middleware
}
```

### 6. Database Configuration (config/database.js)
```javascript
FUNCTION connectDatabase():
  USING mongoose
  SET connection string from environment variables
  SET connection options
  ATTEMPT connection
    ON success: LOG "Database connected"
    ON error: LOG error and EXIT process
```

### 7. Main Server (server.js)
```javascript
IMPORT express, cors, helmet, morgan
IMPORT database connection
IMPORT authRoutes

CREATE express app

MIDDLEWARE:
  - cors: enable cross-origin requests
  - helmet: security headers
  - express.json: parse JSON bodies
  - morgan: request logging

ROUTES:
  - MOUNT authRoutes at '/api'

ERROR HANDLING middleware:
  - Catch 404 errors
  - Global error handler

START server:
  SET port from environment or default 3000
  LISTEN on port
  LOG server status
```

## Database Schema Design
```javascript
UserSchema = {
  name: { type: String, required: true },
  username: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  spotifyConnected: { type: Boolean, default: false },
  spotifyAccessToken: { type: String, select: false },
  spotifyRefreshToken: { type: String, select: false },
  spotifyUserId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## API Flow Summary

### Signup Flow:
1. Frontend: Collects user data through 4 screens
2. Backend: Single `/api/auth/signup` endpoint validates and creates user
3. Response: JWT token for immediate authentication

### Signin Flow:
1. Frontend: Modal collects email/password
2. Backend: `/api/auth/signin` validates credentials
3. Response: JWT token for session management

### Spotify Connection:
1. Frontend: Opens Spotify OAuth in browser
2. Spotify: Returns auth code to redirect URI
3. Backend: `/api/auth/connect-spotify` exchanges code for tokens
4. Database: Stores encrypted Spotify tokens