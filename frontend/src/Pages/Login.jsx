import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/v1/user/login", {
        email,
        password,
        role: "Patient",
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
    <section className="auth-section container">
      <div className="auth-card">
        <div className="auth-card__body">
          <span className="eyebrow">Patient portal</span>
          <h2>Welcome back to your care hub</h2>
          <p>
            Manage appointments, track prescriptions and stay in sync with your
            care team from any device.
          </p>
          <form onSubmit={handleLogin}>
            <label htmlFor="patient-email">Email</label>
            <input
              id="patient-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="patient-password">Password</label>
            <input
              id="patient-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn primary-btn">
              Sign in
            </button>
          </form>
          <div className="auth-meta">
            <span>New to Yashveerji Care?</span>
            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
      <aside className="auth-highlight">
        <h3>Care that adapts to you</h3>
        <ul>
          <li>Secure chat with your physicians</li>
          <li>Real-time lab & imaging updates</li>
          <li>Same-day virtual visits</li>
        </ul>
      </aside>
    </section>
  );
};

export default Login;
