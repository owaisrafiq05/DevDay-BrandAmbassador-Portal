"use client";

import { useState } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaImage } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    cnic: "",
    institution: "",
    socialHandle: "",
    profileImage: null,
    imagePreview: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Automatically format CNIC
    if (id === "cnic") {
      const formattedCnic = formatCnic(value);
      setFormData({ ...formData, cnic: formattedCnic });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const formatCnic = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 5) {
      return digits; // Return as is if 5 or fewer digits
    } else if (digits.length <= 12) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`; // Add first hyphen
    } else {
      return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`; // Add both hyphens
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // Name validation (only letters and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      toast.error("Name can only contain letters and spaces.");
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Contact validation (11-digit number)
    const contactRegex = /^\d{11}$/;
    if (!contactRegex.test(formData.contact)) {
      toast.error("Please enter a valid 11-digit mobile number");
      return false;
    }

    // CNIC validation
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicRegex.test(formData.cnic)) {
      toast.error("Please enter a valid CNIC number (XXXXX-XXXXXXX-X)");
      return false;
    }

    // Required fields validation
    const requiredFields = ['name', 'contact', 'email', 'cnic', 'institution', 'socialHandle'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return false;
    }

    // Profile image validation
    if (!formData.profileImage) {
      toast.error("Please upload a profile image");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('Name', formData.name);
      submitData.append('Contact', formData.contact);
      submitData.append('Email', formData.email);
      submitData.append('CNIC', formData.cnic);
      submitData.append('Institution', formData.institution);
      submitData.append('Instagram_Handle', formData.socialHandle);
      submitData.append('ProfilePhoto', formData.profileImage);

      const response = await axios.post(
        'https://dev-day-backend.vercel.app/BrandAmbassador/signup',
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('ambassadorData', JSON.stringify(response.data.ambassador));
        setTimeout(() => {
          router.push('/verify');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        toast.error(error.response.data.message || 'Signup failed');
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('An error occurred during signup');
      }
    } finally {
      setLoading(false);
    }
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

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-red-700 via-red-900 to-[#1a1a1a] p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[500px] p-8 bg-[#242424] rounded-lg shadow-2xl"
        >
          <div className="mobile-logo block lg:hidden mb-4">
            <img src="https://i.ibb.co/Q3wC3cqz/DD-25-Logo-With-Outline-Full-V7.png" alt="Website Logo" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Brand Ambassador Application</h2>
          
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image Upload */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-[#2a2a2a] border-2 border-red-500/20 flex items-center justify-center">
                  {formData.imagePreview ? (
                    <Image
                      src={formData.imagePreview}
                      alt="Profile Preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <FaImage className="w-12 h-12 text-gray-500" />
                  )}
                </div>
                <label 
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors"
                >
                  <FaImage className="w-4 h-4 text-white" />
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-300 mb-1.5 block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1.5 block">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  value={formData.contact}
                  placeholder="03XXXXXXXXX"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1.5 block">
                  CNIC
                </label>
                <input
                  type="text"
                  id="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1.5 block">
                  Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1.5 block">
                  Social Media Link
                </label>
                <input
                  type="text"
                  id="socialHandle"
                  value={formData.socialHandle}
                  onChange={handleChange}
                  placeholder="Instagram Preferred"
                  className="w-full px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                       transition-colors duration-200 font-medium mt-6"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

{/*             <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Login
              </Link>
            </p> */}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
