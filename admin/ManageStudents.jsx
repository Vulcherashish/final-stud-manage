// src/pages/admin/ManageStudents.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // adjust endpoint to match your backend
      const res = await api.get("/students"); // you need to create this backend route
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <Sidebar />
      <Navbar />

      <main className="main-content">
        <h2>Manage Students</h2>

        {loading ? <p>Loading...</p> : (
          <table className="simple-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Fees Pending</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>₹{s.feesPending}</td>
                  <td>
                    {/* Hook up edit/delete endpoints */}
                    <button>Edit</button>
                    <button style={{ marginLeft: 8 }}>Delete</button>
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

export default ManageStudents;
