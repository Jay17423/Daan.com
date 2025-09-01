import { Route, Routes, Navigate } from "react-router-dom";

// --- Page & Auth Components ---
import LandingPage from "./pages/LandingPage";
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

// --- Core App Components ---
import Profile from './components/Profile';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import MyClaims from './components/MyClaims';

// --- Routing Logic ---
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div>
      <Routes>
        {/* === PUBLIC ROUTES === */}
        {/* These routes are accessible to everyone, regardless of login status. */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* === PROFILE ROUTE === */}
        {/* This route is accessible after login but is the destination if the profile is incomplete. */}
        <Route path="/profile" element={<Profile />} />

        {/* === PROTECTED ROUTES === */}
        {/* The ProtectedRoute component acts as a guard for all nested routes. */}
        {/* It will check for an auth token and a complete profile before rendering them. */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-claims" element={<MyClaims />} />
        {/* </Route> */}

        {/* === FALLBACK ROUTE === */}
        {/* If a user tries to access any other path, they will be redirected to the landing page. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
