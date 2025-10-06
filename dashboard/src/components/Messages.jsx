import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await apiClient.get("/api/v1/message/getall");
        setMessages(data.messages);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load messages");
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="admin-page messages-page">
      <header className="admin-page-header">
        <span className="section-eyebrow">Patient feedback</span>
        <h1>Inbox overview</h1>
        <p>Review enquiries and follow up with patients to keep communication warm and timely.</p>
      </header>

      {messages && messages.length > 0 ? (
        <div className="message-grid">
          {messages.map((element) => (
            <article className="message-card admin-card" key={element._id}>
              <div className="message-header">
                <h3>{element.firstName} {element.lastName}</h3>
                <span className="message-contact">{element.email}</span>
              </div>
              <ul className="info-list">
                <li>
                  <span>Phone</span>
                  <span>{element.phone}</span>
                </li>
              </ul>
              <div className="message-body">
                <p>{element.message}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h4>No messages yet</h4>
          <p>Patient enquiries submitted from the website will appear here for a quick response.</p>
        </div>
      )}
    </section>
  );
};

export default Messages;
