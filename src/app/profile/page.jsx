"use client";

import { useState } from "react";
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
    <div className="bg-[#1a1a1a] min-h-screen py-10">
      <h1 className="text-gray-300 font-bold text-center text-xl">
        Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="pt-4 max-w-[700px] m-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.3}
          className="flex items-center justify-center gap-4 py-4 w-full"
        >
          <div className="w-[150px] h-[150px] rounded-full bg-red-600"></div>
          <div className="flex flex-col gap-2 justify-start">
            <label
              style={{ cursor: "pointer" }}
              htmlFor="img-upload"
              className="text-gray-300 bg-red-600 p-1 rounded-sm text-sm underline"
            >
              Choose Image
            </label>
            <input
              id="img-upload"
              style={{
                display: "none",
              }}
              accept="image/*"
              type="file"
              className=""
            />
            <button className="text-gray-300 w-max underline text-sm">
              Remove Image
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <InputField
            label="Name"
            id="name"
            placeholder="Enter your full name"
            delay={0.4}
          />
          <InputField
            label="Contact"
            id="contact"
            placeholder="+92XXXXXXXXXX"
            delay={0.4}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="your@email.com"
            delay={0.5}
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
            delay={0.6}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-5 md:col-span-2 flex flex-col gap-4"
          >
            <button
              className="py-2 px-20 bg-[#2a2a2a] text-gray-300 rounded-lg w-full 
                  hover:from-red-600 hover:to-red-500 transition-all duration-200 transform hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              type="submit"
              disabled={loading}
            >
              Discard Changes
            </button>

            <button
              className="py-2 px-20 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg w-full 
                  hover:from-red-600 hover:to-red-500 transition-all duration-200 transform hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              type="submit"
              disabled={loading}
            >
              Save Profile
            </button>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default page;
