import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const AttendanceChart = ({ present, total }) => {
  const absent = total - present;

  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [present, absent],
        backgroundColor: ["rgba(75,192,192,0.4)", "rgba(255,99,132,0.4)"],
        borderColor: ["#4bc0c0", "#ff6384"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3>Attendance Chart</h3>
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default AttendanceChart;
