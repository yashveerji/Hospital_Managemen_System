import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import { apiClient } from "../services/apiClient";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      const res = await apiClient.post("/api/v1/user/doctor/addnew", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      setDoctorDepartment("");
      setDocAvatar("");
      setDocAvatarPreview("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add doctor");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="admin-page form-page">
      <header className="admin-page-header">
        <span className="section-eyebrow">Care team</span>
        <h1>Register a new doctor</h1>
        <p>Capture credentials, department assignment, and verification details in one flow.</p>
      </header>
      <div className="admin-card form-card">
        <form className="form-grid two-columns" onSubmit={handleAddNewDoctor}>
          <div className="upload-panel">
            <div className="avatar-frame">
              <img
                src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"}
                alt="Doctor avatar preview"
              />
            </div>
            <label className="input-field file-input">
              <span>Profile photo</span>
              <input type="file" accept="image/*" onChange={handleAvatar} required />
            </label>
          </div>
          <div className="fields-column">
            <div className="form-row">
              <label className="input-field">
                <span>First name</span>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="input-field">
                <span>Last name</span>
                <input
                  type="text"
                  placeholder="Smith"
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
                  placeholder="doctor@Yashveerji Care.com"
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
                <span>Department</span>
                <select
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((depart) => (
                    <option value={depart} key={depart}>
                      {depart}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-row single">
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
                Register doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
