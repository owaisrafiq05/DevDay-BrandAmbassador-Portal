"use client";
import { useState } from "react";
import { FaAward, FaTrophy } from "react-icons/fa6";
import { motion } from "framer-motion";
// import './index.css'

const page = () => {
  const [rankings, setRankings] = useState([
    {
      ranking: 1,
      img: "/default-profile-pic.jpg",
      name: "John Doe Son",
      points: 5000,
      referrals: 10,
    },
    {
      ranking: 2,
      img: "/default-profile-pic.jpg",
      name: "John Doe",
      points: 5000,
      referrals: 10,
    },
    {
      ranking: 3,
      img: "/default-profile-pic.jpg",
      name: "John Doe",
      points: 5000,
      referrals: 10,
    },
    {
      ranking: 4,
      img: "/default-profile-pic.jpg",
      name: "John Doe Son Of John Doe Kevin",
      points: 5000,
      referrals: 10,
    },
    {
      ranking: 5,
      img: "/default-profile-pic.jpg",
      name: "John Doe",
      points: 5000,
      referrals: 10,
    },
    {
      ranking: 6,
      img: "/default-profile-pic.jpg",
      name: "John Doe",
      points: 5000,
      referrals: 10,
    },
  ]);

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-7 pl-0 lg:pl-64">
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
            <img src="/3rd-place.png" className="w-[50px] sm:w-[75px] drop-shadow-2xl" alt="" />
            <img
              className="w-[50px] h-[50px] sm:w-[125px] sm:h-[125px] rounded-full sm:rounded-[20px] border-2 border-emerald-500 shadow-lg"
              src="/default-profile-pic.jpg"
              alt=""
            />
            <h1 className="text-center text-xs sm:text-base">{rankings.length >= 3 ? rankings[2].name : "-"}</h1>
            <div className="bg-[#2a2a2a] px-3 py-2 rounded-md text-emerald-500 flex gap-2 justify-center items-center text-xs sm:text-base border border-emerald-500/20">
              <FaAward className="w-4 h-4" />{" "}
              <h1>{rankings.length >= 3 ? rankings[2].points : "-"}</h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rank-div p-2 sm:p-5 bg-gradient-to-br from-[#242424] to-[#1a1a1a] text-white w-[110px] sm:w-[200px] h-max rounded-[20px] flex items-center justify-center flex-col gap-2 font-extrabold border border-red-500/20 shadow-lg shadow-red-500/10"
          >
            <img src="/1st-place.png" className="w-[50px] sm:w-[75px] drop-shadow-2xl" alt="" />
            <img
              className="w-[50px] h-[50px] sm:w-[125px] sm:h-[125px] rounded-full sm:rounded-[20px] border-2 border-red-500 shadow-lg"
              src="/default-profile-pic.jpg"
              alt=""
            />
            <h1 className="text-center text-xs sm:text-base">{rankings.length >= 1 ? rankings[0].name : "-"}</h1>
            <div className="bg-[#2a2a2a] px-3 py-2 rounded-md text-red-500 flex gap-2 justify-center items-center text-xs sm:text-base border border-red-500/20">
              <FaAward className="w-4 h-4" />{" "}
              <h1>{rankings.length >= 1 ? rankings[0].points : "-"}</h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rank-div relative top-10 p-2 sm:p-5 bg-gradient-to-br from-[#242424] to-[#1a1a1a] text-white w-[110px] sm:w-[200px] h-max rounded-[20px] flex items-center justify-center flex-col gap-2 font-extrabold border border-blue-500/20 shadow-lg shadow-blue-500/10"
          >
            <img src="/2nd-place.png" className="w-[50px] sm:w-[75px] drop-shadow-2xl" alt="" />
            <img
              className="w-[50px] h-[50px] sm:w-[125px] sm:h-[125px] rounded-full sm:rounded-[20px] border-2 border-blue-500 shadow-lg"
              src="/default-profile-pic.jpg"
              alt=""
            />
            <h1 className="text-center text-xs sm:text-base">{rankings.length >= 2 ? rankings[1].name : "-"}</h1>
            <div className="bg-[#2a2a2a] px-3 py-2 rounded-md text-blue-500 flex gap-2 justify-center items-center text-xs sm:text-base border border-blue-500/20">
              <FaAward className="w-4 h-4" />{" "}
              <h1>{rankings.length >= 2 ? rankings[1].points : "-"}</h1>
            </div>
          </motion.div>
        </div>

        {/* other rankings */}
        {rankings.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="overflow-x-auto mt-16"
          >
            <table className="m-auto w-full max-w-[750px] text-white bg-[#242424] rounded-[20px] border border-red-500/10 shadow-lg">
              <thead className="border-b border-red-500/10">
                <tr>
                  <th className="py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">Rank</th>
                  <th className="py-4 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-400">Ambassador</th>
                  <th className="py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">Points</th>
                  <th className="py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">Referrals</th>
                </tr>
              </thead>
              <tbody>
                {rankings.slice(3).map((player, index) => (
                  <tr key={index} className="border-b border-red-500/5 hover:bg-red-500/5 transition-colors duration-200">
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex items-center justify-center w-full h-full gap-1 text-xs sm:text-sm text-red-500">
                        <FaTrophy className="w-4 h-4" /> <span>{player.ranking}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex gap-3 items-center">
                        <img
                          src={player.img}
                          className="rounded-full w-[35px] h-[35px] border border-red-500/20"
                          alt=""
                        />
                        <span className="text-xs sm:text-sm text-gray-300 font-medium truncate max-w-[100px] sm:max-w-[200px]">
                          {player.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex gap-2 justify-center items-center w-full h-full text-xs sm:text-sm text-red-500">
                        <span>{player.points}</span> <FaAward className="w-4 h-4" />
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-center text-xs sm:text-sm text-gray-300">
                      {player.referrals}
                    </td>
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

export default page;
