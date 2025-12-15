// src/components/Navbar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/main.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={() => { /* optional collapse */ }}>☰</button>
        <h3 className="nav-title">{user?.role === "admin" ? "Welcome Admin" : "Student Panel"}</h3>

      </div>

      <div className="nav-right">
        <span className="nav-user">Hello, {user?.name || "User"}</span>
        <button className="btn-logout" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
