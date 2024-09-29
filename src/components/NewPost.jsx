import { Button, Input } from "@material-tailwind/react";
import { Clapperboard, Image } from "lucide-react";

const NewPost = () => {
  return (
    <div className="mt-4 flex flex-col items-center gap-3 lg:w-11/12 p-4 bg-gray-100 rounded-lg">
      <Input
        type="text"
        label="Share something..."
        className="rounded-lg w-full"
      />
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-6">
          <div className="flex items-center cursor-pointer gap-1 hover:text-blue-500 hover:scale-110 transition duration-150 ease-in-out">
            <Image className="h-5 w-5" />
            <p>Frame</p>
          </div>
          <div className="flex items-center cursor-pointer gap-1 hover:text-blue-500 hover:scale-110 transition duration-150 ease-in-out">
            <Clapperboard className="h-5 w-5" />
            <p>Clip</p>
          </div>
        </div>
        <Button className="bg-blue-500 hover:bg-gray-900">Share</Button>
      </div>
    </div>
  );
};

export default NewPost;
