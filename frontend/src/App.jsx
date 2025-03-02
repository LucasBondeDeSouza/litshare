import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import BookResults from "./pages/BookResults";

export default () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:social_handle" element={<UserProfile />} />
        <Route path="/books/:title" element={<BookResults />} />
      </Routes>
    </Router>
  );
};