# AdoptAPaw - Backend and Frontend Run Instructions

## Overview

This document provides step-by-step instructions to run the AdoptAPaw web application backend and frontend locally.

**Backend**: Spring Boot (Java) with PostgreSQL  
**Frontend**: React with Redux  
**Database**: PostgreSQL

---

## Prerequisites

Before running the application, ensure you have the following installed:

1. **Java Development Kit (JDK) 11 or higher**
   - Check: `java -version`
   - Download: https://adoptium.net/

2. **Maven 3.6+**
   - Check: `mvn -version`
   - Download: https://maven.apache.org/download.cgi
   - Or use the included `mvnw` wrapper

3. **PostgreSQL 12+**
   - Check: `psql --version`
   - Download: https://www.postgresql.org/download/
   - Ensure PostgreSQL service is running

4. **Node.js 16+ and npm**
   - Check: `node -v` and `npm -v`
   - Download: https://nodejs.org/

5. **Git** (optional, for cloning repository)

---

## Backend Setup and Run Instructions

### Step 1: Configure Database

1. **Start PostgreSQL service**
   ```powershell
   # Windows PowerShell
   # PostgreSQL should be running as a service
   # Check if running:
   Get-Service postgresql*
   ```

2. **Create database** (if not exists)
   ```sql
   -- Connect to PostgreSQL
   psql -U postgres
   
   -- Create database
   CREATE DATABASE adoptapaw;
   
   -- Exit
   \q
   ```

### Step 2: Configure Environment Variables

1. **Navigate to backend directory**
   ```powershell
   cd backend
   ```

2. **Create `.env` file** in `backend/` directory
   ```powershell
   # Create .env file
   New-Item -Path .env -ItemType File
   ```

3. **Add the following content to `.env`**:
   ```env
   # Database Configuration
   DB_URL=jdbc:postgresql://localhost:5432/adoptapaw
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password

   # JWT Configuration
   JWT_SECRET=your-secret-key-minimum-512-bits-long-for-security
   JWT_EXPIRATION=86400000

   # Application Configuration
   site.base.url.https=http://localhost:3000

   # Cloudinary Configuration (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   **Important**: Replace placeholder values with your actual:
   - PostgreSQL password
   - JWT secret (use a strong random string)
   - Cloudinary credentials (sign up at https://cloudinary.com/ if needed)

4. **Save the file** with UTF-8 encoding (no BOM)

### Step 3: Run Backend

**Option A: Using Maven Wrapper (Recommended)**
```powershell
# Windows PowerShell
cd backend
.\mvnw.cmd clean
.\mvnw.cmd spring-boot:run
```

**Option B: Using Maven (if installed globally)**
```powershell
cd backend
mvn clean
mvn spring-boot:run
```

**Option C: Using IDE**
- Open the project in IntelliJ IDEA or Eclipse
- Import as Maven project
- Run `BackendApplication.java` as Java Application

### Step 4: Verify Backend is Running

1. **Check console output** - You should see:
   ```
   Started BackendApplication in X.XXX seconds
   ```

2. **Test the API**:
   - Open browser: `http://localhost:8081/swagger-ui.html`
   - Or test ping endpoint: `http://localhost:8081/api/ping` (if implemented)
   - Or test any public endpoint: `http://localhost:8081/api/adoption/all`

3. **Check logs** for any errors

### Backend Troubleshooting

**Issue: "Could not resolve placeholder 'JWT_SECRET'"**
- Solution: Ensure `.env` file exists in `backend/` directory with correct format
- Check file encoding is UTF-8 without BOM

**Issue: "FATAL: password authentication failed"**
- Solution: Verify PostgreSQL password in `.env` matches your PostgreSQL password
- Check `pg_hba.conf` if using trust authentication

**Issue: "Port 8081 already in use"**
- Solution: Stop other application using port 8081, or change port in `application.properties`

**Issue: "Database does not exist"**
- Solution: Create database using SQL command above

---

## Frontend Setup and Run Instructions

### Step 1: Install Dependencies

1. **Navigate to frontend directory**
   ```powershell
   cd frontend
   ```

2. **Install npm packages**
   ```powershell
   npm install
   ```

   This may take a few minutes. Wait for completion.

### Step 2: Configure API URL (if needed)

1. **Check API configuration**
   - File: `frontend/src/Utils/Production.js`
   - Should point to: `http://localhost:8081`

2. **Verify axios client configuration**
   - File: `frontend/src/services/api/client.js`
   - Base URL should be correct

### Step 3: Run Frontend

```powershell
# From frontend directory
npm start
```

The frontend will start on `http://localhost:3000` and should open automatically in your browser.

### Step 4: Verify Frontend is Running

1. **Browser should open** to `http://localhost:3000`
2. **Check browser console** (F12) for any errors
3. **Verify connection to backend**:
   - Try logging in or viewing adoption posts
   - Check Network tab in DevTools for API calls

### Frontend Troubleshooting

**Issue: "Cannot find module"**
- Solution: Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

**Issue: "Network error" or "Connection refused"**
- Solution: Ensure backend is running on port 8081
- Check `frontend/src/Utils/Production.js` has correct backend URL

**Issue: "Port 3000 already in use"**
- Solution: Stop other application, or use: `PORT=3001 npm start`

---

## Running Both Backend and Frontend

### Recommended Approach

**Terminal 1 - Backend:**
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

### Verification Checklist

- [ ] Backend running on `http://localhost:8081`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Swagger UI accessible at `http://localhost:8081/swagger-ui.html`
- [ ] Frontend can connect to backend (check Network tab)
- [ ] No errors in backend console
- [ ] No errors in browser console

---

## First-Time Setup Complete Workflow

1. **Install prerequisites** (Java, Maven, PostgreSQL, Node.js)
2. **Start PostgreSQL service**
3. **Create database**: `CREATE DATABASE adoptapaw;`
4. **Create `.env` file** in `backend/` with your configuration
5. **Run backend**: `cd backend && .\mvnw.cmd spring-boot:run`
6. **Wait for backend to start** (watch for "Started BackendApplication")
7. **Install frontend dependencies**: `cd frontend && npm install`
8. **Run frontend**: `npm start`
9. **Open browser** to `http://localhost:3000`
10. **Test the application**:
    - Register a new user
    - Login
    - Create an adoption post
    - View posts

---

## Development Workflow

### Making Backend Changes

1. Backend uses Spring Boot DevTools - **automatic restart** on code changes
2. If changes don't reflect, manually restart backend

### Making Frontend Changes

1. Frontend uses React hot reload - **automatic refresh** on code changes
2. Browser should update automatically

### Database Changes

1. If you modify entity classes, Hibernate will auto-update schema (if configured)
2. For major changes, you may need to drop and recreate database

---

## Stopping the Application

**Backend:**
- Press `Ctrl+C` in the terminal running backend

**Frontend:**
- Press `Ctrl+C` in the terminal running frontend

---

## Additional Resources

- **API Documentation**: `http://localhost:8081/swagger-ui.html`
- **Backend Logs**: Check console output
- **Frontend Logs**: Check browser console (F12)
- **Database**: Use pgAdmin or psql to view data

---

## Notes

1. **First Run**: Backend may take longer to start on first run (downloading dependencies)
2. **Database**: Ensure PostgreSQL is running before starting backend
3. **Ports**: Default ports are 8081 (backend) and 3000 (frontend)
4. **Environment Variables**: Never commit `.env` file to version control
5. **Cloudinary**: Image uploads require Cloudinary account (free tier available)

---

## Quick Start Commands Summary

```powershell
# Backend
cd backend
.\mvnw.cmd spring-boot:run

# Frontend (new terminal)
cd frontend
npm install  # First time only
npm start
```

---

## Support

If you encounter issues:

1. Check backend console for errors
2. Check browser console (F12) for frontend errors
3. Verify all prerequisites are installed
4. Ensure PostgreSQL is running
5. Verify `.env` file is correctly configured
6. Check that ports 8081 and 3000 are not in use

