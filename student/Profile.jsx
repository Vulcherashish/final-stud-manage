// src/pages/Student/Profile.jsx
import React, { useContext } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "../../style/main.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>Profile</h2>

        <div className="card" style={{ maxWidth: 600 }}>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Course:</strong> {user?.course || "-"}</p>
          <p><strong>Phone:</strong> {user?.phone || "-"}</p>
          <p><strong>Joined:</strong> {new Date(user?.joiningDate).toLocaleDateString()}</p>
        </div>
      </main>
    </>
  );
};

export default Profile;
