import React, { useCallback, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import EditStudentModal from "../components/EditStudentModal";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const navigate = useNavigate();

  const fetchStudents = useCallback(async () => {
    try {
      const res = await api.get(`/students?page=${page}&search=${search}`);
      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Fetch students error", err);
    }
  }, [page, search]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="border p-2 rounded w-80 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Course</th>
            <th className="p-3">Fees Pending</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.course}</td>
              <td className="p-3">{s.feesPending}</td>

              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => navigate(`/student/${s._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View
                </button>

                <button
                  onClick={() => setSelectedStudent(s)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteStudent(s._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-3">
        <button
          disabled={page === 1}
          className="px-3 py-2 bg-gray-300 rounded"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          className="px-3 py-2 bg-gray-300 rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          close={() => setSelectedStudent(null)}
          refresh={fetchStudents}
        />
      )}

    </div>
  );
};

export default StudentList;
