# 🤖 PromptFlow AI — Full Stack Internship Project

A modern, responsive, and full-stack AI-powered web application built using **React.js**, **Vite**, **Express.js**, and **JWT Authentication**. This project was completed as part of a **Full Stack Internship** and demonstrates frontend development, API integration, CRUD operations, authentication, and responsive UI/UX design.

The project was completed in multiple phases:

- **Week 1 – Task 1:** Consume a Public API (Responsive AI Landing Page)
- **Week 1 – Task 2:** Responsive UI From a Design Brief (Hugging Face API Integration)
- **Week 2 – Task 1:** Full CRUD: Frontend Talking to Your Own Backend (AI Model Ratings & Admin Moderation Panel)

---

# 📌 Project Overview

PromptFlow AI is an AI-focused web application designed to showcase AI-powered tools while allowing users to explore AI models and share community feedback.

The project evolved from a static landing page into a full-stack application featuring:

- Responsive AI landing page
- Live AI model explorer
- Community AI model ratings
- Admin moderation dashboard
- JWT-secured CRUD operations
- REST API integration
- Responsive modern UI

---

# 🚀 Week 1 – Task 1: Responsive AI Landing Page

## 🎯 Objective

Build a modern and fully responsive landing page for an AI product using React.js while following component-based architecture and responsive design principles.

---

## ✨ Features

- Responsive Navigation Bar
- Hero Section
- AI Feature Showcase
- Pricing Plans
- Contact Section
- Footer
- Mobile-first responsive layout
- Reusable React components
- Modern glassmorphism UI

---

## 🛠 Technologies Used

### Frontend

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

---

## 📂 Component Structure

```
src/

├── App.jsx
├── main.jsx
├── index.css
├── Navbar.jsx
├── Hero.jsx
├── Features.jsx
├── Pricing.jsx
├── Contact.jsx
└── Footer.jsx
```

---

## 🚀 Learning Outcomes

- React component architecture
- Responsive UI development
- Mobile-first design
- Reusable component design
- Modern frontend workflow using Vite

---

# 🤖 Week 1 – Task 2: Hugging Face AI Model Explorer

## 🎯 Objective

Enhance the landing page by integrating a public API to display live AI model information dynamically.

---

## ✨ Features

- Fetch AI models from Hugging Face API
- Dynamic rendering
- Search/filter functionality
- Loading state
- Error handling
- Responsive model cards

---

## 📂 Additional Component

```
AiModelsList.jsx
```

Responsible for:

- Fetching AI model data
- Managing loading state
- Handling API errors
- Filtering models
- Rendering dynamic content

---

## 🔄 Data Flow

```
User

↓

React Component

↓

Fetch API

↓

Hugging Face API

↓

JSON Response

↓

Dynamic UI Rendering
```

---

## 🚀 Skills Demonstrated

- REST API Integration
- Fetch API
- React Hooks
- useState
- useEffect
- Dynamic rendering
- State management
- Error handling

---

# ⭐ Week 2 – Task 1: AI Model Ratings & Admin Moderation Panel

## 🎯 Objective

Transform the application into a secure full-stack system by adding CRUD functionality, public reviews, administrator moderation, and JWT authentication.

---

# 🌟 Public Review Interface

Implemented inside:

```
CrudDashboard.jsx
```

Features include:

- Submit AI model ratings
- Interactive 1–5 star selector
- Leave community feedback
- View public reviews
- Scrollable review feed
- Read-only interface for visitors

Public users can:

- Create reviews
- View reviews

Public users cannot:

- Edit reviews
- Delete reviews

---

# 🔒 Admin Moderation Panel

Implemented inside:

```
AdminPanel.jsx
```

Features include:

- Admin login
- Password-protected dashboard
- JWT authentication
- Review moderation
- Edit reviews
- Delete reviews
- Persistent login using localStorage

---

# 🛡 Backend Security

Implemented using:

- Express.js
- JSON Web Token (JWT)

Protected Routes:

- PUT
- DELETE

Authentication Middleware verifies:

- Bearer Token
- Authorized administrator access

Unauthorized users cannot modify or remove any review.

---

# ⚙ Backend Features

- Express Server
- JWT Authentication
- REST API
- CRUD Operations
- Authentication Middleware
- Protected Endpoints
- Safe JSON Parsing
- Error Handling

---

# 📂 Project Structure

```text
AI-LANDING-PAGE/
│
├── server/
│   └── index.js
│       # Express backend with CRUD APIs, JWT authentication, and protected routes
│
├── src/
│   ├── AdminPanel.jsx
│   │   # Protected admin dashboard for review moderation
│   │
│   ├── AiModelsList.jsx
│   │   # Fetches and displays AI models from the Hugging Face API
│   │
│   ├── App.jsx
│   │   # Main application layout and routing between components
│   │
│   ├── Contact.jsx
│   │   # Contact section
│   │
│   ├── CrudDashboard.jsx
│   │   # Public AI model ratings and feedback interface
│   │
│   ├── Features.jsx
│   │   # AI feature showcase
│   │
│   ├── Footer.jsx
│   │   # Footer section
│   │
│   ├── Hero.jsx
│   │   # Hero banner and call-to-action
│   │
│   ├── index.css
│   │   # Global styles and responsive design
│   │
│   ├── main.jsx
│   │   # React application entry point
│   │
│   ├── Navbar.jsx
│   │   # Responsive navigation bar
│   │
│   └── Pricing.jsx
│       # Pricing plans section
│
├── index.html
│   # Main HTML template
│
├── package.json
│   # Project metadata, dependencies, and scripts
│
├── package-lock.json
│   # Automatically generated dependency lock file
│
└── README.md
    # Project documentation
```

# 🔑 Admin Credentials

| Role | Password | Permissions |
|------|----------|-------------|
| Admin | admin123 | Full CRUD Access |
| Public User | None | Create & Read Only |

---

# 🌐 API Endpoints

| Method | Endpoint | Access | Description |
|---------|----------|--------|-------------|
| GET | /api/contacts | Public | Retrieve all reviews |
| POST | /api/contacts | Public | Submit a review |
| POST | /api/admin/login | Public | Authenticate administrator |
| PUT | /api/contacts/:id | Admin | Update review |
| DELETE | /api/contacts/:id | Admin | Delete review |

---

# 🎨 Design System

The application follows a consistent visual design system.

## Layout

- CSS Flexbox
- CSS Grid
- Responsive Breakpoints
- Mobile-first Design

## Typography

- Clear hierarchy
- Consistent spacing
- Readable text

## UI Style

- Modern AI-inspired interface
- Dark theme
- Glassmorphism effects
- Interactive cards
- Smooth layouts

---

# 📱 Responsive Design

Optimized for:

- 📱 Mobile
- 📱 Tablet
- 💻 Desktop

Implemented using:

- Flexible layouts
- CSS Media Queries
- Responsive spacing
- Adaptive components

---

# 🛠 Technologies Used

## Frontend

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

## Backend

- Express.js
- Node.js
- JSON Web Token (JWT)
- CORS

## API

- Hugging Face Models API
- Fetch API

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/UBAID0704/PromptFlow-AI-Landing-Page-.git
```

---

## Navigate to Project

```bash
cd ai-landing-page
```

---

## Install Dependencies

### Frontend

```bash
npm install
```

### Backend

```bash
npm install express cors jsonwebtoken
```

---

# ▶ Running the Application

Open **two separate terminals**.

## Terminal 1 — Backend

```bash
node server/index.js
```

Server runs at:

```
http://localhost:5000
```

---

## Terminal 2 — Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🌐 Live Demo

**Vercel Deployment**

https://prompt-flow-ai-landing-page.vercel.app

The deployed application includes:

- ✅ Responsive Landing Page
- ✅ AI Feature Showcase
- ✅ Hugging Face API Integration
- ✅ AI Model Explorer
- ✅ Community Review System
- ✅ Admin Moderation Panel
- ✅ JWT Authentication
- ✅ CRUD Operations
- ✅ Responsive Design

---

# 📸 Screenshots

## Responsive AI Landing Page

<img width="1200" height="615" alt="Landing Page" src="https://github.com/user-attachments/assets/d33a92b1-0d32-419f-84ea-e816d88bc846" />

<img width="1204" height="523" alt="Landing Page" src="https://github.com/user-attachments/assets/a585d641-4da6-4acf-97fd-290ff1793eb6" />

<img width="1211" height="614" alt="image" src="https://github.com/user-attachments/assets/8a131724-81c9-471c-bd89-834cad0a2f6d" />

<img width="1166" height="616" alt="image" src="https://github.com/user-attachments/assets/dfcf8549-0a7a-4d20-8acf-fd5355b90f9b" />

<img width="1170" height="529" alt="image" src="https://github.com/user-attachments/assets/7c90779d-5b42-4bca-9157-a58d9d71dc8d" />

---

## AI Model Explorer

<img width="1247" height="622" alt="AI Models" src="https://github.com/user-attachments/assets/b2d03992-885b-47fa-8db7-90c9ed87d46a" />

<img width="1262" height="611" alt="AI Models" src="https://github.com/user-attachments/assets/2dacab5f-6bb0-44bb-afa9-2cf8f10a07c0" />

<img width="1243" height="608" alt="AI Models" src="https://github.com/user-attachments/assets/b915d5b7-3428-44a6-b9f6-0832896b1c95" />

---

# 🎓 Learning Outcomes

Throughout these tasks, the project demonstrates:

## Frontend Development

- React.js
- Component-Based Architecture
- Responsive Web Design
- Reusable UI Components
- Modern CSS Layouts

## API Integration

- REST APIs
- Fetch API
- Dynamic Rendering
- Search & Filtering
- Loading & Error States

## Full Stack Development

- Express.js Backend
- CRUD Operations
- JWT Authentication
- Protected Routes
- Role-Based Access
- RESTful API Design

## Software Engineering

- Project Structure
- State Management
- Authentication Flow
- Error Handling
- Clean Code Organization

---

# 🔮 Future Improvements

Potential enhancements include:

- AI-powered content generation
- AI writing playground
- User authentication with database
- Cloud database integration
- AI chatbot assistant
- Advanced AI model filtering
- User profiles
- Admin analytics dashboard
- Review moderation history
- Image generation support
- Bookmark favorite AI models

---

# 👨‍💻 Author

**Ubaidullah**

Computer Science Student

GitHub:
https://github.com/UBAID0704

---

# 📄 License

This project was developed for educational purposes and as part of a Full Stack Internship assessment.
