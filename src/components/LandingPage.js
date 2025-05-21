import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="overlay">
        <img src="/logo.png" alt="NB Pro Services Logo" className="logo" />
        <h1 className="title">New Beginning Painting & Services</h1>
        <p className="subtitle">Transforming Spaces with Color, Class & Care</p>
        <button className="contact-btn">Get a Free Estimate</button>
      </div>
    </div>
  );
};

export default LandingPage;
