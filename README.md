# WTWR (What to Wear?) - Backend API

A RESTful API server for the WTWR (What to Wear?) application that helps users manage clothing items and make weather-appropriate clothing decisions.

## Description

The WTWR Backend API provides a complete server-side solution for managing users and clothing items. The application allows users to:

- **User Management**: Create and retrieve user profiles with avatars
- **Clothing Item Management**: Add, view, and delete clothing items categorized by weather conditions
- **Social Features**: Like and unlike clothing items from other users
- **Weather-Based Organization**: Organize clothing by weather types (hot, warm, cold)

The API is built with modern Node.js practices and includes comprehensive error handling, data validation, and MongoDB integration.

## Technologies and Techniques Used

### Backend Technologies

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling library

### Development Tools

- **ESLint** - Code linting and style enforcement
- **Nodemon** - Development server with hot reload
- **Validator** - Data validation library for URLs and other inputs

### Key Techniques

- **RESTful API Design** - Following REST principles for clean API endpoints
- **Schema Validation** - Mongoose schemas with built-in validation
- **Error Handling** - Centralized error codes and consistent error responses
- **MongoDB Operators** - Using `$addToSet` and `$pull` for array operations
- **Middleware** - Express middleware for request processing

## API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:userId` - Get user by ID
- `POST /users` - Create a new user

### Clothing Items

- `GET /items` - Get all clothing items
- `POST /items` - Create a new clothing item
- `DELETE /items/:itemId` - Delete a clothing item
- `PUT /items/:itemId/likes` - Like a clothing item
- `DELETE /items/:itemId/likes` - Unlike a clothing item

## Project Structure

```
├── controllers/          # Request handlers
│   ├── users.js         # User-related operations
│   └── clothingItems.js # Clothing item operations
├── models/              # Database schemas
│   ├── user.js          # User schema
│   └── clothingItem.js  # Clothing item schema
├── routes/              # API routes
│   ├── index.js         # Main router
│   ├── users.js         # User routes
│   └── clothingItems.js # Clothing item routes
├── utils/               # Utility functions
│   └── errors.js        # Error codes and messages
└── app.js              # Main application file
```

## Running the Project

```bash
# Install dependencies
npm install

# Start the server
npm run start

# Start with hot reload (development)
npm run dev

# Run ESLint
npx eslint .
```

The server will run on `https://wtwrms.jumpingcrab.com` by default.

## Database Schema

### User Schema

```javascript
{
  name: String (required, 2-30 characters),
  avatar: String (required, valid URL)
}
```

### Clothing Item Schema

```javascript
{
  name: String (required, 2-30 characters),
  weather: String (enum: ["hot", "warm", "cold"]),
  imageUrl: String (required, valid URL),
  owner: ObjectId (reference to User),
  likes: [ObjectId] (array of User references),
  createdAt: Date (auto-generated)
}
```

## Features

### Data Validation

- URL validation for avatar and image fields
- String length validation for names
- Required field enforcement
- Weather type validation using enums

### Error Handling

- Consistent error response format
- Appropriate HTTP status codes
- Validation error handling
- Cast error handling for invalid ObjectIds

### Social Features

- Users can like/unlike clothing items
- Unique likes (users can only like an item once)
- Like counts and user tracking

## Environment Setup

The application connects to MongoDB at `mongodb://127.0.0.1:27017/wtwr_db` by default.

Make sure MongoDB is running locally before starting the server.

## FrontEnd Code

Code for the frontend can be found at the following:
https://github.com/manahilsami/se_project_react
