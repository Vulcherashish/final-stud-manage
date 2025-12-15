// src/pages/admin/AdminNotes.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const AdminNotes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const fetchNotes = async () => {
        try {
            const res = await api.get("/notes");
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleChange = (e) => setTitle(e.target.value);
    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        try {
            await api.post("/notes", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Note uploaded successfully");
            setTitle("");
            setFile(null);
            // Reset file input manually if needed, though react state handles logic
            const fileInput = document.getElementById('file-upload');
            if (fileInput) fileInput.value = '';

            fetchNotes();
        } catch (err) {
            console.error(err);
            alert("Failed to upload note");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.error(err);
            alert("Failed to delete: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <>
            <Sidebar />
            <Navbar />
            <main className="main-content">
                <h2>Manage Notes</h2>

                <div className="card" style={{ marginBottom: "20px" }}>
                    <h3>Add New Note</h3>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "500px" }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 5 }}>Title</label>
                            <input
                                name="title"
                                placeholder="Note Title"
                                value={title}
                                onChange={handleChange}
                                required
                                className="auth-input"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 5 }}>File (PDF/Docs)</label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                required
                                className="auth-input"
                                accept=".pdf,.doc,.docx"
                            />
                        </div>

                        <button type="submit" className="auth-btn" style={{ marginTop: 10 }}>Upload Note</button>
                    </form>
                </div>

                <div className="notes-list">
                    <h3>Existing Notes</h3>
                    {notes.map((note) => (
                        <div key={note._id} className="card" style={{ marginBottom: "10px", position: "relative" }}>
                            <h4>{note.title}</h4>
                            <p style={{ fontSize: 14, color: '#666' }}>
                                Uploaded: {new Date(note.createdAt || note.timestamp).toLocaleDateString()}
                            </p>

                            <button
                                onClick={() => handleDelete(note._id)}
                                style={{ position: "absolute", top: "15px", right: "15px", background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {notes.length === 0 && <p>No notes found.</p>}
                </div>
            </main>
        </>
    );
};

export default AdminNotes;
