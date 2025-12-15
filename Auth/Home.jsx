// src/components/Auth/Home.jsx
import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { AuthContext } from "../../context/AuthContext";
import "../../style/main.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (user) {
      setInfo({
        feesPaid: 20000,
        feesPending: 5000,
        attendance: 92,
        assignmentsPending: 2,
      });
    }
  }, [user]);

  return (
    <>
      <Sidebar />
      <Navbar />

      <main className="main-content">
        <h2>Welcome, {user?.name}</h2>

        <div className="dashboard-cards">
          <div className="card">
            <p className="card-title">Fees Paid</p>
            <p className="card-value">₹{info?.feesPaid ?? "-"}</p>
          </div>

          <div className="card">
            <p className="card-title">Fees Pending</p>
            <p className="card-value">₹{info?.feesPending ?? "-"}</p>
          </div>

          <div className="card">
            <p className="card-title">Attendance</p>
            <p className="card-value">{info?.attendance ?? "-"}%</p>
          </div>

          <div className="card">
            <p className="card-title">Assignments Pending</p>
            <p className="card-value">{info?.assignmentsPending ?? "-"}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
