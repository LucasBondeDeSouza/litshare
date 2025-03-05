import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BookResults from "./pages/BookResults";
import NotFound from "./pages/NotFound";

export default () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:social_handle" element={<Profile />} />
        <Route path="/books/search/:title" element={<BookResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};