import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SecuringPredictionRoute from "./pages/SecuringPredictionRoute";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
      <Toaster
          position="bottom-right"
      />
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<SecuringPredictionRoute />} />
       

      </Routes>
    </Router>
  );
}

export default App;
