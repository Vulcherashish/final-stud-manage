// src/pages/Admin/AdminFees.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const AdminFees = () => {
  const [report, setReport] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Payment Form State
  const [selectedStudent, setSelectedStudent] = useState("");
  const [amount, setAmount] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [feesRes, studentsRes] = await Promise.all([
        api.get("/fees/report"),
        api.get("/students")
      ]);
      setReport(feesRes.data);
      setStudents(studentsRes.data.students || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePayFees = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !amount) {
      alert("Please select a student and enter amount");
      return;
    }

    try {
      await api.post(`/fees/pay/${selectedStudent}`, { amount });
      alert("Fees updated successfully");
      setAmount("");
      setSelectedStudent("");
      fetchData(); // Refresh data
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>Fees Management</h2>

        {/* Add Payment Section */}
        <div className="card" style={{ maxWidth: "500px", marginBottom: "2rem" }}>
          <h3>Add Fee Payment</h3>
          <form onSubmit={handlePayFees} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <select
              className="auth-input"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
              ))}
            </select>

            <input
              type="number"
              className="auth-input"
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <button type="submit" className="btn-primary">Record Payment</button>
          </form>
        </div>

        {/* Fees Report Table */}
        <div style={{ marginTop: 12 }}>
          <h3>Fee Records</h3>
          {loading ? <p>Loading...</p> : (
            <table className="simple-table">
              <thead><tr><th>Student</th><th>Course</th><th>Total Fees</th><th>Paid</th><th>Pending</th></tr></thead>
              <tbody>
                {report.map((r) => (
                  <tr key={r._id}>
                    <td>{r.studentId?.name || "Unknown"}</td>
                    <td>{r.studentId?.course || "-"}</td>
                    <td>₹{r.totalFees}</td>
                    <td><span style={{ color: "green", fontWeight: "bold" }}>₹{r.feesPaid}</span></td>
                    <td><span style={{ color: "red", fontWeight: "bold" }}>₹{r.feesPending}</span></td>
                  </tr>
                ))}
                {report.length === 0 && <tr><td colSpan="5" style={{ textAlign: "center" }}>No fee records found</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminFees;
