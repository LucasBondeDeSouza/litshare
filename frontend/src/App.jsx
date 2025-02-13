import React, { useState } from "react";
import axios from "axios"

import Register from "./pages/Register";

export default () => {
  const handleSubmit = async (newClientData) => {
    try {
      await axios.post('http://localhost:3000/api/clients', newClientData)
    } catch (err) {
      console.error('Error adding client:', err)
    }
  }

  return (
    <>
      <Register
        onSubmit={handleSubmit}
      />
    </>
  )
}