"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaQrcode, FaLink, FaTwitter, FaFacebook, FaWhatsapp, FaLinkedin, FaCopy } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { toast } from "sonner";

const Dashboard = () => {
  const [showQR, setShowQR] = useState(false);
  const referralLink = "www.devday25.com/register?baid=1234";
  
  const stats = [
    { label: "Total Referrals", value: "23" },
    { label: "Points Earned", value: "5,000" },
    { label: "Current Rank", value: "#4" },
    { label: "Successful Conversions", value: "18" },
  ];

  const shareOptions = [
    { 
      name: "Twitter", 
      icon: <FaTwitter className="w-5 h-5" />, 
      color: "bg-[#1DA1F2]",
      url: `https://twitter.com/intent/tweet?text=Join%20DevDay%2025%20using%20my%20referral%20link!%20${referralLink}`
    },
    { 
      name: "Facebook", 
      icon: <FaFacebook className="w-5 h-5" />, 
      color: "bg-[#4267B2]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${referralLink}`
    },
    { 
      name: "WhatsApp", 
      icon: <FaWhatsapp className="w-5 h-5" />, 
      color: "bg-[#25D366]",
      url: `https://wa.me/?text=Join%20DevDay%2025%20using%20my%20referral%20link!%20${referralLink}`
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin className="w-5 h-5" />, 
      color: "bg-[#0077b5]",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-7 pl-0 lg:pl-64">
      <div className="max-w-7xl mx-auto px-4 mt-12">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#242424] to-[#1a1a1a] p-6 rounded-2xl border border-red-500/10 shadow-lg mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Welcome back, <span className="text-red-500">John Doe</span>! 👋
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Thank you for being a valuable Brand Ambassador for DevDay'25. Share your unique referral link with potential participants and earn exciting rewards!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#242424] p-4 rounded-xl border border-red-500/10 shadow-lg"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Referral Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#242424] p-6 rounded-2xl border border-red-500/10 shadow-lg mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-white mb-4 sm:mb-0">Your Referral Link</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#333] transition-colors"
              >
                <FaQrcode /> {showQR ? "Hide QR" : "Show QR"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 p-3 bg-[#2a2a2a] rounded-lg border border-red-500/10">
                <FaLink className="text-red-500" />
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="bg-transparent text-white flex-1 outline-none text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-[#333] rounded-md transition-colors"
                >
                  <FaCopy className="text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-3">Share via:</p>
                <div className="flex flex-wrap gap-2">
                  {shareOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${option.color} p-2 rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      {option.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {showQR && (
              <div className="p-4 bg-white rounded-lg">
                <QRCode value={referralLink} size={128} />
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#242424] p-6 rounded-2xl border border-red-500/10 shadow-lg"
        >
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 bg-[#2a2a2a] rounded-lg border border-red-500/5"
              >
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-white text-sm">New referral signup</p>
                  <p className="text-gray-400 text-xs">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
