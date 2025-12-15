// src/components/Auth/Register.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/axiosInstance";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "../../style/main.css"; // Use main css instead of auth css

const Register = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    password: "",
    role: "student",
  });

  if (!user || user.role !== "admin") {
    navigate("/home");
    return null;
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Student created successfully");
      navigate("/admin/students");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating student");
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h2>Create Student</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <input name="name" className="auth-input" placeholder="Name" onChange={handleChange} required />
            <input name="email" className="auth-input" placeholder="Email" onChange={handleChange} required />
            <input name="phone" className="auth-input" placeholder="Phone" onChange={handleChange} />
            <input name="course" className="auth-input" placeholder="Course" onChange={handleChange} />
            <input name="password" className="auth-input" placeholder="Password" onChange={handleChange} required />

            <button className="auth-btn" type="submit">Create Student</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
