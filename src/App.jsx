import React from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';

import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import AiModelsList from "./AiModelsList.jsx";
import CrudDashboard from "./CrudDashboard.jsx";
import AdminPanel from "./AdminPanel.jsx";
import Pricing from "./Pricing.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

// Auth Components
import AuthModal from "./AuthModal.jsx";
import Dashboard from "./Dashboard.jsx";

// Week 3 Task 1 Component
import UserFeedbackForm from "./UserFeedbackForm.jsx";

// Week 4 Task 1 Component
import FileUpload from "./components/FileUpload.jsx";

function MainContent() {
  const { user, setUser, activeTab, setActiveTab, isAdminView, setIsAdminView } = useApp();

  return (
    <div className="app-container" style={{ background: '#0a0c10', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      {/* Main Landing View */}
      {activeTab === 'landing' && (
        <>
          <div id="home"><Hero /></div>
          <div id="features"><Features /></div>
          <AiModelsList />

          {/* Standalone File Upload Section on Landing Page */}
          <div id="upload" style={{ padding: '2rem 1rem' }}>
            <FileUpload />
          </div>

          {isAdminView ? (
            <AdminPanel onSwitchToPublic={() => setIsAdminView(false)} />
          ) : (
            <CrudDashboard onSwitchToAdmin={() => setIsAdminView(true)} />
          )}

          <div id="pricing"><Pricing /></div>
          <div id="contact"><Contact /></div>
        </>
      )}

      {/* Standalone Upload Tab View */}
      {activeTab === 'upload' && (
        <div style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
          <FileUpload />
        </div>
      )}

      {/* Feedback Form View */}
      {activeTab === 'feedback' && (
        <UserFeedbackForm />
      )}

      {/* Authentication Route */}
      {activeTab === 'auth' && (
        <AuthModal 
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            setActiveTab('dashboard');
          }} 
        />
      )}

      {/* Protected Dashboard Route */}
      {activeTab === 'dashboard' && (
        user ? (
          <Dashboard user={user} />
        ) : (
          <AuthModal 
            onLoginSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              setActiveTab('dashboard');
            }} 
          />
        )
      )}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
