// src/pages/Admin/AdminMaterials.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const AdminMaterials = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const upload = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("file", file);
    try {
      await api.post("/materials/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Uploaded");
      setTitle(""); setFile(null);
    } catch (err) { alert("Upload failed"); }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>Upload Notes / Materials</h2>
        <form onSubmit={upload} style={{ maxWidth: 600 }}>
          <input className="auth-input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} style={{ marginTop: 8 }} required />
          <button className="auth-btn" style={{ marginTop: 10 }} type="submit">Upload</button>
        </form>
      </main>
    </>
  );
};

export default AdminMaterials;
