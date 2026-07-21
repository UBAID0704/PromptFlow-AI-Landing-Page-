import React, { useState } from 'react';
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import AiModelsList from "./AiModelsList.jsx";
import CrudDashboard from "./CrudDashboard.jsx";
import AdminPanel from "./AdminPanel.jsx";
import Pricing from "./Pricing.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <div className="app-container">
      <Navbar />
      
      <div id="home">
        <Hero />
      </div>

      <div id="features">
        <Features />
      </div>

      <AiModelsList />

      {/* Conditionally render Public Review view or Admin Panel */}
      {isAdminView ? (
        <AdminPanel onSwitchToPublic={() => setIsAdminView(false)} />
      ) : (
        <CrudDashboard onSwitchToAdmin={() => setIsAdminView(true)} />
      )}

      <div id="pricing">
        <Pricing />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

export default App;
