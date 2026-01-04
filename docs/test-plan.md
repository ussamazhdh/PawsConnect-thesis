# Test Plan - AdoptAPaw Web System

## Overview

This document outlines end-to-end test scenarios for the AdoptAPaw web application. The tests cover authentication, CRUD operations for adoption animals and missing animals, user management, and frontend-backend integration.

---

## Test Environment Setup

**Backend URL**: `http://localhost:8081`  
**Frontend URL**: `http://localhost:3000`  
**Database**: PostgreSQL (running locally)

**Prerequisites**:
- Backend server running on port 8081
- Frontend server running on port 3000
- PostgreSQL database running and configured
- Valid `.env` file in `backend/` directory

---

## Test Scenarios

### 1. Authentication Tests

#### 1.1 User Registration
**Objective**: Verify new users can register successfully

**Steps**:
1. Navigate to `/register` page
2. Fill in registration form:
   - Name: "Test User"
   - Username: "testuser"
   - Email: "test@example.com"
   - Password: "password123"
   - Bio: "Test bio"
   - Location: "Test City"
3. Click "Register" button
4. Check email for verification link

**Expected Results**:
- ✅ Registration form submits successfully
- ✅ Success message displayed: "Registration successful. Please check your email to verify your account."
- ✅ User redirected to confirmation page
- ✅ Verification email sent (check email inbox)
- ✅ User can verify account via email link

**API Test**:
```bash
POST http://localhost:8081/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "bio": "Test bio",
  "location": "Test City"
}
```
**Expected**: 201 Created with user details

---

#### 1.2 User Login
**Objective**: Verify users can login and receive JWT token

**Steps**:
1. Navigate to `/login` page
2. Enter credentials:
   - Email: "test@example.com"
   - Password: "password123"
3. Click "Login" button

**Expected Results**:
- ✅ Login successful
- ✅ JWT token stored in localStorage
- ✅ User redirected to home page or dashboard
- ✅ User info displayed in navigation

**API Test**:
```bash
POST http://localhost:8081/api/auth/signin
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```
**Expected**: 200 OK with JWT token in response

---

#### 1.3 Invalid Login
**Objective**: Verify error handling for invalid credentials

**Steps**:
1. Navigate to `/login` page
2. Enter invalid credentials:
   - Email: "wrong@example.com"
   - Password: "wrongpassword"
3. Click "Login" button

**Expected Results**:
- ✅ Error message displayed: "Invalid email or password"
- ✅ User remains on login page
- ✅ No token stored

**API Test**:
```bash
POST http://localhost:8081/api/auth/signin
Content-Type: application/json

{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```
**Expected**: 400 Bad Request with error message

---

### 2. Adoption Animals CRUD Tests

#### 2.1 Create Adoption Post
**Objective**: Verify authenticated users can create adoption posts

**Prerequisites**: User must be logged in

**Steps**:
1. Navigate to `/create-adoption-post` page
2. Fill in form:
   - Pet Name: "Buddy"
   - Breed: "Golden Retriever"
   - Color: "Golden"
   - Gender: "Male"
   - Type: "Dog"
   - Training: "Trained"
   - Vaccine: "Vaccinated"
   - Description: "Friendly dog looking for a home"
   - Physical Condition: "Healthy"
   - Location: "New York"
   - Behaviour: "Friendly"
   - Food: "Dry food"
   - Mobile: "1234567890"
3. Upload at least one image
4. Click "Create Post" button

**Expected Results**:
- ✅ Form validation passes
- ✅ Post created successfully
- ✅ Success message displayed
- ✅ User redirected to adoption posts page
- ✅ New post appears in list
- ✅ Images uploaded and displayed correctly

**API Test**:
```bash
POST http://localhost:8081/api/adoption/{userId}/createadoptionpost
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Buddy",
  "breed": "Golden Retriever",
  "training": "Trained",
  "vaccine": "Vaccinated",
  "color": "Golden",
  "description": "Friendly dog looking for a home",
  "physicalcondition": "Healthy",
  "location": "New York",
  "behaviour": "Friendly",
  "food": "Dry food",
  "gender": "Male",
  "type": "Dog",
  "mobile": "1234567890",
  "imageone": "https://example.com/image1.jpg"
}
```
**Expected**: 200 OK with created adoption animal object

---

#### 2.2 Get All Adoption Posts
**Objective**: Verify public access to adoption posts list

**Steps**:
1. Navigate to `/adoption` page (or home page)
2. View list of adoption posts

**Expected Results**:
- ✅ List of adoption posts displayed
- ✅ Pagination works correctly
- ✅ Images load correctly
- ✅ Post details visible (name, breed, location, etc.)
- ✅ Clicking a post navigates to detail page

**API Test**:
```bash
GET http://localhost:8081/api/adoption/all?pageNo=0&pageSize=10
```
**Expected**: 200 OK with paginated list of adoption animals

---

#### 2.3 Get Adoption Post by ID
**Objective**: Verify individual post details are accessible

**Steps**:
1. Navigate to `/adoption` page
2. Click on any adoption post card
3. View post details page

**Expected Results**:
- ✅ Post details page loads
- ✅ All post information displayed correctly
- ✅ Images displayed
- ✅ Contact information visible
- ✅ "Request Adoption" button visible (if logged in)

**API Test**:
```bash
GET http://localhost:8081/api/adoption/{id}
```
**Expected**: 200 OK with adoption animal details

---

#### 2.4 Update Adoption Post
**Objective**: Verify users can update their own posts

**Prerequisites**: User must be logged in and be the creator of the post

**Steps**:
1. Navigate to user's adoption posts page
2. Click "Edit" on a post
3. Modify fields (e.g., change description)
4. Click "Update" button

**Expected Results**:
- ✅ Form pre-filled with existing data
- ✅ Changes saved successfully
- ✅ Success message displayed
- ✅ Updated post reflects changes

**API Test**:
```bash
PUT http://localhost:8081/api/adoption/{id}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Buddy Updated",
  "description": "Updated description",
  ...
}
```
**Expected**: 200 OK with updated adoption animal object

---

#### 2.5 Delete Adoption Post
**Objective**: Verify users can delete their own posts

**Prerequisites**: User must be logged in and be the creator of the post

**Steps**:
1. Navigate to user's adoption posts page
2. Click "Delete" on a post
3. Confirm deletion

**Expected Results**:
- ✅ Confirmation dialog appears
- ✅ Post deleted successfully
- ✅ Success message displayed
- ✅ Post removed from list

**API Test**:
```bash
DELETE http://localhost:8081/api/adoption/{id}
Authorization: Bearer <jwt_token>
```
**Expected**: 200 OK with success message

---

### 3. Missing Animals CRUD Tests

#### 3.1 Create Missing Post
**Objective**: Verify authenticated users can create missing animal reports

**Prerequisites**: User must be logged in

**Steps**:
1. Navigate to `/create-missing-post` page
2. Fill in form:
   - Pet Name: "Fluffy"
   - Breed: "Persian Cat"
   - Color: "White"
   - Gender: "Female"
   - Type: "Cat"
   - Date Missing: "2024-01-10"
   - Location: "New York"
   - Specific Attribute: "Has blue collar"
   - Accessories Last Worn: "Blue collar with bell"
   - Reward: "500"
   - Vaccine: "Vaccinated"
3. Upload image
4. Click "Create Post" button

**Expected Results**:
- ✅ Form validation passes
- ✅ Missing post created successfully
- ✅ Success message displayed
- ✅ User redirected to missing animals page
- ✅ New post appears in list

**API Test**:
```bash
POST http://localhost:8081/api/missing/{userId}/createmissingpost
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Fluffy",
  "breed": "Persian Cat",
  "color": "White",
  "datemissing": "2024-01-10",
  "specificattribute": "Has blue collar",
  "location": "New York",
  "accessorieslastworn": "Blue collar with bell",
  "rewards": "500",
  "gender": "Female",
  "type": "Cat",
  "vaccine": "Vaccinated",
  "image": "https://example.com/missing-cat.jpg"
}
```
**Expected**: 200 OK with created missing animal object

---

#### 3.2 Get All Missing Posts
**Objective**: Verify public access to missing animals list

**Steps**:
1. Navigate to `/missing` page
2. View list of missing animals

**Expected Results**:
- ✅ List of missing animals displayed
- ✅ Pagination works correctly
- ✅ Images load correctly
- ✅ Post details visible

**API Test**:
```bash
GET http://localhost:8081/api/missing/all?pageNo=0&pageSize=10
```
**Expected**: 200 OK with paginated list

---

#### 3.3 Get Missing Post by ID
**Objective**: Verify individual missing post details are accessible

**Steps**:
1. Navigate to `/missing` page
2. Click on any missing post card
3. View post details page

**Expected Results**:
- ✅ Post details page loads
- ✅ All information displayed correctly
- ✅ "Report Sighting" button visible

**API Test**:
```bash
GET http://localhost:8081/api/missing/{id}
```
**Expected**: 200 OK with missing animal details

---

#### 3.4 Update Missing Post
**Objective**: Verify users can update their missing posts

**Prerequisites**: User must be logged in and be the creator

**Steps**:
1. Navigate to user's missing posts page
2. Click "Edit" on a post
3. Modify fields
4. Click "Update" button

**Expected Results**:
- ✅ Changes saved successfully
- ✅ Updated post reflects changes

**API Test**:
```bash
PUT http://localhost:8081/api/missing/{id}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Fluffy Updated",
  ...
}
```
**Expected**: 200 OK with updated missing animal object

---

#### 3.5 Delete Missing Post
**Objective**: Verify users can delete their missing posts

**Prerequisites**: User must be logged in and be the creator

**Steps**:
1. Navigate to user's missing posts page
2. Click "Delete" on a post
3. Confirm deletion

**Expected Results**:
- ✅ Post deleted successfully
- ✅ Post removed from list

**API Test**:
```bash
DELETE http://localhost:8081/api/missing/{id}
Authorization: Bearer <jwt_token>
```
**Expected**: 200 OK with success message

---

### 4. File Upload Tests

#### 4.1 Upload Image
**Objective**: Verify image upload functionality

**Steps**:
1. Navigate to create post page (adoption or missing)
2. Click on image upload area
3. Select an image file (JPG, PNG)
4. Wait for upload to complete

**Expected Results**:
- ✅ Image preview displayed immediately
- ✅ Upload progress indicator shown
- ✅ Image URL received from backend
- ✅ Image displayed in form
- ✅ No errors during upload

**API Test**:
```bash
POST http://localhost:8081/api/files/upload
Content-Type: multipart/form-data

file: <image file>
```
**Expected**: 200 OK with image URL string

---

#### 4.2 Upload Invalid File
**Objective**: Verify error handling for invalid files

**Steps**:
1. Navigate to create post page
2. Try to upload a non-image file (e.g., .txt, .pdf)
3. Or try to upload a very large file

**Expected Results**:
- ✅ Error message displayed
- ✅ Upload rejected
- ✅ Form remains usable

**API Test**:
```bash
POST http://localhost:8081/api/files/upload
Content-Type: multipart/form-data

file: <invalid file>
```
**Expected**: 400 Bad Request or 500 Server Error

---

### 5. Authorization Tests

#### 5.1 Unauthorized Access to Protected Endpoints
**Objective**: Verify protected endpoints require authentication

**Steps**:
1. Logout or clear browser localStorage
2. Try to access:
   - Create adoption post page
   - Create missing post page
   - User profile edit page

**Expected Results**:
- ✅ User redirected to login page
- ✅ Cannot access protected pages without authentication

**API Test**:
```bash
POST http://localhost:8081/api/adoption/{userId}/createadoptionpost
(No Authorization header)
```
**Expected**: 401 Unauthorized

---

#### 5.2 Unauthorized Update/Delete
**Objective**: Verify users cannot modify others' posts

**Prerequisites**: Two users logged in (User A and User B)

**Steps**:
1. User A creates a post
2. User B tries to update/delete User A's post

**Expected Results**:
- ✅ Update/Delete request rejected
- ✅ Error message: "Not authorized" or "Forbidden"
- ✅ Post remains unchanged

**API Test**:
```bash
PUT http://localhost:8081/api/adoption/{otherUserPostId}
Authorization: Bearer <userB_token>
```
**Expected**: 403 Forbidden

---

### 6. Frontend-Backend Integration Tests

#### 6.1 End-to-End Post Creation Flow
**Objective**: Verify complete flow from frontend to backend

**Steps**:
1. Login as user
2. Navigate to create adoption post
3. Fill form and submit
4. Verify post appears in list
5. Click on post to view details
6. Verify all data matches what was submitted

**Expected Results**:
- ✅ All steps complete without errors
- ✅ Data persists correctly
- ✅ UI updates reflect backend changes
- ✅ No console errors

---

#### 6.2 Error Handling
**Objective**: Verify frontend handles backend errors gracefully

**Steps**:
1. Create a post with invalid data (e.g., missing required fields)
2. Try to access non-existent post (ID: 99999)
3. Try to login with wrong credentials

**Expected Results**:
- ✅ Error messages displayed to user
- ✅ User-friendly error messages (not technical)
- ✅ Application remains functional after errors
- ✅ No crashes or blank screens

---

### 7. Validation Tests

#### 7.1 Form Validation
**Objective**: Verify client-side and server-side validation

**Steps**:
1. Try to submit form with empty required fields
2. Try to submit form with invalid email format
3. Try to submit form with invalid data types

**Expected Results**:
- ✅ Client-side validation prevents submission
- ✅ Error messages highlight invalid fields
- ✅ Server-side validation catches any bypassed client validation
- ✅ 400 Bad Request returned for invalid data

---

## Test Execution Checklist

- [ ] All authentication tests pass
- [ ] All adoption animals CRUD tests pass
- [ ] All missing animals CRUD tests pass
- [ ] File upload tests pass
- [ ] Authorization tests pass
- [ ] Frontend-backend integration tests pass
- [ ] Validation tests pass
- [ ] Error handling works correctly
- [ ] No console errors in browser
- [ ] No server errors in backend logs

---

## Known Issues and Limitations

1. **Email Verification**: Email service may not work in development environment - verification can be tested via direct API call
2. **Image Upload**: Requires Cloudinary account configuration in `.env` file
3. **Database**: Requires PostgreSQL running and configured

---

## Test Data

**Test Users**:
- Email: `test@example.com`, Password: `password123`
- Email: `admin@example.com`, Password: `admin123` (if admin account exists)

**Test Posts**:
- Use unique names/breeds for each test run to avoid conflicts
- Clean up test data after testing if needed

---

## Notes

- All API tests can be performed using Postman, curl, or browser DevTools
- Frontend tests should be performed in browser with DevTools console open
- Backend logs should be monitored during testing for any errors
- Database should be checked to verify data persistence

