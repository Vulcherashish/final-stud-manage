// src/pages/Student/Assignments.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/assignments'); // Fetch actual assignments
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to load assignments", err);
      }
    };
    load();
  }, []);

  const getFileUrl = (filePath) => {
    if (!filePath) return "#";
    const normalized = filePath.replace(/\\/g, "/");
    return `http://localhost:5000/${normalized}`;
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>Assignments</h2>

        <div style={{ marginTop: 12 }}>
          {assignments.length === 0 ? <p>No assignments found.</p> : (
            assignments.map(a => (
              <div key={a._id} className="card" style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{a.title}</p>
                    {a.description && <p style={{ margin: '4px 0', fontSize: '14px', color: '#555' }}>{a.description}</p>}
                    <small>Due: {new Date(a.deadline).toLocaleDateString()}</small>
                  </div>
                  <div>
                    {a.filePath ? (
                      <a
                        href={getFileUrl(a.filePath)}
                        target="_blank"
                        rel="noreferrer"
                        className="auth-btn"
                        style={{ textDecoration: "none", padding: "8px 12px", display: 'inline-block' }}
                        download
                      >
                        Download
                      </a>
                    ) : (
                      <span style={{ color: '#999', fontSize: 13 }}>No File</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Assignments;
