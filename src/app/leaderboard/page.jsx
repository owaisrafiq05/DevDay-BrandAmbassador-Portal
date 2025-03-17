"use client";
import { useState, useEffect } from "react";
import { FaAward, FaTrophy } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import './index.css'

const LeaderboardPage = () => {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultProfilePic = "/default-profile-pic.jpg";

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          toast.error("You need to login first");
          router.push("/login");
          return;
        }

        const response = await fetch(
          "https://dev-day-backend.vercel.app/BrandAmbassador/Leaderboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setLeaderboard(data.leaderboard);
          toast.success("Leaderboard loaded successfully");
        } else {
          toast.error(data.message || "Failed to load leaderboard");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        toast.error("An error occurred while fetching leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [router]);

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center">
        {/* <div className="text-white text-xl">Loading...</div> */}
        <div className="relative inline-block w-10 h-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  // Get top 3 ambassadors
  const topThree = leaderboard.slice(0, 3);
  // Fill with empty objects if less than 3
  while (topThree.length < 3) {
    topThree.push({ name: "-", referralCount: "-" });
  }

  // Get ambassadors ranked 4 and below
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-7 pl-0 lg:pl-64 pt-12">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white text-2xl font-extrabold text-center mb-10">
          Brand Ambassador Leaderboard
        </h1>

        {/* first three rankings */}
        <div className="first-three flex gap-1 sm:gap-3 justify-center items-center py-7 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="rank-div relative top-10 p-2 sm:p-5 bg-gradient-to-br from-[#242424] to-[#1a1a1a] text-white w-[110px] sm:w-[200px] h-max rounded-[20px] flex items-center justify-center flex-col gap-2 font-extrabold border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
          >
            <img
              src="/3rd-place.png"
              className="w-[50px] sm:w-[75px] drop-shadow-2xl"
              alt=""
            />
            <img
              className="w-[50px] h-[50px] sm:w-[125px] sm:h-[125px] rounded-full sm:rounded-[20px] border-2 border-emerald-500 shadow-lg object-cover"
              src={topThree[2]?.profilePhoto || defaultProfilePic}
              alt=""
            />
            <h1 className="rank-div-name text-center text-xs sm:text-base truncate max-w-[100px] sm:max-w-[180px]">
              {topThree[2]?.name || "-"}
            </h1>
            <div className="bg-[#2a2a2a] px-3 py-2 rounded-md text-emerald-500 flex gap-2 justify-center items-center text-xs sm:text-base border border-emerald-500/20">
              <FaAward className="w-4 h-4" />{" "}
              <h1>{topThree[2]?.referralCount || "-"}</h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rank-div p-2 sm:p-5 bg-gradient-to-br from-[#242424] to-[#1a1a1a] text-white w-[110px] sm:w-[200px] h-max rounded-[20px] flex items-center justify-center flex-col gap-2 font-extrabold border border-red-500/20 shadow-lg shadow-red-500/10"
          >
            <img
              src="/1st-place.png"
              className="w-[50px] sm:w-[75px] drop-shadow-2xl"
              alt=""
            />
            <img
              className="w-[50px] h-[50px] sm:w-[125px] sm:h-[125px] rounded-full sm:rounded-[20px] border-2 border-red-500 shadow-lg object-cover"
              src={topThree[0]?.profilePhoto || defaultProfilePic}
              alt=""
            />
            <h1 className="rank-div-name text-center text-xs sm:text-base truncate max-w-[100px] sm:max-w-[180px]">
              {topThree[0]?.name || "-"}
            </h1>
            <div className="bg-[#2a2a2a] px-3 py-2 rounded-md text-red-500 flex gap-2 justify-center items-center text-xs sm:text-base border border-red-500/20">
              <FaAward className="w-4 h-4" />{" "}
              <h1>{topThree[0]?.referralCount || "-"}</h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rank-div relative top-10 p-2 sm:p-5 bg-gradient-to-br from-[#242424] to-[#1a1a1a] text-white w-[110px] sm:w-[200px] h-max rounded-[20px] flex items-center justify-center flex-col gap-2 font-extrabold border border-blue-500/20 shadow-lg shadow-blue-500/10"
          >
            <img
              src="/2nd-place.png"
              className="w-[50px] sm:w-[75px] drop-shadow-2xl"
              alt=""
            />
            <img
              className="w-[50px] h-[50px] sm:w-[125px] sm:h-[125px] rounded-full sm:rounded-[20px] border-2 border-blue-500 shadow-lg object-cover"
              src={topThree[1]?.profilePhoto || defaultProfilePic}
              alt=""
            />
            <h1 className="rank-div-name text-center text-xs sm:text-base truncate max-w-[100px] sm:max-w-[180px]">
              {topThree[1]?.name || "-"}
            </h1>
            <div className="bg-[#2a2a2a] px-3 py-2 rounded-md text-blue-500 flex gap-2 justify-center items-center text-xs sm:text-base border border-blue-500/20">
              <FaAward className="w-4 h-4" />{" "}
              <h1>{topThree[1]?.referralCount || "-"}</h1>
            </div>
          </motion.div>
        </div>

        {/* other rankings */}
        {restOfLeaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="overflow-x-auto mt-16"
          >
            <table className="m-auto w-full max-w-[750px] text-white bg-[#242424] rounded-[20px] border border-red-500/10 shadow-lg">
              <thead className="border-b border-red-500/10">
                <tr>
                  <th className="py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">
                    Rank
                  </th>
                  <th className="py-4 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-400">
                    Ambassador
                  </th>
                  <th className="py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">
                    Referrals
                  </th>
                  {/* <th className="py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">Code</th> */}
                </tr>
              </thead>
              <tbody>
                {restOfLeaderboard.map((ambassador, index) => (
                  <tr
                    key={index}
                    className="border-b border-red-500/5 hover:bg-red-500/5 transition-colors duration-200"
                  >
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex items-center justify-center w-full h-full gap-1 text-xs sm:text-sm text-red-500">
                        <FaTrophy className="w-4 h-4" />{" "}
                        <span>{ambassador.rank}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex gap-3 items-center">
                        <img
                          src={ambassador.profilePhoto || defaultProfilePic}
                          className="rounded-full w-[35px] h-[35px] border border-red-500/20 object-cover"
                          alt=""
                        />
                        <span className="text-xs sm:text-sm text-gray-300 font-medium truncate max-w-[100px] sm:max-w-[200px]">
                          {ambassador.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex gap-2 justify-center items-center w-full h-full text-xs sm:text-sm text-red-500">
                        <span>{ambassador.referralCount}</span>{" "}
                        <FaAward className="w-4 h-4" />
                      </div>
                    </td>
                    {/* <td className="py-4 px-2 sm:px-4 text-center text-xs sm:text-sm text-gray-300">
                      {ambassador.code}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
