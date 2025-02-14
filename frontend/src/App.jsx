import React, { useState } from "react";
import axios from "axios"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Register from "./pages/Register";
import Login from "./pages/Login";

export default () => {
  const handleSubmit = async (newClientData) => {
    try {
      await axios.post('http://localhost:3000/api/clients', newClientData)
    } catch (err) {
      console.error('Error adding client:', err)
    }
  }

  return (
    <div className="bg-light">
      <div className="container d-flex vh-100 justify-content-center">
        <div class="row justify-content-center align-self-center w-100">
          <Router>
            <Routes>
              <Route path="/" element={<Login onSubmit={handleSubmit}/>} />
              <Route path="/register" element={<Register onSubmit={handleSubmit} />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  )
}