import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <section className="container biography">
      <div className="bio-visual">
        <div className="bio-image-frame">
          <img src={imageUrl} alt="YashveerJi Care teams" />
        </div>
        <div className="bio-stamp">
          <span>20+ years</span>
          <p>Of pioneering integrated medicine</p>
        </div>
      </div>
      <div className="bio-content">
        <span className="section-eyebrow">Who we are</span>
        <h3>Engineering compassionate healthcare for tomorrow</h3>
        <p>
          YashveerJi Care began as a community clinic and has grown into a smart
          hospital ecosystem that blends clinical expertise, behavioural science
          and data-driven decision making. Our specialists collaborate inside a
          single care record, creating seamless transitions from prevention to
          recovery.
        </p>
        <div className="bio-highlights">
          <span>Personalised recovery pathways</span>
          <span>Remote monitoring lounge</span>
          <span>AI-assisted diagnostics lab</span>
          <span>Wellness and resilience studios</span>
        </div>
        <div className="bio-metrics">
          <div>
            <span className="metric-value">18</span>
            <span className="metric-label">Centers of excellence</span>
          </div>
          <div>
            <span className="metric-value">320k</span>
            <span className="metric-label">Patients supported annually</span>
          </div>
          <div>
            <span className="metric-value">12</span>
            <span className="metric-label">Research collaborations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
