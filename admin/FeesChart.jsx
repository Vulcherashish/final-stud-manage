import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FeesChart = ({ paid, pending }) => {
  const data = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        label: "Fees Breakdown",
        data: [paid, pending],
        backgroundColor: ["rgba(54,162,235,0.4)", "rgba(255,159,64,0.4)"],
        borderColor: ["#36a2eb", "#ff9f40"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3>Fees Chart</h3>
      <Bar data={data} options={{ maintainAspectRatio: false }} />
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#555' }}>
        <strong>Paid:</strong> ₹{paid} &nbsp;|&nbsp; <strong>Pending:</strong> ₹{pending}
      </div>
    </div>
  );
};

export default FeesChart;
