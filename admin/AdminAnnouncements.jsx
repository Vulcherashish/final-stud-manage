// src/pages/Admin/AdminAnnouncements.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const AdminAnnouncements = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/announcements");
        setList(res.data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/announcements", { message: text });
      setList(prev => [res.data, ...prev]);
      setText("");
    } catch (err) { alert("Create failed") }
  };

  const del = async (id) => {
    if (!window.confirm("Delete?")) return;
    try { await api.delete(`/announcements/${id}`); setList(l => l.filter(x => x._id !== id)); }
    catch (err) { alert("Delete failed") }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>Announcements</h2>

        <form onSubmit={create} style={{ maxWidth: 600 }}>
          <textarea className="auth-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write announcement..." rows={3} />
          <button className="auth-btn" style={{ marginTop: 8 }} type="submit">Post</button>
        </form>

        <div style={{ marginTop: 18 }}>
          {list.map(a => (
            <div className="card" key={a._id} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{a.message}</div>
                <div><button onClick={() => del(a._id)}>Delete</button></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default AdminAnnouncements;
