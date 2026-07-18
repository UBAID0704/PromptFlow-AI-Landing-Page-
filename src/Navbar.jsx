import React from 'react';

function Navbar() {
  return (
    <nav>
      <div className="logo">PromptFlow AI</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="btn-primary">Get Started</button>
    </nav>
  );
}

export default Navbar;