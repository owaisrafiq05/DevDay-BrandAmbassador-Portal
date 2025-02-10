"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Verify = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background Image */}
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

      {/* Right side - Verification Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-red-700 via-red-900 to-[#1a1a1a] p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[500px] p-8 bg-[#242424] rounded-lg shadow-2xl text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            <FaCheckCircle className="inline-block text-green-500 mr-2" />
            Thank You for Registering!
          </h2>
          <p className="text-gray-300 mb-6">
            We have received your data, and your application is under approval. Once approved, we will be mailing you directly.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Verify;
