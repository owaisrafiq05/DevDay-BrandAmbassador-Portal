"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    cnic: "",
    institution: "",
    oldPassword: "",
    newPassword: "",
    "img-upload": "/default-profile-pic.jpg",
    instagram_handle: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState("");
  const [animationsComplete, setAnimationsComplete] = useState(false);

  // Memoize the handleChange function to prevent recreating it on each render
  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = Cookies.get('userId');
        const token = Cookies.get('token');
        
        if (!userId || !token) {
          toast.error("You need to login first");
          router.push('/login');
          return;
        }
        
        setUserId(userId);
        
        const response = await fetch(`https://dev-day-backend.vercel.app/BrandAmbassador/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          const ambassador = data.ambassador;
          setFormData({
            name: ambassador.Name || "",
            contact: ambassador.Contact || "",
            email: ambassador.Email || "",
            cnic: ambassador.CNIC || "",
            institution: ambassador.Institution || "",
            oldPassword: "",
            newPassword: "",
            "img-upload": ambassador.ProfilePhoto || "/default-profile-pic.jpg",
            instagram_handle: ambassador.Instagram_Handle || "",
          });
          toast.success("Profile data loaded successfully");
        } else {
          toast.error(data.message || "Failed to load profile data");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("An error occurred while fetching profile data");
      } finally {
        setLoading(false);
        // Set animations as complete after a short delay
        setTimeout(() => {
          setAnimationsComplete(true);
        }, 1000);
      }
    };
    
    fetchUserDetails();
  }, [router]);

  const validateForm = useCallback(() => {
    // Only validate password fields since other fields are disabled
    if (formData.newPassword && !formData.oldPassword) {
      toast.error("Please enter your current password");
      return false;
    }

    if (formData.oldPassword && !formData.newPassword) {
      toast.error("Please enter your new password");
      return false;
    }

    // Password validation - only if new password is provided
    if (formData.newPassword && formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return false;
    }

    return true;
  }, [formData.newPassword, formData.oldPassword]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSaving(true);

    const isValid = validateForm();
    if (!isValid) {
      setSaving(false);
      return;
    }

    // If no password change is requested, just show a message
    if (!formData.oldPassword && !formData.newPassword) {
      toast.info("No changes to save");
      setSaving(false);
      return;
    }

    try {
      const token = Cookies.get('token');
      
      const response = await fetch('https://dev-day-backend.vercel.app/BrandAmbassador/ChangePassword', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userId,
          OldPassword: formData.oldPassword,
          NewPassword: formData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message || "Password updated successfully");
        // Clear password fields after successful update
        setFormData(prev => ({
          ...prev,
          oldPassword: "",
          newPassword: ""
        }));
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred while updating password");
    } finally {
      setSaving(false);
    }
  }, [formData, userId, validateForm]);

  // Create the InputField component outside the render function
  const InputField = useCallback(({ label, id, type = "text", placeholder, delay, required = true, disabled = true }) => {
    // Only animate if animations are not complete
    const MotionComponent = animationsComplete ? 'div' : motion.div;
    
    return (
      <MotionComponent
        initial={animationsComplete ? {} : { opacity: 0, y: 20 }}
        animate={animationsComplete ? {} : { opacity: 1, y: 0 }}
        transition={{ delay }}
        className="mb-4"
      >
        <label className="font-semibold text-sm text-gray-300 pb-1 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          className={`border bg-[#2a2a2a] border-gray-700 rounded-lg px-3 py-2 mt-1 text-sm w-full 
                    focus:border-red-500 focus:ring-2 focus:ring-red-500 text-white transition-all duration-200
                    ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
          type={type}
          id={id}
          placeholder={placeholder}
          value={formData[id]}
          onChange={handleChange}
          required={required}
          disabled={disabled}
        />
      </MotionComponent>
    );
  }, [animationsComplete, formData, handleChange]);

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading profile data...</div>
      </div>
    );
  }

  // Use regular div instead of motion.div if animations are complete
  const MotionDiv = animationsComplete ? 'div' : motion.div;

  // Memoize the password fields to prevent re-rendering during typing
  const PasswordFields = (
    <div className="mt-8 border-t border-gray-700 pt-6">
      <h3 className="text-white font-semibold mb-4">Change Password</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <InputField
          label="Current Password"
          id="oldPassword"
          type="password"
          placeholder="Enter your current password"
          delay={0.8}
          required={false}
          disabled={false}
        />
        <InputField
          label="New Password"
          id="newPassword"
          type="password"
          placeholder="Enter your new password"
          delay={0.9}
          required={false}
          disabled={false}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-7 pl-0 lg:pl-64">
      <Toaster />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <MotionDiv 
          initial={animationsComplete ? {} : { opacity: 0, y: -20 }}
          animate={animationsComplete ? {} : { opacity: 1, y: 0 }}
          className="text-gray-300 font-bold text-center text-xl sm:text-2xl mb-6"
        >
          Your Brand Ambassador Profile
        </MotionDiv>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Section */}
          <MotionDiv
            initial={animationsComplete ? {} : { opacity: 0, y: 20 }}
            animate={animationsComplete ? {} : { opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 justify-center bg-[#242424] p-4 sm:p-6 rounded-lg border border-red-500/10"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <img 
                src={formData['img-upload']} 
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-red-500/20"
              />
            </div>
            <div className="text-center text-gray-400 text-sm">
              <p>Profile image can only be updated by administrators</p>
            </div>
          </MotionDiv>

          {/* Form Fields */}
          <div className="bg-[#242424] p-4 sm:p-6 rounded-lg border border-red-500/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InputField
                label="Name"
                id="name"
                placeholder="Enter your full name"
                delay={0.2}
                disabled={true}
              />
              <InputField
                label="Contact"
                id="contact"
                placeholder="+92XXXXXXXXXX"
                delay={0.3}
                disabled={true}
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                placeholder="your@email.com"
                delay={0.4}
                disabled={true}
              />
              <InputField
                label="CNIC"
                id="cnic"
                placeholder="XXXXX-XXXXXXX-X"
                delay={0.5}
                disabled={true}
              />
              <InputField
                label="Institution"
                id="institution"
                placeholder="Your institution name"
                delay={0.6}
                disabled={true}
              />
              <InputField
                label="Instagram Handle"
                id="instagram_handle"
                placeholder="Your Instagram username"
                delay={0.7}
                required={false}
                disabled={true}
              />
            </div>
            
            {PasswordFields}
          </div>

          {/* Action Buttons */}
          <MotionDiv
            initial={animationsComplete ? {} : { opacity: 0, y: 20 }}
            animate={animationsComplete ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-1/2 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-lg
                hover:bg-[#333] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 py-2.5 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg
                hover:from-red-600 hover:to-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving}
            >
              {saving ? "Saving..." : "Change Password"}
            </button>
          </MotionDiv>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
