import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function SignUpCandidate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { signup, isSigningUp } = useAuthStore();
  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.contactNumber.trim()) return "Contact number is required";
    if (!/^\d{7,15}$/.test(form.contactNumber))
      return "Contact number must be digits (7-15)";
    if (!form.gender) return "Please select gender";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email";
    if (form.password.length < 8)
      return "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";

    return null;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const message = validate();
  

  if (message != null) {
    toast.error(message);
    return;
  }

  try {
    await signup(form);   // ✅ wait for signup API
    toast.success("Signup successful! Please login to continue.");
    navigate("/login");   // ✅ redirect to login
  } catch (error) {
    console.error("Signup failed:", error);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl text-center font-bold text-slate-800 mb-1">
          Create your account
        </h2>
        <p className=" text-center text-slate-500 mb-6">
          Join us — fill the form below to get started.
        </p>

        {message && (
          <div
            className={
              message.type === "error"
                ? "mb-4 text-sm text-red-700 bg-red-50 p-3 rounded"
                : "mb-4 text-sm text-green-700 bg-green-50 p-3 rounded"
            }
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="col-span-1 sm:col-span-1 input"
              placeholder="First name *"
            />
            <input
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
              className="col-span-1 input"
              placeholder="Middle name"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="col-span-1 input"
              placeholder="Last name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              className="input"
              placeholder="Contact number *"
              inputMode="numeric"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input"
            placeholder="Email *"
            type="email"
          />

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input pr-10"
              placeholder="Password *"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <HiOutlineEyeOff size={20} />
              ) : (
                <HiOutlineEye size={20} />
              )}
            </button>
          </div>

          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="input"
            placeholder="Confirm password *"
            type="password"
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-sm text-center text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
