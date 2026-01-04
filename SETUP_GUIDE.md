# Complete Setup Guide - Getting Data to Show

## 🚀 Quick Start Checklist

### Step 1: Backend Setup

1. **Create Backend Environment File**
   - Create a file named `.env` in the `backend` folder (or set environment variables)
   - Copy this content:

   ```properties
   # Database Configuration
   DB_URL=jdbc:postgresql://localhost:5432/adoptapaw
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password

   # Server Port
   SERVER_PORT=8081

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-minimum-256-bits
   JWT_EXPIRATION=604800000

   # Mail Configuration (Optional for now)
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password

   # Site Configuration
   SITE_BASE_URL=http://localhost:3000

   # Logging
   LOG_LEVEL_SECURITY=INFO
   LOG_LEVEL_APP=INFO
   ```

2. **Start PostgreSQL Database**
   - Make sure PostgreSQL is running
   - Create a database named `adoptapaw` (or update DB_URL with your database name)
   ```sql
   CREATE DATABASE adoptapaw;
   ```

3. **Start Backend Server**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   - Wait for: "Started BackendApplication" message
   - Backend should be running on `http://localhost:8081`

### Step 2: Frontend Setup

1. **Create Frontend Environment File**
   - Create a file named `.env` in the `frontend` folder
   - Add this content:

   ```env
   REACT_APP_API_URL=http://localhost:8081
   REACT_APP_PRODUCTION=http://localhost:8081
   ```

2. **Install Dependencies** (if not done already)
   ```bash
   cd frontend
   npm install
   ```

3. **Start Frontend Server**
   ```bash
   npm start
   ```
   - Frontend should open at `http://localhost:3000`

### Step 3: Verify Connection

1. **Check Backend is Running**
   - Open browser: `http://localhost:8081/swagger-ui/`
   - You should see Swagger API documentation
   - If you see it, backend is working ✅

2. **Check Frontend Can Connect**
   - Open browser: `http://localhost:3000`
   - Open browser DevTools (F12) → Network tab
   - Try to register/login
   - Check if API calls are going to `http://localhost:8081`

### Step 4: Create Initial Data

**Option A: Register a New User**
1. Go to `http://localhost:3000/registration`
2. Fill in the form and register
3. Check your email for verification link (if email is configured)
4. Or check the database for the verification token

**Option B: Add Data via API (Using Swagger)**
1. Go to `http://localhost:8081/swagger-ui/`
2. Use the `/api/auth/signup` endpoint to create a user
3. Use other endpoints to create adoption posts, etc.

**Option C: Use SQL Scripts** (if you have seed data)
- Run SQL scripts to insert initial data into the database

## 🔧 Troubleshooting

### Issue: "Network Error" or "Cannot connect"

**Check:**
1. ✅ Backend is running on port 8081
2. ✅ Frontend `.env` has `REACT_APP_API_URL=http://localhost:8081`
3. ✅ Restarted frontend after creating `.env` file
4. ✅ No firewall blocking localhost:8081
5. ✅ Check browser console (F12) for CORS errors

**Fix CORS if needed:**
- Backend `SecurityConfig.java` should allow `http://localhost:3000`
- Check `application.properties` has correct `SITE_BASE_URL`

### Issue: "Cannot POST /undefined/api/auth/..."

**Fix:**
- Make sure `.env` file exists in `frontend` folder
- Make sure it has `REACT_APP_API_URL=http://localhost:8081`
- **Restart the frontend server** (important!)

### Issue: Database Connection Error

**Check:**
1. PostgreSQL is running
2. Database `adoptapaw` exists
3. Username/password in `.env` are correct
4. Database URL format is correct: `jdbc:postgresql://localhost:5432/adoptapaw`

### Issue: No Data Showing

**Check:**
1. Database has data (check with pgAdmin or psql)
2. Backend API returns data (test in Swagger)
3. Frontend Redux state is being populated
4. Check browser console for errors

## 📝 Quick Test Steps

1. **Test Backend:**
   ```bash
   curl http://localhost:8081/api/adoption/all?pageNo=0&pageSize=10
   ```
   Should return JSON data or empty array

2. **Test Frontend Connection:**
   - Open `http://localhost:3000`
   - Open DevTools → Network tab
   - Navigate to Adoption page
   - Check if requests go to `localhost:8081`

3. **Test Registration:**
   - Go to Registration page
   - Fill form and submit
   - Check Network tab for successful API call
   - Check if user appears in database

## 🎯 Expected Behavior

**When everything works:**
- ✅ Backend runs without errors
- ✅ Frontend connects to backend
- ✅ Registration/Login works
- ✅ Adoption posts appear on Adoption page
- ✅ No "Network Error" messages
- ✅ Data loads from database

## 📋 Environment Variables Summary

**Backend `.env` (or system environment variables):**
- `DB_URL` - PostgreSQL connection string
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT tokens
- `SITE_BASE_URL` - Frontend URL for CORS

**Frontend `.env`:**
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_PRODUCTION` - Same as above (for old actions)

---

**Need help?** Check the browser console (F12) and backend logs for specific error messages!

