import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
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

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="patient" element={<PatientDashboard />} />
                  <Route path="doctor" element={<DoctorDashboard />} />
                  <Route path="admin" element={<AdminDashboard />} />
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
    </AuthProvider>
  );
}

export default App;
