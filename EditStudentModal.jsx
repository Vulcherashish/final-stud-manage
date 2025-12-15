import React, { useState } from "react";
import api from "../utils/axiosInstance";

const EditStudentModal = ({ student, close, refresh }) => {
  const [form, setForm] = useState(student);

  const updateStudent = async () => {
    try {
      await api.put(`/students/${student._id}`, form);
      refresh();
      close();
    } catch (err) {
      console.error("Update student error", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-6 rounded shadow-lg w-[450px]">
        <h2 className="text-xl font-bold mb-3">Edit Student</h2>

        <div className="space-y-3">

          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            value={form.feesPaid}
            onChange={(e) => setForm({ ...form, feesPaid: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            value={form.feesPending}
            onChange={(e) => setForm({ ...form, feesPending: e.target.value })}
            className="w-full border p-2 rounded"
          />

        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={close} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>

          <button onClick={updateStudent} className="px-3 py-1 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditStudentModal;
