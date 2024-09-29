import { Button } from "@material-tailwind/react";
import placeholder from "../assets/placeholder.png";

const suggestions = [
  {
    profilePicture: placeholder,
    name: "John Doe",
  },
  {
    profilePicture: placeholder,
    name: "John Doe",
  },
  {
    profilePicture: placeholder,
    name: "John Doe",
  },
];

const Suggestions = () => {
  return (
    <div className="flex flex-col gap-5 md:w-full h-fit p-4 rounded-lg">
      <p className="font-bold text-2xl">Suggestions</p>
      {suggestions.map((user, index) => (
        <div key={index} className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-1 cursor-pointer">
            <img src={user.profilePicture} alt="User" width={40} />
            <p className="font-semibold lg:text-base">{user.name}</p>
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
