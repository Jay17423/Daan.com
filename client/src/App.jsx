
// src/App.js

// 1. Remove the 'Router' import, you don't need it here.
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// Make sure to import Login and SignUp when you uncomment them
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

export default function App() {
  return (
    <div>
      {/* 2. Remove the <Router> and </Router> tags from here */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}