# Vidyank Backend API

Backend API for Online Examination SaaS Platform built with Node.js, Express.js, and MongoDB.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # User model
│   ├── Institute.js       # Institute model (placeholder)
│   └── Subscription.js   # Subscription model (placeholder)
├── controllers/
│   └── auth.controller.js # Authentication logic
├── routes/
│   └── auth.routes.js     # Authentication routes
├── middleware/
│   ├── auth.middleware.js # JWT verification
│   └── role.middleware.js # Role-based access control
├── utils/
│   └── generateToken.js   # JWT token generation
├── server.js              # Express server setup
└── package.json           # Dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://Roshan:Roshan%40123@cluster0.lfxbvrg.mongodb.net/vidyank

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

### 3. Run Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## API Endpoints

### Authentication

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "jwt_token_here",
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "role": "STUDENT",
        "instituteId": null,
        "isActive": true
      }
    }
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "role": "STUDENT",
        "instituteId": null,
        "isActive": true
      }
    }
  }
  ```

## User Roles

- `SUPER_ADMIN` - System administrator
- `INSTITUTE_ADMIN` - Institute administrator
- `TEACHER` - Teacher
- `STUDENT` - Student
- `PARENT` - Parent

## Middleware Usage

### Authentication Middleware
```javascript
import { protect } from './middleware/auth.middleware.js';

router.get('/protected-route', protect, controller);
```

### Role-based Middleware
```javascript
import { protect } from './middleware/auth.middleware.js';
import { authorize } from './middleware/role.middleware.js';

router.get('/admin-route', protect, authorize('SUPER_ADMIN'), controller);
router.get('/teacher-route', protect, authorize('TEACHER', 'INSTITUTE_ADMIN'), controller);
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- CORS enabled
- Input validation
- Error handling

## Development

The server runs on `http://localhost:5000` by default.

Health check endpoint: `GET /`
