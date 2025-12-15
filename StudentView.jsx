import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

const StudentView = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Fetch student error", err);
      }
    };
    fetchStudent();
  }, [id]);

  const downloadCSV = () => {
    window.location.href = `http://localhost:5000/api/students/export/${id}`;
  };

  if (!student) return <p className="p-5">Loading...</p>;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      <div className="bg-white p-4 rounded shadow w-[500px] space-y-2">
        <p><b>Name:</b> {student.name}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Phone:</b> {student.phone}</p>
        <p><b>Course:</b> {student.course}</p>
        <p><b>Fees Paid:</b> ₹{student.feesPaid}</p>
        <p><b>Fees Pending:</b> ₹{student.feesPending}</p>
        <p><b>Attendance:</b> {student.attendancePresent}/{student.attendanceTotal}</p>
      </div>

      <button
        onClick={downloadCSV}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Download Report (CSV)
      </button>
    </div>
  );
};

export default StudentView;
