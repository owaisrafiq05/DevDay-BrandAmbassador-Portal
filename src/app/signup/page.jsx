"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    cnic: "",
    institution: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name || 
        !formData.contact || !formData.cnic || !formData.institution) {
      toast.error("Please fill in all fields.");
      return false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return false;
    }

    // CNIC validation (assuming Pakistani CNIC format: 12345-1234567-1)
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicPattern.test(formData.cnic)) {
      toast.error("Please enter a valid CNIC (format: 12345-1234567-1)");
      return false;
    }

    // Contact validation (assuming Pakistani format)
    const contactPattern = /^(\+92|0)?[0-9]{10}$/;
    if (!contactPattern.test(formData.contact)) {
      toast.error("Please enter a valid contact number");
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Signup successful!');
        router.push('/login');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, id, type = "text", placeholder, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-4"
    >
      <label className="font-semibold text-sm text-gray-300 pb-1 block">
        {label}
      </label>
      <input
        className="border bg-[#2a2a2a] border-gray-700 rounded-lg px-3 py-2 mt-1 text-sm w-full 
                  focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white transition-all duration-200"
        type={type}
        id={id}
        placeholder={placeholder}
        value={formData[id]}
        onChange={handleChange}
        required
      />
    </motion.div>
  );

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

      {/* Right side: Signup Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex justify-center items-center py-8 px-5 bg-[#1a1a1a]"
      >
        <div className="w-full max-w-2xl p-8 bg-[#242424] rounded-lg shadow-xl border border-red-800/20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-0 right-5 lg:block hidden"
          >
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={120}
              height={40}
              objectFit="contain"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex justify-center lg:hidden"
          >
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={100}
              height={33}
              objectFit="contain"
            />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-center text-white mb-6"
          >
            Sign Up
          </motion.h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField label="Name" id="name" placeholder="Enter your full name" delay={0.4} />
            <InputField label="Contact" id="contact" placeholder="+92XXXXXXXXXX" delay={0.4} />
            <InputField label="Email" id="email" type="email" placeholder="your@email.com" delay={0.5} />
            <InputField label="CNIC" id="cnic" placeholder="XXXXX-XXXXXXX-X" delay={0.5} />
            <InputField label="Institution" id="institution" placeholder="Your institution name" delay={0.6} />
            <InputField label="Password" id="password" type="password" placeholder="••••••••" delay={0.6} />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-5 md:col-span-2"
            >
              <button
                className="py-2 px-20 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg w-full 
                          hover:from-red-600 hover:to-red-500 transition-all duration-200 transform hover:scale-[1.02]
                          disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-red-500 hover:text-red-400 transition-colors duration-200">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
