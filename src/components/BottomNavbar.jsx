import React, { useState } from "react";
import { Home, Search, PlusSquare, User, Clapperboard } from "lucide-react";
import { Button } from "@material-tailwind/react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: PlusSquare, label: "Add" },
  { icon: Clapperboard, label: "Clips" },
  { icon: User, label: "Profile" },
];

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item, index) => (
          <Button
            key={item.label}
            className={`flex flex-col items-center justify-center w-full h-full bg-white ${
              activeTab === index ? "text-blue-500 font-semibold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
