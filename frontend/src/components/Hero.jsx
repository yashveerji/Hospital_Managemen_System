import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ title, imageUrl }) => {
  return (
    <section className="hero container">
      <div className="hero-content">
        <span className="eyebrow">Advanced care for modern lives</span>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-description">
          Transforming a traditional hospital into a digital-first health hub
          with predictive diagnostics, remote monitoring, and a care team that
          sees the whole you. Step into a calming environment where technology
          and empathy work side by side.
        </p>
        <div className="hero-actions">
          <Link to="/appointment" className="btn primary-btn">
            Book an appointment
          </Link>
          <Link to="/about" className="btn ghost-btn">
            Meet our specialists
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-value">96%</span>
            <span className="stat-label">Patient satisfaction</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Care concierge</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">180+</span>
            <span className="stat-label">Specialists on call</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-frame">
          <img src={imageUrl} alt="YashveerJi Care team" />
        </div>
        <div className="hero-floating-card">
          <span className="badge">Emergency</span>
          <h4>Rapid response</h4>
          <p>Dial 112 for ambulance dispatch in under 4 minutes.</p>
        </div>
        <div className="hero-floating-card alt">
          <span className="badge">Virtual</span>
          <h4>Tele-consults</h4>
          <p>Connect with senior consultants from anywhere, anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
