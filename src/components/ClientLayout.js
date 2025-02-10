// components/ClientLayout.js
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./globalComp/sidebar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const excludedRoutes = ['/login', '/signup'];
  const showSidebar = !excludedRoutes.includes(pathname);

  return (
    <div>
      {showSidebar && <Sidebar />}
      <main>
        {children}
      </main>
    </div>
  );
}