/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

const Layout = ({ children }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1200;
      setIsLargeScreen(largeScreen);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-full">
      {isLargeScreen ? (
        <div className="flex h-full">
          <div className="w-72 overflow-x-hidden h-full overflow-y-auto border-r border-gray-200">
            <Sidebar />
          </div>
          <div className="flex-grow overflow-y-auto p-4">{children}</div>
        </div>
      ) : (
        <div>
          <BottomNavbar />
          <div className="flex-grow overflow-y-auto p-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
