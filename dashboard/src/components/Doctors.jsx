import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await apiClient.get("/api/v1/user/doctors");
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="admin-page doctors-page">
      <header className="admin-page-header">
        <span className="section-eyebrow">Care specialists</span>
        <h1>Our medical team</h1>
        <p>Review credentials and contact details for every doctor currently active on Yashveerji Care.</p>
      </header>

      {doctors && doctors.length > 0 ? (
        <div className="doctor-grid">
          {doctors.map((element) => {
            const fullName = `${element.firstName} ${element.lastName}`;
            return (
              <article className="doctor-card admin-card" key={element._id}>
                <div className="doctor-avatar">
                  <img src={element.docAvatar?.url} alt={`${fullName} avatar`} />
                </div>
                <div className="doctor-card-body">
                  <div className="doctor-heading">
                    <h3>{fullName}</h3>
                    <span className="doctor-tag">{element.doctorDepartment}</span>
                  </div>
                  <ul className="info-list">
                    <li>
                      <span>Email</span>
                      <span>{element.email}</span>
                    </li>
                    <li>
                      <span>Phone</span>
                      <span>{element.phone}</span>
                    </li>
                    <li>
                      <span>DOB</span>
                      <span>{element.dob?.substring(0, 10)}</span>
                    </li>
                    <li>
                      <span>NIC</span>
                      <span>{element.nic}</span>
                    </li>
                    <li>
                      <span>Gender</span>
                      <span>{element.gender}</span>
                    </li>
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <h4>No registered doctors yet</h4>
          <p>Doctors added through onboarding will appear here along with their key details.</p>
        </div>
      )}
    </section>
  );
};

export default Doctors;
