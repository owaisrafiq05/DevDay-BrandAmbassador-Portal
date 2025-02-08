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

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    cnic: "",
    institution: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{3,50}$/,
    contact: /^(\+92|0)?[0-9]{10}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    cnic: /^\d{5}-\d{7}-\d{1}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
  };

  // Error messages
  const errorMessages = {
    name: "Name should only contain letters and be 3-50 characters long",
    contact: "Please enter a valid Pakistani phone number",
    email: "Please enter a valid email address",
    cnic: "Please enter a valid CNIC number (format: 12345-1234567-1)",
    institution: "Institution name is required",
    password: "Password must be at least 6 characters with letters and numbers",
  };

  // Format input based on field type
  const formatInput = (id, value) => {
    switch (id) {
      case 'contact':
        // Remove all non-digits
        value = value.replace(/\D/g, '');
        // Add +92 if it starts with 0
        if (value.startsWith('0')) {
          value = '+92' + value.slice(1);
        }
        return value;

      case 'cnic':
        // Remove all non-digits
        value = value.replace(/\D/g, '');
        // Add hyphens for CNIC format
        if (value.length > 5) {
          value = value.slice(0, 5) + '-' + value.slice(5);
        }
        if (value.length > 13) {
          value = value.slice(0, 13) + '-' + value.slice(13);
        }
        return value.slice(0, 15);

      case 'name':
        // Remove any numbers or special characters
        return value.replace(/[^a-zA-Z\s]/g, '');

      default:
        return value;
    }
  };

  // Validate individual field
  const validateField = (id, value) => {
    switch (id) {
      case 'name':
      case 'contact':
      case 'email':
      case 'cnic':
      case 'password':
        if (!value) {
          return `${id.charAt(0).toUpperCase() + id.slice(1)} is required`;
        }
        if (!patterns[id].test(value)) {
          return errorMessages[id];
        }
        return "";

      case 'institution':
        if (!value || value.trim().length < 2) {
          return errorMessages.institution;
        }
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const formattedValue = formatInput(id, value);
    
    setFormData(prev => ({
      ...prev,
      [id]: formattedValue,
    }));

    // Validate and set error
    const error = validateField(id, formattedValue);
    setErrors(prev => ({
      ...prev,
      [id]: error,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      if (error) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    
    if (!isValid) {
      toast.error("Please fix all errors before submitting.");
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

  const renderInput = (id, label, type = "text", placeholder) => (
    <div>
      <label className="font-semibold text-sm text-gray-300 pb-1 block">
        {label}
        {errors[id] && (
          <span className="text-red-500 text-xs ml-2">
            {errors[id]}
          </span>
        )}
      </label>
      <input
        className={`border bg-[#2a2a2a] border-gray-700 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full 
                  focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white transition-all duration-200
                  ${errors[id] ? 'border-red-500' : ''}`}
        type={type}
        id={id}
        value={formData[id]}
        onChange={handleChange}
        required
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex m-0 p-0 h-screen relative bg-[#1a1a1a]">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 col-span-1"
            >
              {renderInput("name", "Name", "text", "Enter your full name")}
              {renderInput("contact", "Contact", "text", "+92XXXXXXXXXX")}
              {renderInput("email", "Email", "email", "your@email.com")}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 col-span-1"
            >
              {renderInput("cnic", "CNIC", "text", "XXXXX-XXXXXXX-X")}
              {renderInput("institution", "Institution", "text", "Your institution name")}
              {renderInput("password", "Password", "password", "••••••••")}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-5 md:col-span-2"
            >
              <button
                className="py-2 px-20 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg w-full 
                          hover:from-red-600 hover:to-red-500 transition-all duration-200 transform hover:scale-[1.02]
                          disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                type="submit"
                disabled={loading || Object.values(errors).some(error => error)}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
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