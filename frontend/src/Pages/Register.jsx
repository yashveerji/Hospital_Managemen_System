import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/v1/user/patient/register", {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
      });

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="auth-section container">
      <div className="auth-card">
        <div className="auth-card__body">
          <span className="eyebrow">Join Yashveerji Care</span>
          <h2>Create your patient profile</h2>
          <p>
            Build a connected care journey with personalised reminders,
            preventive screenings and secure access to your records.
          </p>
          <form onSubmit={handleRegistration}>
            <div className="form-row">
              <div className="field-group">
                <label htmlFor="register-firstname">First name</label>
                <input
                  id="register-firstname"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label htmlFor="register-lastname">Last name</label>
                <input
                  id="register-lastname"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field-group">
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label htmlFor="register-phone">Mobile number</label>
                <input
                  id="register-phone"
                  type="tel"
                  placeholder="03XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field-group">
                <label htmlFor="register-nic">NIC</label>
                <input
                  id="register-nic"
                  type="text"
                  placeholder="13 digit CNIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label htmlFor="register-dob">Date of birth</label>
                <input
                  id="register-dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field-group">
                <label htmlFor="register-gender">Gender</label>
                <select
                  id="register-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="register-password">Password</label>
                <input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn primary-btn">
              Register account
            </button>
          </form>
          <div className="auth-meta">
            <span>Already have an account?</span>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
      <aside className="auth-highlight">
        <h3>Membership perks</h3>
        <ul>
          <li>Personal wellness dashboard</li>
          <li>Instant prescription renewals</li>
          <li>Guided recovery coaches</li>
        </ul>
      </aside>
    </section>
  );
};

export default Register;
