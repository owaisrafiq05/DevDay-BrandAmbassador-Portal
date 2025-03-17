"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaQrcode, FaLink, FaTwitter, FaFacebook, FaWhatsapp, FaLinkedin, FaCopy } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { Toaster, toast } from 'sonner';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [referralStats, setReferralStats] = useState({ count: 0, rank: 0, teams: [], approvedPaymentCount: 0 });
  const [loading, setLoading] = useState(true);
  
  // Generate referral link with user's code
  const referralLink = userDetails ? `www.devday25.com/register?baid=${userDetails.Code}` : "www.devday25.com/register";
  
  const stats = [
    { label: "Total Referrals", value: referralStats.count.toString() },
    { label: "Current Rank", value: `#${referralStats.rank}` },
    { label: "Approved Referrals", value: `#${referralStats.approvedPaymentCount}` },
  ];

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
        
        const response = await fetch(`https://dev-day-backend.vercel.app/BrandAmbassador/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setUserDetails(data.ambassador);
          // Fetch referral stats after getting user details
          fetchReferralStats(data.ambassador.Code, token);
          toast.success("User details loaded successfully");
        } else {
          toast.error(data.message || "Failed to load user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("An error occurred while fetching user details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserDetails();
  }, [router]);

  const fetchReferralStats = async (baCode, token) => {
    try {
      const response = await fetch(`https://dev-day-backend.vercel.app/BrandAmbassador/GetAllBARegistration?code=${baCode}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReferralStats({
          count: data.count,
          rank: data.rank,
          teams: data.teams,
          approvedPaymentCount: data.approvedPaymentCount,
        });
      } else {
        toast.error(data.message || "Failed to load referral stats");
      }
    } catch (error) {
      console.error("Error fetching referral stats:", error);
      toast.error("An error occurred while fetching referral stats");
    }
  };

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

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-7 pl-0 lg:pl-64">
      <Toaster/>
      <div className="max-w-7xl mx-auto px-4 mt-12">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#242424] to-[#1a1a1a] p-6 rounded-2xl border border-red-500/10 shadow-lg mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Welcome back, <span className="text-red-500">{userDetails?.Name || "Brand Ambassador"}</span>! 👋
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
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
        {/* <motion.div 
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
        </motion.div> */}

        {/* Teams Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#242424] p-6 rounded-2xl border border-red-500/10 shadow-lg overflow-x-auto"
        >
          <h2 className="text-xl font-bold text-white mb-4">Team Registrations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-red-500/10">
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Competition</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Team Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Leader Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Institute</th>
                  <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {referralStats.teams.map((team) => (
                  <tr key={team.id} className="border-b border-red-500/5 hover:bg-[#2a2a2a] transition-colors">
                    <td className="py-3 px-4 text-white text-sm">{team.Competition_Name}</td>
                    <td className="py-3 px-4 text-white text-sm">{team.Team_Name}</td>
                    <td className="py-3 px-4 text-white text-sm">{team.L_Name}</td>
                    <td className="py-3 px-4 text-white text-sm">{team.Institute_Name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        team.Payment_Verification_Status 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {team.Payment_Verification_Status ? "Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
                {referralStats.teams.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-400">
                      No team registrations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
