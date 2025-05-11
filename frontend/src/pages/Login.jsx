import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { secureEncrypt } from "./EncryptionDecreption";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setEmail } = useUser();

  const handleLogin = async ({ email, password }) => {
    try {
      const { ciphertext, ivToken } = secureEncrypt(password);
      console.log(ciphertext)

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email,
          password: ciphertext,
          iv: ivToken })
      });

      

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        setEmail(email);
        navigate("/");
      } else {
        setErrorMessage(data.msg || "Invalid credentials");
        setTimeout(() => setErrorMessage(""), 2000);
      }
    } catch {
      setErrorMessage("Something went wrong. Try again later.");
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-400 px-4">
      <div className="w-full max-w-md bg-gray-200 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {/* {errorMessage && (
          <div className="mb-4 text-sm text-red-600 text-center">{errorMessage}</div>
        )} */}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">Password is required</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </NavLink>
        </p>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
