import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { apiClient } from "../services/apiClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/v1/user/login", {
        email,
        password,
        role: "Admin",
      });

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="admin-page auth-page">
      <div className="auth-layout">
        <div className="admin-card auth-card">
          <div className="auth-brand">
            <img src="/logo.png" alt="Yashveerji Care" className="auth-logo" />
            <span>Yashveerji Care Admin</span>
          </div>
          <h1>Sign in to your control center</h1>
          <p>
            Manage appointments, assign doctors, and keep patient communications on track from one
            secure dashboard.
          </p>
          <form className="form-stack" onSubmit={handleLogin}>
            <label className="input-field">
              <span>Email address</span>
              <input
                type="email"
                placeholder="admin@yashveerjicare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="input-field">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="btn primary-btn">
              Login
            </button>
          </form>
        </div>
        <div className="admin-card auth-highlight">
          <h3>Need a reminder?</h3>
          <ul>
            <li>Use your administrator email and password issued by HQ.</li>
            <li>Passwords are case sensitive — double-check your caps lock.</li>
            <li>Reach out to super admin if you need a reset link.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Login;
