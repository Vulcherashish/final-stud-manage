// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

// FIXED IMPORT PATHS
import AttendanceChart from "./AttendanceCharts";
import FeesChart from "./FeesChart";
import axiosInstance from "../../utils/axiosInstance";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    attendancePresent: 0,
    attendanceTotal: 0,
    feesPaid: 0,
    feesPending: 0,
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div className="admin-dashboard-container">
          <h1>Admin Dashboard</h1>

          {/* Cards */}
          <div className="dashboard-cards">
            <div className="card">Total Students: {stats.totalStudents}</div>
            <div className="card">
              Today's Attendance: {stats.attendancePresent}/{stats.attendanceTotal}
            </div>
            <div className="card">Fees Paid: ₹{stats.feesPaid}</div>
            <div className="card">Pending Fees: ₹{stats.feesPending}</div>
          </div>

          {/* Charts Section */}
          <div className="chart-section">
            <AttendanceChart
              present={stats.attendancePresent}
              total={stats.attendanceTotal}
            />

            <FeesChart paid={stats.feesPaid} pending={stats.feesPending} />
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
