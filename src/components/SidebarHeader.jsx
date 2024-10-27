import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import logo from "../assets/mishmash-logo.png";
import placeholder from "../assets/placeholder.png";

const SidebarHeader = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const loggedUser = await getUser(userId);
        setUser(loggedUser);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 bg-blue-50 rounded-full"></div>
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <div className="w-full h-full bg-blue-50"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-center rounded-full">
            <img
              src={logo}
              alt="MishMash"
              className="p-3 rounded-full shadow-md"
            />
          </div>
        </div>

        <div className="relative w-20 h-20 -ml-4">
          <div className="absolute inset-0 rounded-full"></div>
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <div className="w-full h-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <img
              src={user?.user.profilePicture || placeholder}
              alt="User"
              className="rounded-full shadow-md"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-2">
        <p className="text-black text-lg">John Doe</p>
        <p className="text-gray-500 text-sm">@johndoe</p>
      </div>
    </>
  );
};

export default SidebarHeader;
