// src/pages/Student/StudentHome.jsx
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import "../../style/main.css";

const StudentHome = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/students/dashboard");
        const { student, fees, assignments, announcements: ann } = res.data;

        setSummary({
          feesPaid: fees.paid,
          feesPending: fees.pending,
          attendancePercent: student.attendancePercentage,
          assignmentsPending: assignments.length // Simplified for now
        });
        setAnnouncements(ann);

      } catch (err) {
        console.error(err);
      }
    };
    if (user) load();
  }, [user]);

  return (
    <>
      <Sidebar />
      <Navbar />

      <main className="main-content">
        <h2>Welcome, {user?.name}</h2>

        <div className="dashboard-cards">
          <div className="card">
            <p className="card-title">Fees Paid</p>
            <p className="card-value">₹{summary?.feesPaid ?? 0}</p>
          </div>

          <div className="card">
            <p className="card-title">Fees Pending</p>
            <p className="card-value">₹{summary?.feesPending ?? 0}</p>
          </div>

          <div className="card">
            <p className="card-title">Attendance</p>
            <p className="card-value">{summary?.attendancePercent ?? 0}%</p>
          </div>

          <div className="card">
            <p className="card-title">Recent Assignments</p>
            <p className="card-value">{summary?.assignmentsPending ?? 0}</p>
          </div>
        </div>

        <section style={{ marginTop: 24 }}>
          <h3>Latest Announcements</h3>
          {announcements.length === 0 ? <p>No announcements.</p> : (
            announcements.map(ann => (
              <div className="card" key={ann._id} style={{ marginTop: 12 }}>
                <p style={{ marginBottom: 6, fontWeight: 600 }}>{new Date(ann.date).toLocaleDateString()}</p>
                <p style={{ color: "#475569" }}>{ann.message}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
};

export default StudentHome;
