import { Button } from "@material-tailwind/react";
import placeholder from "../assets/placeholder.png";
import { useEffect, useState } from "react";
import { getSuggestedUsers } from "../api/user";

const Suggestions = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      const users = await getSuggestedUsers();
      setSuggestedUsers(users);
    };

    fetchSuggestedUsers();
  }, []);
  return (
    <div className="flex flex-col gap-5 md:w-full h-fit p-4 rounded-lg">
      <p className="font-bold text-2xl">Suggestions</p>
      {suggestedUsers.slice(0,5).map((user, index) => (
        <div key={index} className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-1 cursor-pointer">
            <img src={user.profilePicture || placeholder} alt="User" width={40} />
            <p className="font-semibold lg:text-base">{user.fullname}</p>
          </div>
          <Button size="sm" className="bg-blue-500 hover:bg-gray-900">
            Follow
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
