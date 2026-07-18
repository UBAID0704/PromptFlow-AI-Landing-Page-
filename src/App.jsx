import React from 'react';
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import AiModelsList from "./AiModelsList.jsx"; // 1. Import it here
import Pricing from "./Pricing.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <div id="home">
        <Hero />
      </div>

      <div id="features">
        <Features />
      </div>

      {/* 2. Insert it right here under your AI features */}
      <AiModelsList /> 

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
