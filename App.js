import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";


// Guards
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminFees from "./pages/admin/AdminFees";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminAssignments from "./pages/admin/AdminAssignments";
import AdminMaterials from "./pages/admin/AdminMaterials";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminNotes from "./pages/admin/AdminNotes"; // Added import

// Student pages (add your actual components)
import StudentList from "./pages/StudentList";
import StudentView from "./components/StudentView";
import StudentHome from "./pages/student/StudentHome";
import Fees from "./pages/student/Fees";
import Attendance from "./pages/student/Attendance";
import Assignments from "./pages/student/Assignment";
import Materials from "./pages/student/Material";
import Profile from "./pages/student/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =============================== */}
        {/*            AUTH ROUTES          */}
        {/* =============================== */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Navigate to="/student/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AdminRoute><Register /></AdminRoute>} />


        {/* =============================== */}
        {/*          STUDENT ROUTES         */}
        {/* =============================== */}
        <Route
          path="/student/home"
          element={
            <ProtectedRoute>
              <StudentHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/notes"
          element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/materials"
          element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* Student List & View */}
        <Route
          path="/students"
          element={
            <AdminRoute>
              <StudentList />
            </AdminRoute>
          }
        />

        <Route
          path="/student/:id"
          element={
            <AdminRoute>
              <StudentView />
            </AdminRoute>
          }
        />


        {/* =============================== */}
        {/*           ADMIN ROUTES          */}
        {/* =============================== */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/admin/students" element={<AdminRoute><AdminStudents /></AdminRoute>} />
        <Route path="/admin/fees" element={<AdminRoute><AdminFees /></AdminRoute>} />
        <Route path="/admin/attendance" element={<AdminRoute><AdminAttendance /></AdminRoute>} />
        <Route path="/admin/assignments" element={<AdminRoute><AdminAssignments /></AdminRoute>} />
        <Route path="/admin/materials" element={<AdminRoute><AdminMaterials /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><AdminAnnouncements /></AdminRoute>} />
        <Route path="/admin/notes" element={<AdminRoute><AdminNotes /></AdminRoute>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
