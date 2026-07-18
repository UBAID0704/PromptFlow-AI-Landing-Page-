# 🤖 PromptFlow AI - Responsive Landing Page & AI Model Explorer

A modern and responsive AI-powered product experience built using **React.js** and **Vite**. This project demonstrates frontend engineering skills, component-based architecture, responsive UI design, and API integration with live AI model data.

The project was developed as part of a **Full Stack Internship assessment** and completed in two phases:

- **Task 1:** Responsive AI Landing Page (Frontend Only)
- **Task 2:** API Integration with Hugging Face AI Models

---

# 📌 Project Overview

PromptFlow AI is a modern AI product landing page designed to showcase AI-powered features such as:

- ✍️ Content Writer
- 💻 Code Assistant
- 📝 Summarizer

The first phase focused on building a clean and responsive user interface using React.js.

The second phase enhanced the application by integrating the Hugging Face API to fetch and display live AI model information dynamically.

The final application combines:

- Modern responsive UI
- Component-driven architecture
- API-based dynamic content
- Loading and error handling
- Search/filter functionality

---

# 📌 Task 1: Responsive AI Landing Page

## Objective

The goal of Task 1 was to build a fully responsive landing page for an AI-powered product without backend integration.

The focus was on:

- Building reusable React components
- Creating a consistent design system
- Implementing responsive layouts
- Following modern UI/UX principles
- Deploying a production-ready frontend application

---

# 🚀 Framework Choice

## React.js + Vite

This project uses **React.js** with **Vite** as the development environment.

## Why React.js?

- Component-based architecture
- Reusable UI components
- Better scalability and maintainability
- Efficient development workflow
- Industry-standard frontend library

## Why Vite?

- Fast development server
- Instant Hot Module Replacement (HMR)
- Optimized production builds
- Lightweight and modern tooling

---

# 🛠 Technologies Used

## Frontend

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

## API Integration

- Hugging Face Public API
- Fetch API
- React Hooks:
  - useState
  - useEffect

---

# 📂 Project Structure

```
ai-landing-page/

├── src/
│
│   ├── App.jsx
│   │   # Application core hub and layout coordinator
│
│   ├── main.jsx
│   │   # React DOM root mounting file
│
│   ├── index.css
│   │   # Global typography and styling rules
│
│   ├── Navbar.jsx
│   │   # Responsive navigation component
│
│   ├── Hero.jsx
│   │   # Main product introduction and CTA section
│
│   ├── Features.jsx
│   │   # AI feature showcase:
│   │   # Content Writer, Code Assistant, Summarizer
│
│   ├── AiModelsList.jsx
│   │   # Task 2 API integration component
│   │   # Fetches and displays live AI model data
│
│   ├── Pricing.jsx
│   │   # Subscription pricing section
│
│   ├── Contact.jsx
│   │   # Contact section and form layout
│
│   └── Footer.jsx
│       # Footer and copyright section
│
├── index.html
│   # Main HTML entry point
│
├── package.json
│   # Project dependencies and scripts
│
└── README.md
    # Project documentation
```

---

# 🧩 Component Overview

## Navbar

Provides responsive navigation and allows users to quickly access different sections of the landing page.

## Hero

Displays the main product message, description, and call-to-action buttons.

## Features

Showcases the core PromptFlow AI capabilities:

- Content Writer
- Code Assistant
- Summarizer

## AiModelsList

Implemented as part of Task 2.

This component connects with the Hugging Face API and displays live AI model information.

Features include:

- API data fetching
- Dynamic rendering
- Loading state
- Error handling
- Search functionality

## Pricing

Displays subscription plans using a clean card-based layout.

## Contact

Provides contact information and user interaction options.

## Footer

Contains copyright information and additional navigation elements.

---

# 📌 Task 2: API Integration with Hugging Face

## Objective

The objective of Task 2 was to transform a static frontend application into a dynamic application by consuming data from a public API.

The project integrates the **Hugging Face Models API** to retrieve live AI model information and display it inside the PromptFlow AI interface.

---

# 🤖 Explore AI Models Behind PromptFlow

A new section was added:

## "Explore the AI Models Behind PromptFlow"

This section displays AI model information related to:

- ✍️ Content Generation
- 💻 Code Assistance
- 📝 Text Summarization

The purpose of this feature is to demonstrate real-world API integration and dynamic data rendering in React.

---

# 🔗 API Integration Features

Implemented features:

✅ Fetch live AI model data from Hugging Face API  
✅ Display dynamic API responses  
✅ Loading state handling  
✅ Friendly error messages  
✅ Search/filter functionality  
✅ Responsive AI model cards  

---

# 🔄 Application Data Flow

```
User
 |
 |
React Component (AiModelsList.jsx)
 |
 |
Fetch API Request
 |
 |
Hugging Face API
 |
 |
AI Model Data Response
 |
 |
Dynamic UI Rendering
```

---

# 🎨 Design System

The application follows a consistent visual design system.

## Layout

Implemented using:

- CSS Flexbox
- CSS Grid
- Responsive breakpoints
- Mobile-first design principles

## Typography

- Clear heading hierarchy
- Readable body text
- Consistent font sizing

## Visual Style

- Modern AI-inspired interface
- Dark theme aesthetics
- Glassmorphism design elements
- Clear visual hierarchy

---

# 📱 Responsive Design

The application is optimized for:

- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktop screens

Responsive behavior is achieved using:

- Flexible layouts
- CSS media queries
- Responsive spacing
- Adaptive components

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/UBAID0704/PromptFlow-AI-Landing-Page-.git
```

## Navigate to Project Folder

```bash
cd ai-landing-page
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Open the application:

```
http://localhost:5173
```

---

# 🌐 Live Demo

The project is deployed using **Vercel**.

🚀 Application Demo:

https://prompt-flow-ai-landing-page.vercel.app

The live application includes:

- ✅ Responsive AI Landing Page
- ✅ AI product feature sections
- ✅ Hugging Face API integration
- ✅ Dynamic AI Model Explorer
- ✅ Loading and error handling
- ✅ Search/filter functionality

---

# 📸 Screenshots

## AI Landing Page

(Add screenshot here)


## AI Model Explorer

(Add screenshot here)

---

# 🎯 Learning Outcomes

## Task 1

This project demonstrates:

- React component-based development
- Responsive frontend development
- Reusable UI component creation
- Design system implementation
- Vite development workflow
- Vercel deployment

## Task 2

This project demonstrates:

- REST API integration
- Fetching external data
- Dynamic UI rendering
- React state management
- Loading and error handling
- Search/filter implementation

---

# 🔮 Future Improvements

Possible future enhancements:

- Real AI content generation
- AI writing playground
- Code execution assistant
- Backend API integration
- User authentication
- Database integration
- Advanced AI model filtering
- User dashboard

---

# 👨‍💻 Author

**Ubaidullah**

Computer Science Student

GitHub:

https://github.com/UBAID0704

---

# 📄 License

This project was developed for educational and internship assessment purposes.
