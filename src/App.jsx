import React, { useState, useEffect } from 'react';
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

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('landing'); // 'landing', 'auth', 'dashboard'

  // Restore user session on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    const token = localStorage.getItem('userToken');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
    setActiveTab('landing');
  };

  return (
    <div className="app-container" style={{ background: '#0a0c10', minHeight: '100vh', color: '#fff' }}>
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* Main Landing View */}
      {activeTab === 'landing' && (
        <>
          <div id="home"><Hero /></div>
          <div id="features"><Features /></div>
          <AiModelsList />

          {isAdminView ? (
            <AdminPanel onSwitchToPublic={() => setIsAdminView(false)} />
          ) : (
            <CrudDashboard onSwitchToAdmin={() => setIsAdminView(true)} />
          )}

          <div id="pricing"><Pricing /></div>
          <div id="contact"><Contact /></div>
        </>
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
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          /* Protected Route Redirect Guard */
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

export default App;
