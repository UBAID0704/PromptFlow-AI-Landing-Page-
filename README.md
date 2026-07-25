# 🤖 PromptFlow AI — Full Stack Internship Project

A modern, responsive, full-stack AI-powered web application built using **React.js**, **Vite**, **Express.js**, **bcrypt.js**, **multer**, and **JWT Authentication**. This project was completed as part of a **Full Stack Internship** and demonstrates modern frontend development, REST API integration, CRUD operations, secure authentication, route guarding, global state management, form validation, file uploads, and responsive UI/UX design.

The project evolved across six key milestones:

- **Week 1 – Task 1:** Consume a Public API (Responsive AI Landing Page)
- **Week 1 – Task 2:** Responsive UI From a Design Brief (Hugging Face API Integration)
- **Week 2 – Task 1:** Full CRUD: Frontend Talking to Your Own Backend (AI Model Ratings & Admin Moderation Panel)
- **Week 2 – Task 2:** Authentication Flow (Signup, Login, Password Hashing, & Protected Routes)
- **Week 3 – Task 1:** Global State, Data Fetching Patterns & UI Polish (Context API, Skeleton Loaders, Empty States)
- **Week 3 – Task 2:** Forms, Validation & Real User Feedback (Multi-Field Form, File Uploads, Dual Validation)

---

## 📌 Project Overview

**PromptFlow AI** is a full-stack platform designed to showcase live AI models, collect community ratings, gather detailed user feedback with attachments, and provide authenticated user accounts along with administrative moderation capabilities.

The platform includes:

- Responsive AI landing page with interactive UI sections
- Live AI model explorer powered by the Hugging Face API
- Community review and rating submission system
- Multi-field user feedback form with file upload support
- Password-protected Admin Moderation Console
- Secure User Authentication System (Signup, Login, & Session Management)
- JWT-secured API routes with bcrypt.js password hashing
- Protected user route guards with auto-redirects
- Centralized global state via React Context (no prop-drilling)
- Skeleton loading states and empty-state UI polish
- Real-time server active-session logging in the terminal

---

## 🚀 Week 1 – Task 1: Responsive AI Landing Page

### 🎯 Objective

Build a modern, component-based landing page for an AI product using React.js following mobile-first principles.

### ✨ Features

- Responsive navigation bar with smooth scrolling
- Hero banner with modern call-to-action buttons
- Feature showcase cards highlighting platform capabilities
- Interactive pricing tiers and contact inquiry section
- Reusable components styled with a dark glassmorphism theme

### 🚀 Learning Outcomes

- React component architecture
- Responsive UI development
- Mobile-first design
- Reusable component design
- Modern frontend workflow using Vite

---

## 🤖 Week 1 – Task 2: Hugging Face AI Model Explorer

### 🎯 Objective

Enhance the landing page by fetching live model data from a public API and rendering interactive UI elements dynamically.

### ✨ Features

- Dynamic API integration with Hugging Face (`AiModelsList.jsx`)
- Live search and filtering by model name or tags
- Loading indicators and error-handling states
- Responsive model cards with direct links to Hugging Face repositories

### 🔄 Data Flow

```
User → React Component → Fetch API → Hugging Face API → JSON Response → Dynamic UI Rendering
```

### 🚀 Skills Demonstrated

- REST API Integration
- Fetch API
- React Hooks (useState, useEffect)
- Dynamic rendering & state management
- Error handling

---

## ⭐ Week 2 – Task 1: AI Model Ratings & Admin Moderation Panel

### 🎯 Objective

Transform the site into a CRUD-enabled full-stack platform with public feedback submission and administrative controls.

### 🌟 Public Review Interface (`CrudDashboard.jsx`)

- Submit star ratings (1–5 stars) and feedback
- Scrollable community review feed
- Read-only layout preventing unauthorized editing or deletion

Public users **can**: create reviews, view reviews
Public users **cannot**: edit or delete reviews

### 🔒 Admin Moderation Panel (`AdminPanel.jsx`)

- Password-protected admin gate (`admin123`)
- JWT token stored in localStorage
- Full CRUD access: inspect, modify, or delete any user submission

### 🛡 Backend Security

- Protected Routes: `PUT`, `DELETE`
- Authentication middleware verifies Bearer Token & authorized administrator access
- Unauthorized users cannot modify or remove any review

---

## 🔐 Week 2 – Task 2: Real User Authentication & Protected Routes

### 🎯 Objective

Implement real user account management on the frontend and backend, with secure password handling, persistent sessions, and protected route access.

### ✨ Features

- **Dual-Purpose Auth Form (`AuthModal.jsx`):** Client-side validation rules (required fields, `@` email format, 6+ character password minimum)
- **Password Hashing (bcryptjs):** Encrypts user passwords securely on the Express server before saving
- **Token Storage & Session Persistence:** Issues JWTs on signup/login, saved in localStorage, attached as Bearer tokens in Authorization headers
- **Protected Dashboard Route (`Dashboard.jsx`):** Private workspace route guarded in `App.jsx`. Unauthenticated visitors are automatically redirected to the login interface
- **Logout & Session Termination:** Clears client tokens and notifies the backend to destroy active session references
- **Real-Time Active Session Logs:** Prints live terminal notifications whenever users log in, sign up, or log out

---

## 🧩 Week 3 – Task 1: Global State, Data Fetching Patterns & UI Polish

### 🎯 Objective

Centralize application state, eliminate prop-drilling across multi-level components, and polish asynchronous loading and zero-data UI states.

### ✨ Features & Implementation

- **Global State Architecture (`src/context/AppContext.jsx`):**
  Implemented React's Context API (`AppProvider` & `useApp` hook) to globally manage user authentication session (`user`), current active navigation tab (`activeTab`), admin moderation view toggle (`isAdminView`), and public community reviews (`reviews`).

- **Refactored Features (Prop-Drilling Removed):**
  - `Navbar.jsx`: Directly consumes `user`, `activeTab`, and `handleLogout` from the global store without receiving props from `App.jsx`.
  - `CrudDashboard.jsx`: Pulls `reviews`, `isReviewsLoading`, and `fetchReviews` directly from global context instead of managing localized fetching states.

- **Skeleton Loaders (`src/components/SkeletonLoader.jsx`):**
  Replaced blank screens and static spinners with CSS-animated shimmer placeholders (`<SkeletonCard/>`) while fetching asynchronous data.

- **Empty State UI (`src/components/EmptyState.jsx`):**
  Replaced empty lists and unhandled layout gaps with a clean fallback component (`<EmptyState/>`) when zero database records exist.

### 🚀 Skills Demonstrated

- React Context API & custom hooks
- Eliminating prop-drilling in multi-level component trees
- Asynchronous UI polish (skeleton loading states)
- Zero-data / empty-state UX design

---

## 📝 Week 3 – Task 2: Forms, Validation & Real User Feedback

### 🎯 Objective

Build a multi-field form connected to the backend with strict dual-layer validation (client & server), file upload capabilities, loading states, and toast notifications.

### ✨ Features & Implementation

- **6+ Input Fields (`UserFeedbackForm.jsx`):**
  1. `Full Name` — Text input, minimum 3 characters
  2. `Email Address` — Email input with regex validation
  3. `Category` — Dropdown `<select>` menu
  4. `Experience Date` — Date picker, blocks future dates
  5. `Attachment` — File input accepting `.png`, `.jpg`, `.jpeg`, and `.pdf` up to 5MB
  6. `Comments` — Textarea, minimum 10 characters

- **Dual-Layer Field Validation:**
  - **Client-Side:** Checks inputs instantly on submit and displays field-specific error messages directly under failing inputs.
  - **Server-Side Guard:** The Express server re-validates all payload fields. Never trusts frontend input alone and returns structured HTTP `400` errors if bypassed.

- **Multipart File Storage (`multer`):** Handles image/document uploads via `multer` middleware, storing them in `./uploads` and serving them statically.

- **UI Feedback & Loading States:**
  - Submit button disables during request processing (`isSubmitting`) to prevent double submission.
  - Features an inline spinning loading indicator.
  - Displays success or error toast banners above the form upon completion.

- **Unified Community Hub (`CrudDashboard.jsx`):** Combines the Week 2 Quick Reviews and Week 3 Detailed Form into a tabbed section (`⭐ Public Reviews` vs `📝 Report an Issue & Uploads`).

### 🚀 Skills Demonstrated

- Multi-field form design & React controlled inputs
- Client-side and server-side validation
- File upload handling with `multer`
- Middleware-based request guarding
- Async loading states & toast notification UX

---

## 📂 Complete Project Structure

```
AI-LANDING-PAGE/
│
├── .vscode/
├── node_modules/
│
├── server/
│   └── index.js             # Express backend with JWT auth, bcrypt, multer file processing,
│                             # dual-validation guards, and terminal logging
│
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx    # Reusable fallback card for zero-data states (NEW)
│   │   └── SkeletonLoader.jsx # Animated shimmer cards for async loading (NEW)
│   ├── context/
│   │   └── AppContext.jsx    # Global React Context provider & useApp hook (NEW)
│   ├── AdminPanel.jsx        # Protected admin moderation panel
│   ├── AiModelsList.jsx      # Live model explorer using Hugging Face API
│   ├── App.jsx               # Root layout wrapped in <AppProvider>, view router, and route guard logic (UPDATED)
│   ├── AuthModal.jsx         # Client-validated Signup & Login modal form
│   ├── Contact.jsx           # Contact section
│   ├── CrudDashboard.jsx     # Unified Community Hub & Support Center with tabs, using global store (UPDATED)
│   ├── Dashboard.jsx         # Protected user workspace route
│   ├── Features.jsx          # AI product features showcase
│   ├── Footer.jsx            # Platform footer
│   ├── Hero.jsx              # Hero section banner
│   ├── index.css             # Global dark-theme styles & glassmorphism
│   ├── main.jsx               # React entry point
│   ├── Navbar.jsx             # Navigation bar using direct global state (UPDATED)
│   ├── Pricing.jsx            # Subscription pricing tiers
│   └── UserFeedbackForm.jsx   # Multi-field feedback form with file upload & validation
│
├── uploads/                    # Static file storage directory for feedback attachments
├── index.html                 # Main HTML entry point
├── package.json               # Dependencies (express, cors, jsonwebtoken, bcryptjs, multer, vite, react)
├── package-lock.json          # Automatically generated dependency lock file
└── README.md                  # Project documentation
```

---

## 🔑 Credentials & Access Levels

| Role | Access Method / Password | Permissions |
|------|---------------------------|-------------|
| **Public Visitor** | None | Submit ratings & feedback, read community feedback |
| **Registered User** | Created via Signup | Access protected `/dashboard` & session persistence |
| **Administrator** | Password: `admin123` | Full CRUD access (Create, Read, Update, Delete) |

---

## 🌐 API Endpoints Overview

| Method | Endpoint | Access Level | Description |
|--------|----------|---------------|--------------|
| GET | `/api/contacts` | Public | Retrieve all community ratings & messages |
| POST | `/api/contacts` | Public | Submit new feedback record |
| POST | `/api/feedback` | Public | Submit multi-field feedback form with optional file attachment (multer, dual validation) |
| POST | `/api/auth/signup` | Public | Register new user account with hashed password |
| POST | `/api/auth/login` | Public | Authenticate user & issue signed JWT |
| POST | `/api/auth/logout` | User | Clear session from active tracking |
| GET | `/api/auth/me` | Protected | Verify user JWT token and fetch profile |
| POST | `/api/admin/login` | Admin | Authenticate admin password (`admin123`) |
| PUT | `/api/contacts/:id` | **Admin Only** | Update existing record (Requires JWT) |
| DELETE | `/api/contacts/:id` | **Admin Only** | Remove review from database (Requires JWT) |
| GET | `/api/admin/active-users` | Admin | View active sessions and real-time logs |

---

## 🎨 Design System

**Layout:** CSS Flexbox, CSS Grid, Responsive Breakpoints, Mobile-first Design
**Typography:** Clear hierarchy, consistent spacing, readable text
**UI Style:** Modern AI-inspired interface, dark theme, glassmorphism effects, interactive cards, smooth layouts, shimmer loading states, clean empty-state placeholders

---

## 🛠 Technologies Used

**Frontend:** React.js, Vite, JavaScript (ES6+), HTML5, CSS3, React Context API
**Backend:** Express.js, Node.js, JSON Web Token (JWT), bcrypt.js, multer, CORS
**API:** Hugging Face Models API, Fetch API

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/UBAID0704/PromptFlow-AI-Landing-Page-.git
cd ai-landing-page
```

### 2. Install Dependencies

```bash
# Install frontend & backend dependencies
npm install
npm install express cors jsonwebtoken bcryptjs multer
```

---

## ▶ Running the Application

To run the full-stack system, open **two separate terminal windows** in VS Code:

### Terminal 1: Express Backend API

```bash
node server/index.js
```

> **Output:** 🚀 Server running at http://localhost:5000

### Terminal 2: React Frontend App

```bash
npm run dev
```

> **Output:** VITE ready → Local: http://localhost:5173/

---

## 🖥️ Real-Time Terminal Activity Logs

While `node server/index.js` is running in Terminal 1, all authentication and management actions print live activity blocks directly to the console:

```
========================================
🔑 [USER LOGGED IN]
👤 User: Ubaidullah (ubaid@example.com)
⏰ Time: 8:45:12 PM
📊 Total Active Sessions: 1
========================================

📝 [RECORD UPDATED] ID #1 by Admin Console
🚪 [USER LOGGED OUT] User: Ubaidullah (ubaid@example.com)
📎 [FEEDBACK SUBMITTED] Attachment uploaded: report-screenshot.png
```

---

## 🧪 Testing Instructions (Week 3)

### Prerequisites

Make sure both the backend and frontend are running simultaneously:

```bash
# Terminal 1: Backend Server
cd server
node index.js

# Terminal 2: Frontend Client
npm run dev
```

### Step-by-Step Feature Verification

**1. Testing Global Context — No Prop-Drilling (Task 1)**
- Open http://localhost:5173 in your browser.
- Click Log In / Sign Up in the Navbar and sign in.
- Observe how the Navbar instantly displays the 👤 Dashboard and Logout options across all components without needing top-level prop re-renders.

**2. Testing Skeleton Loaders (Task 1)**
- Open Chrome DevTools (F12) → Network tab.
- Set network throttling to Slow 3G.
- Reload the page or switch tabs.
- Verify that animated shimmer cards (`<SkeletonCard/>`) appear inside the Public Feed and Admin Panel while `GET /api/contacts` is loading.

**3. Testing Empty States (Task 1)**
- Clear all items from your database/contacts endpoint.
- Navigate to the Community Feed or Admin Panel.
- Verify that the 📂 Database Empty / 📭 No Reviews Found card appears rather than a blank space.

**4. Testing Multi-Field Form Validation & Uploads (Task 2)**
- Go to the Report an Issue & Uploads tab inside the dashboard.
- Attempt submitting an empty form to observe field-specific error messages.
- Complete all fields (including selecting a category, date, and attaching a file) and submit.
- Verify the loading state on the submission button and the resulting feedback toast banner.

---

## 🎓 Learning Outcomes

**Frontend Development:** React.js, Component-Based Architecture, Responsive Web Design, Reusable UI Components, Modern CSS Layouts

**API Integration:** REST APIs, Fetch API, Dynamic Rendering, Search & Filtering, Loading & Error States

**Full Stack Development:** Express.js Backend, CRUD Operations, JWT Authentication, Protected Routes, Role-Based Access, RESTful API Design

**Forms & Validation:** Multi-Field Form Design, Client & Server-Side Validation, File Uploads with Multer, Loading States & Toast Notifications

**State Management & UI Polish:** React Context API, Eliminating Prop-Drilling, Skeleton Loading States, Empty-State UX Design

**Software Engineering:** Project Structure, State Management, Authentication Flow, Error Handling, Clean Code Organization

---

## 🔮 Future Improvements

- AI-powered content generation
- AI writing playground
- Database-backed user authentication
- Cloud database integration
- AI chatbot assistant
- Advanced AI model filtering
- User profiles
- Admin analytics dashboard
- Review moderation history
- Image generation support
- Bookmark favorite AI models

---

## 👨‍💻 Author

**Ubaidullah**
Computer Science Student — FAST NUCES
**GitHub:** [github.com/UBAID0704](https://github.com/UBAID0704)

---

## 📄 License

This project was developed for educational purposes and as part of a Full Stack Internship assessment.
