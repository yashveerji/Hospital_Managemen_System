import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "08:00 – 22:00" },
    { id: 2, day: "Tuesday", time: "08:00 – 22:00" },
    { id: 3, day: "Wednesday", time: "08:00 – 22:00" },
    { id: 4, day: "Thursday", time: "08:00 – 22:00" },
    { id: 5, day: "Friday", time: "08:00 – 20:00" },
    { id: 6, day: "Saturday", time: "09:00 – 18:00" },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="Yashveerji Care logo" className="logo-img" />
          <p>
            A next-generation hospital campus designed around whole-person care,
            digital touchpoints and restorative architecture.
          </p>
          <span className="footer-tag">Established 2003 · Reimagined 2025</span>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/appointment">Book an appointment</Link>
            </li>
            <li>
              <Link to="/about">About Yashveerji Care</Link>
            </li>
          </ul>
        </div>
        <div className="footer-hours">
          <h4>Visiting hours</h4>
          <ul>
            {hours.map((element) => (
              <li key={element.id}>
                <span>{element.day}</span>
                <span>{element.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <div>
            <FaPhone />
            <span>112 · 24/7 emergency desk</span>
          </div>
          <div>
            <MdEmail />
            <span>care@yashveerjicare.com</span>
          </div>
          <div>
            <FaLocationArrow />
            <span>Kanpur-UP, India</span>
          </div>
          <div className="footer-socials">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
  <p>© {new Date().getFullYear()} Yashveerji Care Medical Institute. Designed for the next era of healing.</p>
        <div className="footer-policy-links">
          <Link to="/about">Our mission</Link>
          <a href="#" onClick={(event) => event.preventDefault()}>
            Privacy
          </a>
          <a href="#" onClick={(event) => event.preventDefault()}>
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
