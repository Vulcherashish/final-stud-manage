// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../style/main.css";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">

      </div>

      <nav className="sidebar-nav">
        {user?.role === "admin" ? (
          <>
            <NavLink to="/admin-dashboard" className="sidebar-link">Dashboard</NavLink>
            <NavLink to="/admin/students" className="sidebar-link">Students</NavLink>
            <NavLink to="/admin/fees" className="sidebar-link">Fees</NavLink>
            <NavLink to="/admin/attendance" className="sidebar-link">Attendance</NavLink>
            <NavLink to="/admin/assignments" className="sidebar-link">Assignments</NavLink>
            <NavLink to="/admin/notes" className="sidebar-link">Notes</NavLink>
            <NavLink to="/admin/announcements" className="sidebar-link">Announcements</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/student/home" className="sidebar-link">Home</NavLink>
            <NavLink to="/student/fees" className="sidebar-link">My Fees</NavLink>
            <NavLink to="/student/attendance" className="sidebar-link">Attendance</NavLink>
            <NavLink to="/student/assignments" className="sidebar-link">Assignments</NavLink>
            <NavLink to="/student/notes" className="sidebar-link">Notes</NavLink>
            <NavLink to="/student/profile" className="sidebar-link">Profile</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
