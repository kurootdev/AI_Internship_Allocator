import React, { useState } from "react";
import axios from "axios";
import { employerTypes, sectors } from "../assets/EmpTypeAndSectorData/options";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom"; // ✅ navigate hook import
import { useEmployeeStore } from "../store/EmployeeAuthStrore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SignUpEmployer() {
  const navigate = useNavigate(); // ✅ initialize navigate
  const { signupEmp, isSigningUpEmp } = useEmployeeStore();

  const [form, setForm] = useState({
    employerType: "",
    sector: "",
    organizationName: "",
    name: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyId: "",
    contactNumber: "",
  });

  const validate = () => {
    if (!form.employerType.trim()) return "Employer type is required";
    if (!form.sector.trim()) return "Sector is required";
    if (!form.organizationName.trim()) return "Organization name is required";
    if (!form.name.trim()) return "First name is required";
    
    if (!form.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email address";

    if (!form.password) return "Password is required";
    if (form.password.length < 8)
      return "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";

    if (!form.companyId.trim()) return "Company ID is required";

    if (!form.contactNumber.trim()) return "Contact number is required";
    if (!/^\d{7,15}$/.test(form.contactNumber))
      return "Contact number must be digits (7-15)";

    return null; // ✅ no errors
  };

  // password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // handle change
  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = validate();
    console.log("Emp message :", message);

    if (message != null) {
      toast.error(message)
      return;
    }

    try {
      await signupEmp(form); // ✅ wait for signup API
      toast.success("Signup Emp successful! Please login to continue.");
      navigate("/login-employer"); // ✅ redirect to login
    } catch (error) {
      console.error("Signup Emp failed:", error);
      toast.error(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center max-h-screen bg-gray-100 px-4 mt-30">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl text-center font-bold text-slate-800 mb-1">
          Create your account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Join us — fill the form below to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employer Type + Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              name="employerType"
              value={form.employerType}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full bg-white"
            >
              <option value="">Select Employer Type *</option>
              {employerTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              name="sector"
              value={form.sector}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full bg-white"
            >
              <option value="">Select Sector *</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Organization Name */}
          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name *"
            value={form.organizationName}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              name="name"
              placeholder="First Name *"
              value={form.name}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={form.middleName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          {/* Password + Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                className="border p-2 rounded w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showConfirm ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Company ID + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              name="companyId"
              placeholder="Company ID *"
              value={form.companyId}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number *"
              value={form.contactNumber}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUpEmp}
          >
            {isSigningUpEmp ? (
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
            <Link to="/login-employer" className="text-sky-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
