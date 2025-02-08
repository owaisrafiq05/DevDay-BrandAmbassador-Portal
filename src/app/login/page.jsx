"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Validate the form data
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return false;
    }

    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    // Password length validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // First, validate form data
    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        // You can redirect here using router.push('/dashboard') or similar
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex m-0 p-0 h-screen relative bg-[#1a1a1a]">
      {/* Left side: Image with overlay */}
      <div className="w-full lg:w-1/2 hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10" />
        <Image
          src={"/devday-bg.png"}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
      </div>

      {/* Right side: Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex justify-center items-center py-10 px-5 bg-[#1a1a1a]"
      >
        <div className="w-full max-w-md p-8 bg-[#242424] rounded-lg shadow-xl border border-red-800/20">
          {/* Logo on top-right */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-5 right-5"
          >
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={120}
              height={40}
              objectFit="contain"
            />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-center text-white mb-6"
          >
            Login
          </motion.h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="font-semibold text-sm text-gray-300 pb-1 block">
                Email
              </label>
              <input
                className="border bg-[#2a2a2a] border-gray-700 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full 
                          focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white transition-all duration-200"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="font-semibold text-sm text-gray-300 pb-1 block">
                Password
              </label>
              <input
                className="border bg-[#2a2a2a] border-gray-700 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full 
                          focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white transition-all duration-200"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-5 flex justify-center items-center"
            >
              <button
                className="py-2 px-20 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg w-full 
                          hover:from-red-600 hover:to-red-500 transition-all duration-200 transform hover:scale-[1.02]
                          disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </motion.div>
          </form>

          {/* Link to Sign Up page */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-500 hover:text-red-400 transition-colors duration-200">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;