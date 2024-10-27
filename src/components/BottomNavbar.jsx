import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, PlusSquare, User, Clapperboard } from "lucide-react";
import { Button } from "@material-tailwind/react";

const menuItems = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: PlusSquare, label: "Add", href: "/add" },
  { icon: Clapperboard, label: "Clips", href: "/clips" },
  { icon: User, label: "Profile", href: "/myprofile" },
];

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item, index) => (
          <Link to={item.href} key={item.label} onClick={() => setActiveTab(index)}>
            <Button
              className={`flex flex-col items-center justify-center w-full h-full bg-white ${
                activeTab === index ? "text-blue-500 font-semibold" : "text-gray-500"
              }`}
            >
              <item.icon className="md:size-6 size-5" />
              <span className="text-xs mt-1 hidden md:block">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
