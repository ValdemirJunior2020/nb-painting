import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/estimate');
  };

  return (
    <div className="landing-container">
      <div className="overlay">
        <img src="/logo.png" alt="NB Pro Services Logo" className="logo" />
        <h1 className="title">New Beginning Painting & Services</h1>
        <p className="subtitle">Transforming Spaces with Color, Class & Care</p>
        <button className="contact-btn" onClick={handleClick}>
          Get a Free Estimate
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
