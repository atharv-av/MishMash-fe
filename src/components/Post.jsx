import {
  EllipsisVertical,
  Heart,
  MessageCircle,
  Pencil,
  Send,
  Trash2,
} from "lucide-react";
import placeholder from "../assets/placeholder.png";
import { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const data = [
  {
    imageLink:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    imageLink:
      "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    imageLink:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
  },
  {
    imageLink:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    imageLink:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  },
];

const Post = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className="mt-4 flex flex-col items-center gap-3 lg:w-11/12 p-4 bg-blue-50 rounded-lg">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-row items-center gap-3">
          <img
            src={placeholder}
            alt="User"
            width={50}
            className="cursor-pointer"
          />
          <div className="flex flex-col items-start">
            <p className="text-base font-semibold cursor-pointer">
              George Lobko
            </p>
            <p className="text-sm font-normal text-gray-600">2 hours ago</p>
          </div>
        </div>
        <Menu>
          <MenuHandler>
            <EllipsisVertical
              size={32}
              className="border-2 border-black/40 p-1 rounded-full cursor-pointer"
            />
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center justify-between text-blue-500">
              <p>Edit</p>
              <Pencil size={18} />
            </MenuItem>
            <MenuItem
              onClick={() => handleOpen()}
              className="flex items-center justify-between text-red-500"
            >
              <p>Delete</p>
              <Trash2 size={18} />
            </MenuItem>
          </MenuList>
        </Menu>
        <Dialog open={open} handler={handleOpen} className="p-6">
          <DialogHeader>Do you want delete this post?</DialogHeader>
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
                handleOpen();
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <p className="font-normal text-lg">
        lorem ipsum dolor sit ammet lorem ipsum dolor sit ammet!lorem ipsum
        dolor sit ammet lorem ipsum dolor sit ammet!
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map(({ imageLink }, index) => (
          <div key={index} className="cursor-pointer">
            <img
              className="h-40 w-full max-w-full rounded-lg object-cover object-center"
              src={imageLink}
              alt="Gallery photo"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-3 self-start justify-between w-full">
        <div className="flex flex-row gap-3 self-start">
          <div className="flex gap-1 text-red-500 cursor-pointer hover:text-red-700 hover:scale-110 transition duration-150 ease-in-out">
            <Heart />
            <p>789</p>
          </div>
          <div className="flex gap-1 text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110 transition duration-150 ease-in-out">
            <MessageCircle />
            <p>56</p>
          </div>
        </div>
        <div className="flex gap-1 text-green-500 cursor-pointer hover:text-green-700 hover:scale-110 transition duration-150 ease-in-out">
          <Send />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
