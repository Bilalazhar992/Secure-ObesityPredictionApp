import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { secureEncrypt } from "./EncryptionDecreption";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpStatus, setOtpStatus] = useState("Send OTP");
  const [otpValid, setOtpValid] = useState(false);
  const [loading, setLoading] = useState(false);


  const enteredEmail = watch("email");

  useEffect(() => {
    if (otpCode.length === 4) {
      confirmOtp();
    }
  }, [otpCode]);
  const [otpSending, setOtpSending] = useState(false);
  const [alert, setAlert] = useState("");
  const [successFlag, setSuccessFlag] = useState(false);

  const triggerOtp = async () => {
    if (!enteredEmail) {
      setAlert("Email is required.");
      setTimeout(() => setAlert(""), 2500);
      return;
    }

    setOtpSending(true);
  

    try {
      const res = await fetch("http://localhost:5000/get-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: enteredEmail }),
      });

      

      const resData = await res.json();

      if (resData.success) {
        toast.success("OTP sent!");
        setIsOtpSent(true);
        setOtpStatus("Resend OTP");
      } else {
        setAlert(resData.msg || "Failed to send OTP.");
      }
    } catch (err) {
      setAlert("Network error while sending OTP.");
    } finally {
      setTimeout(() => setAlert(""), 3500);
      setOtpSending(false);
    }
  };

  const confirmOtp = async () => {
    setOtpStatus("Verifying...");
    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("OTP confirmed!");
        setOtpValid(true);
        setOtpStatus("Verified");
      } else {
        setAlert(data.msg || "Invalid OTP.");
        setOtpStatus("Invalid");
      }
    } catch {
      setAlert("Could not verify OTP.");
      setOtpStatus("Error");
    } finally {
      setTimeout(() => setAlert(""), 2500);
    }
  };

  const handleSignUp = async (formData) => {
    if (!otpValid) return;

    setLoading(true);
    setAlert("");

    try {
      const { ciphertext, ivToken } = secureEncrypt(formData.password);

      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: ciphertext,
          iv: ivToken,
        }),
      });

      const result = await response.json();

      if (result.success === "false") {
        setAlert(result.msg || "Signup failed.");
        reset();
        setOtpStatus("Send OTP");
        setOtpCode("");
        return;
      }

      setSuccessFlag(true);
      reset();
      setOtpValid(false);
      setOtpStatus("Send OTP");
      setOtpCode("");
      setTimeout(() => setSuccessFlag(false), 2000);
    } catch (err) {
      setAlert("Signup error.");
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(""), 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-400 border-x-indigo-500 px-4">
      <div className="w-full max-w-md border-x-indigo-500 shadow-lg bg-gray-200 rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold mb-4">Create Account</h2>

        {/* {successFlag && (
          <div className="text-indigo-400 bg-green-100 p-2 rounded mb-3 text-center">
            Account created successfully!
          </div>
        )}

        {alert && (
          <div className="text-red-600 bg-red-100 p-2 rounded mb-3 text-center">
            {alert}
          </div>
        )} */}

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Create Password"
            {...register("password", {
              required: "Password required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              maxLength: { value: 12, message: "Maximum 12 characters" },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="4-digit OTP"
              maxLength={4}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              disabled={otpValid || otpSending}
              onClick={triggerOtp}
              className={`px-4 py-2 text-white rounded ${
                otpValid ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {otpStatus}
              {otpSending && (
                <span className="ml-2 inline-block h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={!otpValid || loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Sign Up
            {loading && (
              <span className="ml-2 inline-block h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Already a user?{" "}
          <NavLink to="/signin" className="text-blue-600 hover:underline">
            Log In
          </NavLink>
        </p>
        {successFlag && (
          <div className="text-white-400 bg-green-100 p-2 rounded mb-3 text-center">
            Account created successfully!
          </div>
        )}

        {alert && (
          <div className="text-red-600 bg-red-100 p-2 rounded mb-3 text-center">
            {alert}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
