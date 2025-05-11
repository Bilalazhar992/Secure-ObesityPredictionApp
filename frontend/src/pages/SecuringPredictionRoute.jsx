import React, { useEffect } from "react";
import axios from "axios";
import Predict from "./Predict";

function SecuringPredictionRoute() {
  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/authourized", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        window.location = "/signin";
      }
    };
    fetchProtected();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/signin";
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <button
          onClick={handleLogout}
          className="bg-white text-brown-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <Predict />
    </>
  );
}

export default SecuringPredictionRoute;
