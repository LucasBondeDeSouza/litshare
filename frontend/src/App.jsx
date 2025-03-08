import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./auth/authContext"
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BookResults from "./pages/BookResults";
import NotFound from "./pages/NotFound";

export default () => {

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
  }

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/user/:social_handle" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/books/search/:title" element={<ProtectedRoute><BookResults /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>

      <ToastContainer />
    </>
  );
};