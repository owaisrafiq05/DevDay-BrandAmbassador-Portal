"use client";

import { useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://dev-day-backend.vercel.app/BrandAmbassador/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Save token and userId in cookies
        Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days
        Cookies.set('userId', data.user.id, { expires: 7 });
        
        toast.success('Login successful!');
        
        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          router.push('/');
        }, 1000);
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

  const validateForm = () => {
    if (!formData.Email || !formData.Password) {
      toast.error("Please fill in both email and password.");
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen flex">
      <Toaster/>
      {/* Left side - Branding */}
      <div className="w-full lg:w-1/2 hidden lg:block relative">
        <div className="absolute inset-0 z-10" />
        <Image
          src={"/devday-bg.jpg"}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </div>


      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-red-700 via-red-900 to-[#1a1a1a] p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] p-8 bg-[#242424] rounded-lg shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-300 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                id="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                         focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                id="Password"
                value={formData.Password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                         focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                       transition-colors duration-200 font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link 
                href="/signup" 
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;