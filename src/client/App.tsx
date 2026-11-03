import { Dashboard } from "./components/dashboard.js";
import { Login } from "./components/login.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "./components/register.js";


export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}