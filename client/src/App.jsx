import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import Applications from "./pages/Applications";

function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route index element={<Dashboard />} />
    </Route>
    <Route path="/campaigns" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route index element={<Campaigns />} />
    </Route>
    <Route path="/campaigns/new" element={<ProtectedRoute roles={["brand"]}><AppLayout /></ProtectedRoute>}>
      <Route index element={<CreateCampaign />} />
    </Route>
    <Route path="/applications" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
      <Route index element={<Applications />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

export default function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>;
}