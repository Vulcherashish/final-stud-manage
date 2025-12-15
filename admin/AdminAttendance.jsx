// src/pages/Admin/AdminAttendance.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../utils/axiosInstance";
import "../../style/main.css";

const AdminAttendance = () => {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [loading, setLoading] = useState(false);

  // Load students and attendance for the selected date
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Get all students
        const studentsRes = await api.get("/students");
        const allStudents = studentsRes.data.students || [];

        // 2. Get attendance for this date
        //    (The backend route is /attendance/date/:date)
        let attendanceMap = {};
        try {
          const attendanceRes = await api.get(`/attendance/date/${date}`);
          attendanceRes.data.forEach(record => {
            attendanceMap[record.studentId._id || record.studentId] = record.status;
          });
        } catch (err) {
          // If 404 or empty, just ignore
          console.log("No attendance found for this date or error fetching it");
        }

        // 3. Merge
        const merged = allStudents.map(s => ({
          ...s,
          status: attendanceMap[s._id] || "absent" // default to absent if not marked? Or maybe null? 
          // Usually better to leave as 'undefined' or a specific 'unmarked' state, 
          // but user asked to "put" attendance. Let's default to 'absent' or keep it neutral.
          // The previous code defaulted directly effectively to absent.
          // Let's default to 'present' so it's faster? Or 'absent'?
          // Let's use 'undefined' so user has to click? 
          // User said "present and absent both checkbox". 
          // I will default to 'absent' to match previous logic logic or 'present'. 
          // Let's default to 'present' as it's more common? No, stick to 'absent' as safe default or 'none'.
          // Let's default to 'absent' effectively similar to previous boolean false.
        }));

        // Actually, if we want to force explicit marking, we might want a null state. 
        // But for simplicity, let's map existing. If no existing, maybe default to Present?
        // Let's simply set the status from map, or default to 'absent'.

        setStudents(merged.map(s => ({ ...s, status: attendanceMap[s._id] || 'absent' })));

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  const handleStatusChange = (id, newStatus) => {
    setStudents(prev => prev.map(s => s._id === id ? { ...s, status: newStatus } : s));
  };

  const submitAttendance = async () => {
    try {
      const payload = students.map(s => ({
        studentId: s._id,
        present: s.status === 'present'
      }));
      await api.post("/attendance/mark", { date, records: payload });
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Save failed: " + (err.response?.data?.message || err.message));
    }
  };

  const markAll = (status) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <h2>Mark Attendance</h2>

        <div style={{ marginTop: 12, background: 'white', padding: 20, borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <label style={{ fontSize: 16, fontWeight: 'bold' }}>
              Select Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginLeft: 10, padding: 5 }} />
            </label>

            <div>
              <button
                type="button"
                onClick={() => markAll('present')}
                style={{ marginRight: 10, padding: '5px 10px', cursor: 'pointer', background: '#dcfce7', border: '1px solid #16a34a', color: '#16a34a', borderRadius: 5 }}
              >
                Mark All Present
              </button>
              <button
                type="button"
                onClick={() => markAll('absent')}
                style={{ padding: '5px 10px', cursor: 'pointer', background: '#fee2e2', border: '1px solid #dc2626', color: '#dc2626', borderRadius: 5 }}
              >
                Mark All Absent
              </button>
            </div>
          </div>

          {loading ? <p>Loading...</p> : (
            <div style={{ marginTop: 12 }}>
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th style={{ textAlign: 'center' }}>Present</th>
                    <th style={{ textAlign: 'center' }}>Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td>{s.course}</td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="radio"
                          name={`attendance-${s._id}`}
                          checked={s.status === 'present'}
                          onChange={() => handleStatusChange(s._id, 'present')}
                          style={{ width: 18, height: 18, cursor: 'pointer' }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="radio"
                          name={`attendance-${s._id}`}
                          checked={s.status === 'absent'}
                          onChange={() => handleStatusChange(s._id, 'absent')}
                          style={{ width: 18, height: 18, cursor: 'pointer' }}
                        />
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && <tr><td colSpan="4">No students found</td></tr>}
                </tbody>
              </table>

              <div style={{ marginTop: 24, textAlign: 'right' }}>
                <button className="auth-btn" onClick={submitAttendance} style={{ padding: '10px 24px', fontSize: 16 }}>
                  Save Attendance
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminAttendance;
