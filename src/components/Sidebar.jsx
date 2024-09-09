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
import { Link } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import { deleteCookie } from "../utils/cookieHandler";

const menuItems = [
  {
    label: "Home",
    icon: <House />,
    target: "/",
    action: () => {},
  },
  {
    label: "Profile",
    icon: <UserRound />,
    target: "/",
    action: () => {},
  },
  {
    label: "Clips",
    icon: <Clapperboard />,
    target: "/",
    action: () => {},
  },
  {
    label: "Messages",
    icon: <Mail />,
    target: "/",
    action: () => {},
  },
  {
    label: "Settings",
    icon: <Settings />,
    target: "/",
    action: () => {},
  },
  {
    label: "Log Out",
    icon: <LogOut />,
    action: () => {
      deleteCookie("token");
    },
  },
];

function Sidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          <SidebarHeader />
        </Typography>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.target}
            onClick={item.action}
            className="text-black group-hover:text-white font-semibold"
          >
            <ListItem className="text-black hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.label}
            </ListItem>
          </Link>
        ))}
      </List>
    </Card>
  );
}

export default Sidebar;
