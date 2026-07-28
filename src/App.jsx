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

import AuthModal from "./AuthModal.jsx";
import Dashboard from "./Dashboard.jsx";

import UserFeedbackForm from "./UserFeedbackForm.jsx";
import FileUpload from "./components/FileUpload.jsx";
import AnalyticsDashboard from "./components/AnalyticsDashboard.jsx";

function MainContent() {
  const { user, setUser, activeTab, setActiveTab, isAdminView, setIsAdminView } = useApp();

  return (
    <div className="app-container" style={{ background: '#0a0c10', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      {isAdminView ? (
        <div style={{ paddingTop: '5rem', paddingBottom: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
          <AdminPanel onSwitchToPublic={() => setIsAdminView(false)} />
        </div>
      ) : (
        <>
          {activeTab === 'landing' && (
            <>
              <div id="home"><Hero /></div>
              <div id="features"><Features /></div>
              <AiModelsList />

              <div id="upload" style={{ padding: '2rem 1rem' }}>
                <FileUpload />
              </div>

              <div id="analytics" style={{ padding: '2rem 1rem' }}>
                <AnalyticsDashboard />
              </div>

              <div id="reviews" style={{ padding: '2rem 1rem' }}>
                <CrudDashboard onSwitchToAdmin={() => setIsAdminView(true)} />
              </div>

              <div id="pricing"><Pricing /></div>
              <div id="contact"><Contact /></div>
            </>
          )}

          {activeTab === 'upload' && (
            <div style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
              <FileUpload />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
              <AnalyticsDashboard />
            </div>
          )}

          {activeTab === 'feedback' && (
            <div style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
              <UserFeedbackForm />
            </div>
          )}

          {activeTab === 'auth' && (
            <AuthModal 
              onLoginSuccess={(loggedInUser) => {
                setUser(loggedInUser);
                setActiveTab('dashboard');
              }} 
            />
          )}

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
        </>
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
