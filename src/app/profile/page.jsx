"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    cnic: "",
    institution: "",
    password: "",
    "img-upload": "/default-profile-pic.jpg",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    // todo: fetch data and store in formData
  }, [])

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.contact ||
      !formData.cnic ||
      !formData.institution
    ) {
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
    <div className="bg-[#1a1a1a] min-h-screen py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 font-bold text-center text-xl sm:text-2xl mb-6"
        >
          Your Brand Ambassador Profile
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center bg-[#242424] p-6 rounded-lg border border-red-500/10"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <img 
                src={formData['img-upload']} 
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-red-500/20"
              />
            </div>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <label
                htmlFor="img-upload"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer transition-colors duration-200 text-sm text-center"
              >
                Choose Image
              </label>
              <input
                id="img-upload"
                type="file"
                className="hidden"
                accept="image/jpeg, image/png, image/webp"
                onChange={e => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    setFormData({...formData, 'img-upload': reader.result});
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <button 
                type="button"
                onClick={() => setFormData({...formData, 'img-upload': '/default-profile-pic.jpg'})}
                className="text-gray-400 hover:text-gray-300 text-sm underline transition-colors duration-200"
              >
                Remove Image
              </button>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="bg-[#242424] p-6 rounded-lg border border-red-500/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InputField
                label="Name"
                id="name"
                placeholder="Enter your full name"
                delay={0.2}
              />
              <InputField
                label="Contact"
                id="contact"
                placeholder="+92XXXXXXXXXX"
                delay={0.3}
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                placeholder="your@email.com"
                delay={0.4}
              />
              <InputField
                label="CNIC"
                id="cnic"
                placeholder="XXXXX-XXXXXXX-X"
                delay={0.5}
              />
              <InputField
                label="Institution"
                id="institution"
                placeholder="Your institution name"
                delay={0.6}
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                delay={0.7}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mt-6"
          >
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-1/2 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-lg
                hover:bg-[#333] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 py-2.5 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg
                hover:from-red-600 hover:to-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default page;
