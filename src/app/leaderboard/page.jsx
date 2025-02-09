"use client";
import { useState } from "react";
import { FaAward, FaLayerGroup, FaTrophy } from "react-icons/fa6";

const page = () => {
  const [rankings, setRankings] = useState([
    {
      ranking: 1,
      img: "/default-profile-pic.jpg",
      name: "John Doe",
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
      name: "John Doe",
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
    <div className="bg-[#2a2a2a] min-h-screen py-7">
      <h1 className="text-white text-xl font-extrabold text-center">
        Leaderboard
      </h1>

      {/* first three rankings */}
      <div className="flex gap-3 justify-center items-center py-7">
        <div className="relative top-10 border-[#eca41e] p-5 bg-gradient-to-r from-[#2dec4d] to-[#119200] text-white w-[200px] h-max rounded-[30px] flex items-center justify-center flex-col gap-2 font-extrabold">
          <img src="/3rd-place.png" className="w-[75px]" alt="" />
          <img
            className="w-[125px] h-[125px] rounded-[30px]"
            src="/default-profile-pic.jpg"
            alt=""
          />
          <h1>{rankings.length >= 3 ? rankings[2].name : "-"}</h1>
          <div className="bg-white px-2 py-1 rounded-md text-yellow-500 flex gap-1 justify-center items-center">
            <FaAward />{" "}
            <h1>{rankings.length >= 3 ? rankings[2].points : "-"}</h1>
          </div>
        </div>

        <div className="border-[#eca41e] p-5 bg-gradient-to-r from-[#ffac30] to-[#ff7d41] text-white w-[200px] h-max rounded-[30px] flex items-center justify-center flex-col gap-2 font-extrabold">
          <img src="/1st-place.png" className="w-[75px]" alt="" />
          <img
            className="w-[125px] h-[125px] rounded-[30px]"
            src="/default-profile-pic.jpg"
            alt=""
          />
          <h1>{rankings.length >= 1 ? rankings[0].name : "-"}</h1>
          <div className="bg-white px-2 py-1 rounded-md text-yellow-500 flex gap-1 justify-center items-center">
            <FaAward />{" "}
            <h1>{rankings.length >= 1 ? rankings[0].points : "-"}</h1>
          </div>
        </div>

        <div className="relative top-10 border-[#eca41e] p-5 bg-gradient-to-r from-[#30c4ff] to-[#4154ff] text-white w-[200px] h-max rounded-[30px] flex items-center justify-center flex-col gap-2 font-extrabold">
          <img src="/2nd-place.png" className="w-[75px]" alt="" />
          <img
            className="w-[125px] h-[125px] rounded-[30px]"
            src="/default-profile-pic.jpg"
            alt=""
          />
          <h1>{rankings.length >= 2 ? rankings[1].name : "-"}</h1>
          <div className="bg-white px-2 py-1 rounded-md text-yellow-500 flex gap-1 justify-center items-center">
            <FaAward />{" "}
            <h1>{rankings.length >= 2 ? rankings[1].points : "-"}</h1>
          </div>
        </div>
      </div>

      {/* other rankings */}
      {rankings.length > 3 && (
        <table className="m-auto w-full max-w-[750px] mt-10 text-white bg-gradient-to-br from-[#112b64] to-[#305988] rounded-[30px]">
          <thead>
            <tr>
              <th className="p-3">Ranking</th>
              <th className="p-3 text-left">Ambassador</th>
              <th className="p-3">Points</th>
              <th className="p-3">Referrals</th>
            </tr>
          </thead>
          <tbody>
            {rankings.slice(3).map((player, index) => (
              <tr key={index}>
                <td className="p-3 text-yellow-500">
                  <div className="flex items-center justify-center w-full h-full gap-1">
                    <FaTrophy /> <h1>{player.ranking}</h1>
                  </div>
                </td>
                <td className="p-3 flex gap-2 items-center">
                  <img
                    src={player.img}
                    className="rounded-md w-[30px] h-[30px]"
                    alt=""
                  />{" "}
                  <h1>{player.name}</h1>
                </td>
                <td className="p-3 text-yellow-500">
                  <div className="flex gap-1 justify-center items-center w-full h-full">
                    {player.points} <FaAward />
                  </div>
                </td>
                <td className="p-3 text-center">{player.referrals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default page;
