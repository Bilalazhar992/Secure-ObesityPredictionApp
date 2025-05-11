// File: pages/Predict.jsx
import { useState } from "react";
import axios from "axios";

export default function Predict() {
  const [formData, setFormData] = useState({
    Gender: "Male",
    Age: "",
    Height: "",
    Weight: "",
    family_history_with_overweight: "yes",
    FAVC: "yes",
    FCVC: "1",
    NCP: "",
    CAEC: "Sometimes",
    SMOKE: "no",
    CH2O: "1",
    SCC: "no",
    FAF: "0",
    TUE: "0",
    CALC: "Sometimes",
    MTRANS: "Automobile",
  });
  const [prediction, setPrediction] = useState({
    obesity_level: "",
    health_risk: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          withCredentials: true,
        }
      );
      setPrediction({
        obesity_level: res.data.obesity_level,
        health_risk: res.data.health_risk,
      });
      setError("");
    } catch (err) {
      setPrediction({ obesity_level: "", health_risk: "" });
      setError("Prediction failed or invalid input");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Prediction Page</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block font-medium mb-2" htmlFor="Gender">
            Gender
          </label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="Age">
            Age
          </label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            placeholder="Age"
            required
            min="0"
            max="80"
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="Height">
            Height (m)
          </label>
          <input
            type="number"
            name="Height"
            value={formData.Height}
            onChange={handleChange}
            placeholder="Height (m)"
            step="0.01"
            required
            min="1"
            max="3"
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="Weight">
            Weight (kg)
          </label>
          <input
            type="number"
            name="Weight"
            value={formData.Weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            required
            min="35"
            max="170"
            className="border p-2 rounded"
          />
        </div>

        {["family_history_with_overweight", "FAVC", "SMOKE", "SCC"].map(
          (field) => (
            <div key={field}>
              <label className="block font-medium mb-2" htmlFor={field}>
                {field.replace(/_/g, " ")}
              </label>
              <select
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )
        )}

        <div>
          <label className="block font-medium mb-2" htmlFor="FCVC">
            FCVC
          </label>
          <select
            name="FCVC"
            value={formData.FCVC}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {[1, 2, 3].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="NCP">
            NCP
          </label>
          <input
            type="number"
            name="NCP"
            value={formData.NCP}
            onChange={handleChange}
            placeholder="NCP"
            required
            min="1"
            max="4"
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="CAEC">
            CAEC
          </label>
          <select
            name="CAEC"
            value={formData.CAEC}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {["Sometimes", "Frequently", "Always"].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="CH2O">
            CH2O
          </label>
          <select
            name="CH2O"
            value={formData.CH2O}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {[1, 2, 3].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="FAF">
            FAF
          </label>
          <select
            name="FAF"
            value={formData.FAF}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {[0, 1, 2, 3].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="TUE">
            TUE
          </label>
          <select
            name="TUE"
            value={formData.TUE}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {[0, 1, 2, 3].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="CALC">
            CALC
          </label>
          <select
            name="CALC"
            value={formData.CALC}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {["Sometimes", "Frequently", "Always"].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2" htmlFor="MTRANS">
            MTRANS
          </label>
          <select
            name="MTRANS"
            value={formData.MTRANS}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {[
              "Automobile",
              "Bike",
              "Motorbike",
              "Public Transportation",
              "Walking",
            ].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <button className="col-span-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Predict
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {prediction.obesity_level && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <p>
            <strong>Prediction:</strong> {prediction.obesity_level}
          </p>
          <p className="mt-2">
            <strong>Health Risk:</strong> {prediction.health_risk}
          </p>
        </div>
      )}
    </div>
  );
}
