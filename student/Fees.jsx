// src/pages/Student/Fees.jsx
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { AuthContext } from "../../context/AuthContext";
import "../../style/main.css";

const Fees = () => {
  const { user } = useContext(AuthContext);
  const [fees, setFees] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // const res = await api.get(`/fees/student/${user._id}`);
        // setFees(res.data.summary); setHistory(res.data.history);
        setFees({ paid: 20000, pending: 5000, total: 25000 });
        setHistory([
          { date: "2025-11-01", amount: 10000, mode: "Online" },
          { date: "2025-12-01", amount: 10000, mode: "Cash" }
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) load();
  }, [user]);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>My Fees</h2>

        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div className="card" style={{ flex: 1 }}>
            <p className="card-title">Total Fees</p>
            <p className="card-value">₹{fees?.total ?? "-"}</p>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <p className="card-title">Paid</p>
            <p className="card-value">₹{fees?.paid ?? "-"}</p>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <p className="card-title">Pending</p>
            <p className="card-value">₹{fees?.pending ?? "-"}</p>
          </div>
        </div>

        <section style={{ marginTop: 18 }}>
          <h3>Payment History</h3>
          <table className="simple-table" style={{ marginTop: 8 }}>
            <thead>
              <tr><th>Date</th><th>Amount</th><th>Mode</th></tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td>{h.date}</td>
                  <td>₹{h.amount}</td>
                  <td>{h.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Fees;
