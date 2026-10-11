import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MessMenu from "./pages/MessMenu";
import Complaint from "./pages/Complaint";
import LeaveRequest from "./pages/LeaveRequest";
import Outpass from "./pages/Outpass";
import Notices from "./pages/Notices";
import WardenDashboard from "./WardenDashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route
  path="/warden-dashboard"
  element={<WardenDashboard />}
/>

        <Route path="/mess-menu" element={<MessMenu />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/outpass" element={<Outpass />} />
        <Route path="/notices" element={<Notices />} />
        <Route
  path="/leave-request"
  element={<LeaveRequest />}
/>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;