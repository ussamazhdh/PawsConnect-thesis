# API Contract Documentation

## Overview

This document describes the RESTful API endpoints for the AdoptAPaw application. The backend is built with Spring Boot and provides endpoints for managing adoption animals, missing animals, users, and authentication.

**Base URL**: `http://localhost:8081/api`

**API Documentation**: Available at `http://localhost:8081/swagger-ui.html`

---

## Main Resources

The API exposes two main REST resources:

1. **Adoption Animals** (`/api/adoption`) - Core domain entity for pets available for adoption
2. **Users** (`/api/auth`) - User management and authentication

Additional resources:
- **Missing Animals** (`/api/missing`) - Missing pet reports
- **Adoption Requests** (`/api/adoption/{id}/user/{uid}/createadoptionrequest`) - Adoption applications
- **File Upload** (`/api/files/upload`) - Image upload service

---

## Authentication

All protected endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/signup`
- **Description**: Register a new user account
- **Authentication**: Not required
- **Request Body**:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Pet lover",
  "location": "New York",
  "dp": "https://example.com/profile.jpg"
}
```
- **Response** (201 Created):
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```
- **Status Codes**:
  - `201` - Registration successful
  - `400` - Bad request (email/username already taken, validation errors)
  - `500` - Server error

#### Login
- **POST** `/api/auth/signin`
- **Description**: Authenticate user and receive JWT token
- **Authentication**: Not required
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "jwtdto": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "role": [
      {
        "id": 1,
        "name": "ROLE_USER"
      }
    ]
  }
}
```
- **Status Codes**:
  - `200` - Login successful
  - `400` - Invalid email or password
  - `401` - Unauthorized
  - `500` - Server error

#### Verify Account
- **POST** `/api/auth/verify?token=<verification_token>`
- **Description**: Verify user account with email token
- **Authentication**: Not required
- **Status Codes**:
  - `200` - Account verified successfully
  - `400` - Invalid or expired token
  - `500` - Server error

#### Update User
- **PUT** `/api/auth/user/{id}/update`
- **Description**: Update user profile
- **Authentication**: Required (must be the same user)
- **Request Body**:
```json
{
  "name": "John Doe Updated",
  "bio": "Updated bio",
  "location": "Los Angeles",
  "dp": "https://example.com/new-profile.jpg",
  "password": "newpassword123"
}
```
- **Status Codes**:
  - `200` - User updated successfully
  - `400` - Bad request (validation errors)
  - `401` - Unauthorized
  - `403` - Forbidden (not authorized to update this user)
  - `404` - User not found
  - `500` - Server error

---

## Adoption Animals Resource

### GET List of Adoption Animals
- **GET** `/api/adoption/all`
- **Description**: Get paginated list of all adoption animals
- **Authentication**: Not required (public endpoint)
- **Query Parameters**:
  - `pageNo` (optional, default: 0) - Page number (0-indexed)
  - `pageSize` (optional, default: 10) - Number of items per page
  - `sortBy` (optional, default: "id") - Field to sort by
  - `sortDir` (optional, default: "asc") - Sort direction (asc/desc)
- **Example**: `GET /api/adoption/all?pageNo=0&pageSize=10&sortBy=postedon&sortDir=desc`
- **Response** (200 OK):
```json
{
  "content": [
    {
      "id": 1,
      "name": "Buddy",
      "breed": "Golden Retriever",
      "training": "Trained",
      "vaccine": "Vaccinated",
      "color": "Golden",
      "description": "Friendly and energetic dog",
      "physicalcondition": "Healthy",
      "location": "New York",
      "behaviour": "Friendly",
      "food": "Dry food",
      "gender": "Male",
      "type": "Dog",
      "mobile": "1234567890",
      "postedon": "2024-01-15",
      "availability": true,
      "imageone": "https://example.com/image1.jpg",
      "imagetwo": "https://example.com/image2.jpg",
      "imagethree": "https://example.com/image3.jpg",
      "user": {
        "id": 1,
        "username": "johndoe"
      }
    }
  ],
  "pageNo": 0,
  "pageSize": 10,
  "totalElements": 50,
  "totalPages": 5,
  "last": false
}
```
- **Status Codes**:
  - `200` - Success
  - `500` - Server error

### GET Adoption Animal by ID
- **GET** `/api/adoption/{id}`
- **Description**: Get a specific adoption animal by ID
- **Authentication**: Not required (public endpoint)
- **Response** (200 OK):
```json
{
  "id": 1,
  "name": "Buddy",
  "breed": "Golden Retriever",
  "training": "Trained",
  "vaccine": "Vaccinated",
  "color": "Golden",
  "description": "Friendly and energetic dog",
  "physicalcondition": "Healthy",
  "location": "New York",
  "behaviour": "Friendly",
  "food": "Dry food",
  "gender": "Male",
  "type": "Dog",
  "mobile": "1234567890",
  "postedon": "2024-01-15",
  "availability": true,
  "imageone": "https://example.com/image1.jpg",
  "imagetwo": "https://example.com/image2.jpg",
  "imagethree": "https://example.com/image3.jpg",
  "user": {
    "id": 1,
    "username": "johndoe"
  }
}
```
- **Status Codes**:
  - `200` - Success
  - `404` - Adoption animal not found
  - `500` - Server error

### POST Create Adoption Animal
- **POST** `/api/adoption/{id}/createadoptionpost`
- **Description**: Create a new adoption animal post
- **Authentication**: Required (JWT token)
- **Path Parameter**: `id` - User ID of the creator
- **Request Body**:
```json
{
  "name": "Buddy",
  "breed": "Golden Retriever",
  "training": "Trained",
  "vaccine": "Vaccinated",
  "color": "Golden",
  "description": "Friendly and energetic dog",
  "physicalcondition": "Healthy",
  "location": "New York",
  "behaviour": "Friendly",
  "food": "Dry food",
  "gender": "Male",
  "type": "Dog",
  "mobile": "1234567890",
  "imageone": "https://example.com/image1.jpg",
  "imagetwo": "https://example.com/image2.jpg",
  "imagethree": "https://example.com/image3.jpg"
}
```
- **Response** (200 OK):
```json
{
  "id": 1,
  "name": "Buddy",
  "breed": "Golden Retriever",
  "training": "Trained",
  "vaccine": "Vaccinated",
  "color": "Golden",
  "description": "Friendly and energetic dog",
  "physicalcondition": "Healthy",
  "location": "New York",
  "behaviour": "Friendly",
  "food": "Dry food",
  "gender": "Male",
  "type": "Dog",
  "mobile": "1234567890",
  "postedon": "2024-01-15",
  "availability": true,
  "imageone": "https://example.com/image1.jpg",
  "imagetwo": "https://example.com/image2.jpg",
  "imagethree": "https://example.com/image3.jpg",
  "user": {
    "id": 1,
    "username": "johndoe"
  }
}
```
- **Status Codes**:
  - `200` - Adoption animal created successfully
  - `400` - Bad request (validation errors, missing fields)
  - `401` - Unauthorized (missing or invalid token)
  - `404` - User not found
  - `500` - Server error

### PUT Update Adoption Animal
- **PUT** `/api/adoption/{id}`
- **Description**: Update an existing adoption animal post
- **Authentication**: Required (must be the creator or admin)
- **Path Parameter**: `id` - Adoption animal ID
- **Request Body**: Same as POST create
- **Response** (200 OK): Updated adoption animal object
- **Status Codes**:
  - `200` - Update successful
  - `400` - Bad request (validation errors)
  - `401` - Unauthorized
  - `403` - Forbidden (not authorized to update)
  - `404` - Adoption animal not found
  - `500` - Server error

### DELETE Adoption Animal
- **DELETE** `/api/adoption/{id}`
- **Description**: Delete an adoption animal post
- **Authentication**: Required (must be the creator or admin)
- **Path Parameter**: `id` - Adoption animal ID
- **Response** (200 OK):
```json
"Post Deleted Successfully 1"
```
- **Status Codes**:
  - `200` - Deletion successful
  - `401` - Unauthorized
  - `403` - Forbidden (not authorized to delete)
  - `404` - Adoption animal not found
  - `500` - Server error

### GET Adoption Animals by Creator
- **GET** `/api/adoption/user/{id}`
- **Description**: Get all adoption animals created by a specific user
- **Authentication**: Required
- **Query Parameters**: Same as GET list (pageNo, pageSize, sortBy, sortDir)
- **Response** (200 OK): Same format as GET list
- **Status Codes**:
  - `200` - Success
  - `401` - Unauthorized
  - `404` - User not found
  - `500` - Server error

---

## Missing Animals Resource

### GET List of Missing Animals
- **GET** `/api/missing/all`
- **Description**: Get paginated list of all missing animals
- **Authentication**: Not required (public endpoint)
- **Query Parameters**: Same as adoption animals (pageNo, pageSize, sortBy, sortDir)
- **Response** (200 OK): Similar structure to adoption animals
- **Status Codes**:
  - `200` - Success
  - `500` - Server error

### GET Missing Animal by ID
- **GET** `/api/missing/{id}`
- **Description**: Get a specific missing animal by ID
- **Authentication**: Not required (public endpoint)
- **Status Codes**:
  - `200` - Success
  - `404` - Missing animal not found
  - `500` - Server error

### POST Create Missing Animal
- **POST** `/api/missing/{id}/createmissingpost`
- **Description**: Create a new missing animal report
- **Authentication**: Required (JWT token)
- **Request Body**:
```json
{
  "name": "Fluffy",
  "breed": "Persian Cat",
  "color": "White",
  "datemissing": "2024-01-10",
  "specificattribute": "Has a blue collar",
  "location": "New York",
  "accessorieslastworn": "Blue collar with bell",
  "rewards": "500",
  "gender": "Female",
  "type": "Cat",
  "vaccine": "Vaccinated",
  "image": "https://example.com/missing-cat.jpg"
}
```
- **Status Codes**:
  - `200` - Missing animal created successfully
  - `400` - Bad request (validation errors)
  - `401` - Unauthorized
  - `404` - User not found
  - `500` - Server error

### PUT Update Missing Animal
- **PUT** `/api/missing/{id}`
- **Description**: Update a missing animal report
- **Authentication**: Required
- **Status Codes**:
  - `200` - Update successful
  - `400` - Bad request
  - `401` - Unauthorized
  - `404` - Missing animal not found
  - `500` - Server error

### DELETE Missing Animal
- **DELETE** `/api/missing/{id}`
- **Description**: Delete a missing animal report
- **Authentication**: Required
- **Status Codes**:
  - `200` - Deletion successful
  - `401` - Unauthorized
  - `404` - Missing animal not found
  - `500` - Server error

---

## Test Endpoint

### GET Ping
- **GET** `/api/ping`
- **Description**: Test endpoint to verify backend is running
- **Authentication**: Not required
- **Response** (200 OK):
```json
{
  "status": "ok",
  "message": "Backend is running",
  "timestamp": 1704067200000
}
```
- **Status Codes**:
  - `200` - Backend is running
  - `500` - Server error

---

## File Upload

### POST Upload File
- **POST** `/api/files/upload`
- **Description**: Upload an image file to Cloudinary
- **Authentication**: Not required (public endpoint for now)
- **Request**: `multipart/form-data` with field `file`
- **Response** (200 OK):
```
"https://res.cloudinary.com/example/image/upload/v1234567890/image.jpg"
```
- **Status Codes**:
  - `200` - Upload successful
  - `400` - Bad request (no file provided)
  - `500` - Server error (upload failed)

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "data": null,
  "errors": [
    {
      "field": "email",
      "message": "Email is already taken"
    }
  ]
}
```

---

## HTTP Status Codes Summary

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input, validation errors
- **401 Unauthorized** - Missing or invalid authentication token
- **403 Forbidden** - Authenticated but not authorized for this action
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## Notes

1. All timestamps are in ISO 8601 format (YYYY-MM-DD)
2. JWT tokens expire after a set period (configured in backend)
3. Pagination is 0-indexed (first page is pageNo=0)
4. Image URLs are stored as strings and point to Cloudinary CDN
5. The API uses CORS and is configured to accept requests from `http://localhost:3000`

