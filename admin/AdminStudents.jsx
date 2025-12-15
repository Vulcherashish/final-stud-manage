// src/pages/Admin/AdminStudents.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/students");
      setStudents(res.data.students || []);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents(s => s.filter(x => x._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Students</h2>
          <button onClick={() => window.location.href = '/register'} className="btn-primary" style={{ padding: "8px 16px", cursor: "pointer" }}>
            Add Student
          </button>
        </div>

        {loading ? <p>Loading...</p> : (
          <table className="simple-table" style={{ marginTop: 12 }}>
            <thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Fees Pending</th><th>Actions</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course || "-"}</td>
                  <td>₹{s.feesPending}</td>
                  <td>
                    <button onClick={() => { /* open edit modal */ }}>Edit</button>
                    <button style={{ marginLeft: 8 }} onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default AdminStudents;
