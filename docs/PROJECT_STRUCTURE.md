# Project Structure Documentation

## Overview

This document describes the structure of the AdoptAPaw web application, including backend and frontend organization.

---

## Backend Structure

The backend is built with **Spring Boot** (Java) and follows a layered architecture:

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── adptapaw/
│   │   │           └── backend/
│   │   │               ├── BackendApplication.java      # Main application class
│   │   │               ├── config/                      # Configuration classes
│   │   │               │   ├── SecurityConfig.java      # Spring Security config
│   │   │               │   ├── SwaggerConfig.java       # API documentation
│   │   │               │   └── DataSeeder.java         # Database seeding
│   │   │               ├── controller/                  # REST Controllers
│   │   │               │   ├── AdoptionAnimalController.java
│   │   │               │   ├── MissingAnimalController.java
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── PingController.java     # Test endpoint
│   │   │               │   └── ...
│   │   │               ├── service/                     # Business logic
│   │   │               │   ├── AdoptionAnimalService.java
│   │   │               │   ├── MissingAnimalService.java
│   │   │               │   └── ...
│   │   │               ├── repository/                  # Data access layer
│   │   │               │   ├── AdoptionAnimalRepository.java
│   │   │               │   ├── UserRepository.java
│   │   │               │   └── ...
│   │   │               ├── entity/                      # JPA entities
│   │   │               │   ├── AdoptionAnimal.java
│   │   │               │   ├── MissingAnimal.java
│   │   │               │   ├── User.java
│   │   │               │   └── ...
│   │   │               ├── payload/                     # DTOs (Data Transfer Objects)
│   │   │               │   ├── adoption/
│   │   │               │   ├── missing/
│   │   │               │   └── ...
│   │   │               ├── security/                     # Security components
│   │   │               │   ├── JWTTokenProvider.java
│   │   │               │   ├── JWTAuthenticationFilter.java
│   │   │               │   └── ...
│   │   │               ├── exception/                   # Exception handling
│   │   │               │   ├── GlobalExceptionHandler.java
│   │   │               │   ├── ResourceNotFoundException.java
│   │   │               │   └── ...
│   │   │               └── utils/                       # Utility classes
│   │   └── resources/
│   │       ├── application.properties                   # Application config
│   │       └── templates/                               # Email templates
│   └── test/                                             # Test classes
├── pom.xml                                               # Maven dependencies
├── mvnw                                                  # Maven wrapper
└── .env                                                  # Environment variables (not in git)
```

### Key Components

#### Controllers (`controller/`)
- Handle HTTP requests and responses
- Map URLs to service methods
- Return JSON responses
- Examples:
  - `AdoptionAnimalController` - CRUD operations for adoption animals
  - `MissingAnimalController` - CRUD operations for missing animals
  - `AuthController` - Authentication and user management
  - `PingController` - Test endpoint (`GET /api/ping`)

#### Services (`service/`)
- Contain business logic
- Interface and implementation pattern
- Examples:
  - `AdoptionAnimalService` - Business logic for adoption animals
  - `MissingAnimalService` - Business logic for missing animals

#### Repositories (`repository/`)
- Data access layer using Spring Data JPA
- Extend `JpaRepository<T, ID>`
- Examples:
  - `AdoptionAnimalRepository` - Database operations for adoption animals
  - `UserRepository` - Database operations for users

#### Entities (`entity/`)
- JPA entities representing database tables
- Annotated with `@Entity`, `@Table`
- Examples:
  - `AdoptionAnimal` - Adoption animal entity
  - `MissingAnimal` - Missing animal entity
  - `User` - User entity

#### Payloads (`payload/`)
- DTOs (Data Transfer Objects) for API requests/responses
- Separate from entities for API contract
- Examples:
  - `AdoptionAnimalDTO` - Adoption animal data transfer
  - `MissingAnimalDTO` - Missing animal data transfer

#### Security (`security/`)
- JWT token generation and validation
- Authentication filters
- Examples:
  - `JWTTokenProvider` - JWT token operations
  - `JWTAuthenticationFilter` - Request authentication

---

## Frontend Structure

The frontend is built with **React** and **Redux**:

```
frontend/
├── public/
│   ├── index.html
│   └── assets/                                          # Static assets
├── src/
│   ├── actions/                                          # Redux actions
│   │   ├── adoptionActions.js
│   │   ├── missingAnimalActions.js
│   │   ├── userActions.js
│   │   └── ...
│   ├── Components/                                       # React components
│   │   ├── Button.js
│   │   ├── Cards/
│   │   ├── Nav/
│   │   └── ...
│   ├── Pages/                                            # Page components
│   │   ├── Homepage.js
│   │   ├── Adoptionpage.js
│   │   ├── CreateAdoptionPost.js
│   │   ├── CreateMissingPostpage.js
│   │   ├── LoginPage.js
│   │   └── ...
│   ├── reducers/                                        # Redux reducers
│   │   ├── adoptionReducer.js
│   │   ├── missingAnimalReducer.js
│   │   └── ...
│   ├── services/
│   │   └── api/
│   │       └── client.js                                # Axios configuration
│   ├── store/
│   │   ├── index.js                                      # Redux store
│   │   └── slices/
│   │       └── authSlice.js                              # Auth Redux slice
│   ├── hooks/
│   │   └── useAuth.js                                    # Authentication hook
│   ├── Utils/
│   │   └── Production.js                                 # API URL configuration
│   ├── App.js                                            # Main app component
│   └── index.js                                          # Entry point
├── package.json                                          # Dependencies
└── tailwind.config.js                                    # Tailwind CSS config
```

### Key Components

#### Actions (`actions/`)
- Redux action creators
- Make API calls using axios
- Dispatch actions to reducers
- Examples:
  - `adoptionActions.js` - Adoption post actions
  - `missingAnimalActions.js` - Missing post actions

#### Pages (`Pages/`)
- Main page components
- Route components
- Examples:
  - `Homepage.js` - Home page
  - `Adoptionpage.js` - Adoption posts listing
  - `CreateAdoptionPost.js` - Create adoption post form
  - `LoginPage.js` - Login form

#### Components (`Components/`)
- Reusable UI components
- Examples:
  - `Button.js` - Button component
  - `Cards/` - Card components
  - `Nav/` - Navigation components

#### Reducers (`reducers/`)
- Redux reducers
- Handle state updates
- Examples:
  - `adoptionReducer.js` - Adoption state management
  - `missingAnimalReducer.js` - Missing animal state management

#### Services (`services/api/`)
- API client configuration
- Axios instance setup
- Request/response interceptors
- Example:
  - `client.js` - Axios client with base URL and interceptors

---

## Database Structure

**Database**: PostgreSQL

**Main Tables**:
- `users` - User accounts
- `adoptionanimal` - Adoption posts
- `missinganimal` - Missing animal reports
- `adoptionrequest` - Adoption requests
- `roles` - User roles (USER, ADMIN)
- `token` - Email verification and password reset tokens

**Relationships**:
- User → AdoptionAnimal (one-to-many)
- User → MissingAnimal (one-to-many)
- AdoptionAnimal → AdoptionRequest (one-to-many)
- User → Roles (many-to-many)

---

## API Structure

**Base URL**: `http://localhost:8081/api`

**Main Endpoints**:
- `/api/auth/**` - Authentication endpoints
- `/api/adoption/**` - Adoption animal endpoints
- `/api/missing/**` - Missing animal endpoints
- `/api/files/upload` - File upload endpoint
- `/api/ping` - Test endpoint

**Documentation**: Swagger UI at `http://localhost:8081/swagger-ui.html`

---

## Configuration Files

### Backend
- `application.properties` - Spring Boot configuration
- `.env` - Environment variables (database, JWT, Cloudinary)
- `pom.xml` - Maven dependencies

### Frontend
- `package.json` - npm dependencies
- `tailwind.config.js` - Tailwind CSS configuration
- `src/Utils/Production.js` - API base URL

---

## Development Workflow

1. **Backend Changes**:
   - Modify Java files in `backend/src/main/java/`
   - Spring Boot DevTools auto-restarts on changes
   - Test via Swagger UI or Postman

2. **Frontend Changes**:
   - Modify React components in `frontend/src/`
   - React hot reload updates browser automatically
   - Test in browser with DevTools open

3. **Database Changes**:
   - Modify entity classes
   - Hibernate auto-updates schema (if configured)
   - Or manually run migrations

---

## Notes

- Backend uses **Spring Boot** (not FastAPI as mentioned in some requirements)
- Database uses **PostgreSQL** (not SQLite)
- All functional requirements are met despite technology differences
- Code follows clean architecture principles
- Separation of concerns: Controller → Service → Repository → Entity

