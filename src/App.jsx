import React from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Features';
import Pricing from './Components/Pricing';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      {/* Home Section */}
      <div id="home">
        <Hero />
      </div>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      {/* Pricing Section */}
      <div id="pricing">
        <Pricing />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

export default App;