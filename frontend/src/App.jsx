import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default () => {
  return (
    <div className="bg-light">
      <div className="container d-flex vh-100 justify-content-center">
        <div className="row justify-content-center align-self-center w-100">
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
};