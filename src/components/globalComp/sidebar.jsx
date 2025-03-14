import { useState, useEffect } from "react";
import { FiHome, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { toast } from "sonner";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const router = useRouter();

  // Check for mobile view on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Set sidebar state based on screen size
      setIsOpen(window.innerWidth >= 1024);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      id: "home",
      title: "Home",
      icon: <FiHome className="w-5 h-5" />,
      path: "/"
    },
    {
      id: "leaderboard",
      title: "Leaderboard",
      icon: <FaTrophy className="w-5 h-5" />,
      path: "/leaderboard"
    },
    {
      id: "settings",
      title: "Settings",
      icon: <FiSettings className="w-5 h-5" />,
      path: "/profile"
    }
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLinkClick = (id) => {
    setActiveLink(id);
    if (isMobile) {
      setIsOpen(false); // Close sidebar on mobile after clicking a link
    }
  };

  const handleLogout = () => {
    // Remove token and userId from cookies
    Cookies.remove('token');
    Cookies.remove('userId');
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-red-700 text-white hover:bg-red-600 transition-colors duration-200"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-[#242424] border-r border-red-800/20 shadow-xl transition-all duration-300 ease-in-out z-40
          ${isOpen ? "w-64" : "w-0 lg:w-20"} overflow-hidden`}
        aria-label="Sidebar navigation"
      >
        <div className="h-full flex flex-col px-4 py-6 pt-16 md:pt-4">
          <div className={`mb-8 flex justify-center ${!isOpen && "lg:hidden"}`}>
            <Image
              src="/logo2.png"
              alt="Logo"
              width={300}
              height={40}
              objectFit="contain"
              className="mx-auto"
            />
          </div>

          <nav className="flex-grow">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                      ${activeLink === item.id
                        ? "bg-gradient-to-r from-red-700 to-red-600 text-white"
                        : "text-gray-300 hover:bg-[#2a2a2a]"}
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className={`${!isOpen && "lg:hidden"}`}>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200
              text-gray-300 hover:bg-[#2a2a2a] mt-auto mb-4"
          >
            <span className="mr-3"><FiLogOut className="w-5 h-5" /></span>
            <span className={`${!isOpen && "lg:hidden"}`}>Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;