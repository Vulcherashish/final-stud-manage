// src/pages/Admin/AdminAssignments.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const AdminAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);

  const fetchAssignments = async () => {
    try {
      const res = await api.get("/assignments");
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose file");

    const form = new FormData();
    form.append("title", title);
    if (description) form.append("description", description);
    form.append("deadline", deadline);
    form.append("file", file);

    try {
      await api.post("/assignments", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Assignment uploaded successfully!");
      setTitle("");
      setDescription("");
      setDeadline("");
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById('assignment-file');
      if (fileInput) fileInput.value = '';

      fetchAssignments();
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await api.delete(`/assignments/${id}`);
      fetchAssignments();
      alert("Assignment deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete assignment: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>Upload Assignment</h2>
        <form onSubmit={upload} style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: "12px", background: 'white', padding: 24, borderRadius: 12 }}>

          <div>
            <label htmlFor="assignment-title" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>Title</label>
            <input
              id="assignment-title"
              className="auth-input"
              placeholder="e.g. Math Homework 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="assignment-desc" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>Description</label>
            <textarea
              id="assignment-desc"
              className="auth-input"
              placeholder="Optional description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="assignment-deadline" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>Deadline</label>
            <input
              id="assignment-deadline"
              type="date"
              className="auth-input"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="assignment-file" style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>Assignment File (PDF/Word)</label>
            <input
              id="assignment-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              required
              title="Upload assignment file"
            />
          </div>

          <button className="auth-btn" type="submit" style={{ marginTop: 10 }}>Upload Assignment</button>
        </form>

        <div style={{ marginTop: 40 }}>
          <h3>Existing Assignments</h3>
          <div className="assignments-list" style={{ marginTop: 20 }}>
            {assignments.length === 0 ? <p>No assignments found.</p> : (
              assignments.map((assignment) => (
                <div key={assignment._id} className="card" style={{ marginBottom: "15px", position: "relative", padding: 20 }}>
                  <div style={{ paddingRight: 80 }}>
                    <h4 style={{ marginBottom: 5 }}>{assignment.title}</h4>
                    <p style={{ margin: "5px 0", color: "#555" }}>{assignment.description}</p>
                    <small style={{ color: "#666" }}>
                      Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                    </small>
                  </div>
                  <button
                    onClick={() => handleDelete(assignment._id)}
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: 500
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminAssignments;
