// src/pages/Student/Attendance.jsx
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { AuthContext } from "../../context/AuthContext";
import "../../style/main.css";

const Attendance = () => {
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // const res = await api.get(`/attendance/student/${user._id}`);
        // setRecords(res.data);
        setRecords([
          { date: "2025-11-01", status: "Present" },
          { date: "2025-11-02", status: "Absent" },
          { date: "2025-11-03", status: "Present" },
        ]);
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
        <h2>My Attendance</h2>

        <table className="simple-table" style={{ marginTop: 12 }}>
          <thead><tr><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}><td>{r.date}</td><td>{r.status}</td></tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Attendance;
