import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../services/apiClient";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/v1/message/send", {
        firstName,
        lastName,
        email,
        phone,
        message,
      });

      toast.success(res.data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <section className="container contact-section">
      <div className="contact-card">
        <span className="section-eyebrow">Rapid response</span>
        <h2>Talk with our care concierge</h2>
        <p>
          Questions about a treatment, second opinion or remote monitoring? Our
          concierge nurses respond in minutes and guide you to the right
          specialist.
        </p>
        <form onSubmit={handleMessage}>
          <div className="form-row">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <textarea
            rows={6}
            placeholder="How can we help?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn primary-btn">
            Send message
          </button>
        </form>
      </div>
      <aside className="contact-aside">
        <h3>Prefer to connect live?</h3>
        <p>
          Our command centre monitors patient queries, remote vitals and
          emergency routes around the clock.
        </p>
        <ul className="contact-list">
          <li>
            <span>Emergency hotline</span>
            <a href="tel:112">112</a>
          </li>
          <li>
            <span>Concierge email</span>
            <a href="mailto:care@yashveerjicare.com">care@yashveerjicare.com</a>
          </li>
          <li>
            <span>Virtual lounge</span>
            <span>Video consults within 15 minutes</span>
          </li>
          <li>
            <span>Campus</span>
            <span>Kanpur-UP, India</span>
          </li>
        </ul>
      </aside>
    </section>
  );
};

export default MessageForm;
