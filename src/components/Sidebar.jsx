import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  Clapperboard,
  House,
  LogOut,
  Mail,
  Settings,
  UserRound,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { deleteCookie } from "../utils/cookieHandler";
import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleOpen = () => setOpen(!open);

  const menuItems = [
    {
      label: "Home",
      icon: <House />,
      target: "/home",
      action: () => {},
    },
    {
      label: "Profile",
      icon: <UserRound />,
      target: "/myprofile",
      action: () => {},
    },
    {
      label: "Clips",
      icon: <Clapperboard />,
      target: "/clips",
      action: () => {},
    },
    {
      label: "Messages",
      icon: <Mail />,
      target: "/messages",
      action: () => {},
    },
    {
      label: "Settings",
      icon: <Settings />,
      target: "/settings",
      action: () => {},
    },
    {
      label: "Log Out",
      icon: <LogOut />,
      action: () => {
        handleOpen();
      },
    },
  ];

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          <SidebarHeader />
        </Typography>
      </div>
      <List>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.target;
          return (
            <Link
              key={index}
              to={item.target}
              onClick={item.action}
              className={`text-black group-hover:text-white font-semibold`}
            >
              <ListItem
                className={`text-black hover:scale-105 transition duration-150 ease-in-out hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white ${
                  isActive ? "bg-blue-500 text-white scale-105" : ""
                }`}
              >
                <ListItemPrefix>{item.icon}</ListItemPrefix>
                {item.label}
              </ListItem>
            </Link>
          );
        })}
        <Dialog open={open} handler={handleOpen} className="p-6">
          <DialogHeader>Do you want to log out?</DialogHeader>
          <DialogFooter>
            <Button
              variant="text"
              color="black"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                deleteCookie("token");
                handleOpen();
                navigate("/");
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </List>
    </Card>
  );
}

export default Sidebar;
