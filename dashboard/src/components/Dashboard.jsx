import React, { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { apiClient } from "../services/apiClient";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, admin } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await apiClient.get("/api/v1/appointment/getall");
        setAppointments(data.appointments);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load appointments");
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await apiClient.put(
        `/api/v1/appointment/update/${appointmentId}`,
        { status }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const stats = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((item) => item.status === "Pending").length;
    const accepted = appointments.filter((item) => item.status === "Accepted").length;
    const visited = appointments.filter((item) => item.hasVisited).length;
    const uniqueDoctors = new Set(
      appointments.map((item) => item?.doctor?._id).filter(Boolean)
    ).size;

    return { total, pending, accepted, visited, uniqueDoctors };
  }, [appointments]);

  const adminName = admin?.firstName
    ? `${admin.firstName} ${admin.lastName || ""}`.trim()
    : "there";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="admin-page dashboard-page">
      <header className="admin-page-header">
        <span className="section-eyebrow">Operations Pulse</span>
        <h1>Welcome back, {adminName} 👋</h1>
        <p>
          Monitor appointments, respond to patient requests, and keep your care team aligned with a
          single glance.
        </p>
      </header>

      <div className="dashboard-hero admin-card">
        <div className="hero-copy">
          <h2>Compassion in every appointment.</h2>
          <p>
            Today’s queue is ready when you are. Prioritize urgent cases, coordinate with doctors,
            and keep patients informed without leaving this view.
          </p>
          <div className="hero-stats">
            <div>
              <span className="label">Pending</span>
              <strong>{stats.pending}</strong>
            </div>
            <div>
              <span className="label">Scheduled</span>
              <strong>{stats.accepted}</strong>
            </div>
            <div>
              <span className="label">Visited</span>
              <strong>{stats.visited}</strong>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/doc.png" alt="Dashboard Illustration" />
          <div className="hero-badge">
            <span>Active Doctors</span>
            <strong>{stats.uniqueDoctors}</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-metrics">
        <div className="metric-card admin-card">
          <span className="label">Total appointments</span>
          <strong>{stats.total}</strong>
          <p>Live count of all patient bookings in the system.</p>
        </div>
        <div className="metric-card admin-card">
          <span className="label">Pending decisions</span>
          <strong>{stats.pending}</strong>
          <p>Requests awaiting triage or doctor confirmation.</p>
        </div>
        <div className="metric-card admin-card">
          <span className="label">Scheduled today</span>
          <strong>{stats.accepted}</strong>
          <p>Approved appointments ready to be served.</p>
        </div>
        <div className="metric-card admin-card">
          <span className="label">Patients visited</span>
          <strong>{stats.visited}</strong>
          <p>Completed check-ins marked as visited by staff.</p>
        </div>
      </div>

      <div className="admin-card data-card">
        <div className="card-header">
          <div>
            <h3>Appointments</h3>
            <p>Manage patient visits and keep everyone in the loop.</p>
          </div>
          <span className="table-footnote">Click a status to make quick updates</span>
        </div>

        {appointments.length > 0 ? (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date &amp; time</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Visited</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => {
                  const patientName = `${appointment.firstName} ${appointment.lastName}`;
                  const doctorName = `${appointment?.doctor?.firstName || ""} ${
                    appointment?.doctor?.lastName || ""
                  }`.trim();
                  const dateTime = appointment?.appointment_date
                    ? appointment.appointment_date.substring(0, 16)
                    : "-";
                  const statusClass =
                    appointment.status === "Pending"
                      ? "status-pending"
                      : appointment.status === "Accepted"
                      ? "status-accepted"
                      : "status-rejected";

                  return (
                    <tr key={appointment._id}>
                      <td>
                        <span className="table-primary">{patientName}</span>
                        <span className="table-caption">{appointment.email}</span>
                      </td>
                      <td>{dateTime}</td>
                      <td>{doctorName || "--"}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={`status-select ${statusClass}`}
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="visited-icon">
                        {appointment.hasVisited ? (
                          <GoCheckCircleFill className="status-icon success" />
                        ) : (
                          <AiFillCloseCircle className="status-icon danger" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h4>No appointments yet</h4>
            <p>
              Once patients submit requests, they will appear here for quick review and triage.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
