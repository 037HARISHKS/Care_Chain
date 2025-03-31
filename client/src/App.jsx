import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import PatientProfile from "./pages/profile/PatientProfile";
import DoctorProfile from "./pages/profile/DoctorProfile";
import Appointments from "./pages/appointments";
import Chat from "./pages/chat";
import AppointmentForm from "./pages/patient/AppointmentForm";
import HistoryPatient from "./pages/patient/HistoryPatient";
import UpcomingRequests from "./pages/patient/UpcomingRequests";
import AdminForDoctor from "./pages/admin/AdminForDoctor";
import AdminForPatient from "./pages/admin/AdminForPatient";
import ScanStaffDashboard from "./pages/scanStaff/Dashboard";
import ReportForm from "./pages/dashboard/ReportForm";
import LabStaffDashboard from "./pages/labStaff/Dashboard";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            {/*Test routes */}
            <Route path="/test" element={<ReportForm />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="patient" element={<PatientDashboard />} />
              <Route path="patient/history" element={<HistoryPatient />} />
              <Route path="patient/upcoming" element={<UpcomingRequests />} />
              <Route path="patient/book" element={<AppointmentForm />} />
              <Route path="doctor" element={<DoctorDashboard />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/doctors" element={<AdminForDoctor />} />
              <Route path="admin/patients" element={<AdminForPatient />} />
              <Route path="doctor/upcoming" element={<UpcomingRequests />} />
              <Route path="doctor/completed" element={<HistoryPatient />} />
              <Route path="scan-staff" element={<ScanStaffDashboard />} />
              <Route path="lab-staff" element={<LabStaffDashboard/>}/>
            </Route>
            <Route path="/profile">
              <Route path="patient" element={<PatientProfile />} />
              <Route path="doctor" element={<DoctorProfile />} />
            </Route>
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
