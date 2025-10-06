import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiClient } from "../services/apiClient";

const AddNewAdmin = () => {
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

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/v1/user/admin/addnew", {
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
      toast.error(error?.response?.data?.message || "Failed to add admin");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="admin-page form-page">
      <header className="admin-page-header">
        <span className="section-eyebrow">Team management</span>
        <h1>Add a new administrator</h1>
        <p>Securely provision a new admin account with role-based access in a few seconds.</p>
      </header>
      <div className="admin-card form-card">
        <form className="form-grid" onSubmit={handleAddNewAdmin}>
          <div className="form-row">
            <label className="input-field">
              <span>First name</span>
              <input
                type="text"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="input-field">
              <span>Last name</span>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label className="input-field">
              <span>Email</span>
              <input
                type="email"
                placeholder="admin@yashveerjicare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="input-field">
              <span>Mobile number</span>
              <input
                type="tel"
                placeholder="(+91) 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label className="input-field">
              <span>NIC</span>
              <input
                type="text"
                placeholder="NIC Number"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                required
              />
            </label>
            <label className="input-field">
              <span>Date of birth</span>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label className="input-field">
              <span>Gender</span>
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="input-field">
              <span>Temporary password</span>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn primary-btn">
              Add admin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewAdmin;
