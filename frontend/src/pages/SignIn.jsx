import React, { useState, } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SignIn() {
  const { isLoggingIn, login } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      toast.success("login successful!");
      
      
    } catch (error) {
      console.error("login failed:", error);
      toast.error(error.message)
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center max-h-screen bg-gray-100 mt-25">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-xl transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl text-gray-800 text-center font-bold mb-6">
          Candidate Login
        </h1>

        <form onSubmit={handleForm} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
    

          {/* Google Auth Button */}
          {/* <OAuth /> */}
        </form>

        {/* Sign up options */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-gray-600">Don’t have an account?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/sign-up-candidate">
              <button className="bg-blue-600 text-white px-5 py-3 rounded-lg uppercase hover:bg-blue-700 transition w-full sm:w-auto">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
