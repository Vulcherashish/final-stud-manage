// src/pages/Student/Materials.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const Materials = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/notes');
        setFiles(res.data);
      } catch (err) { console.error(err); }
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
        <h2>Notes & Materials</h2>

        <div style={{ marginTop: 12 }}>
          {files.length === 0 ? <p>No notes available.</p> : (
            files.map(f => (
              <div key={f._id} className="card" style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{f.title}</p>
                    {f.description && <p style={{ margin: '4px 0', fontSize: '14px', color: '#555' }}>{f.description}</p>}
                    <small>Uploaded on: {new Date(f.createdAt).toLocaleDateString()}</small>
                  </div>
                  <div>
                    {f.filePath ? (
                      <a
                        href={getFileUrl(f.filePath)}
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

export default Materials;
