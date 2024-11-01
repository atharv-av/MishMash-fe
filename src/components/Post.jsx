import {
  EllipsisVertical,
  Eye,
  Heart,
  MessageCircle,
  Pencil,
  Send,
  Trash2,
} from "lucide-react";
import placeholder from "../assets/placeholder.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  toggleLike, 
  initializeLikes, 
  selectLikeCount, 
  selectLikeStatus 
} from '../store/slices/likeSlice';

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
import { Link } from "react-router-dom";

const Post = ({
  postId,
  redirectTo,
  fullname,
  profilePicture,
  time,
  isMenu,
  description,
  media,
  likes: initialLikes,
  comments,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // Initialize likes in Redux store
  useEffect(() => {
    dispatch(initializeLikes({ postId, count: initialLikes }));
  }, [dispatch, postId, initialLikes]);

  // Get likes count and status from Redux store using selectors
  const likeCount = useSelector(state => selectLikeCount(state, postId));
  const likeStatus = useSelector(selectLikeStatus);

  const handleLike = async () => {
    if (likeStatus !== 'loading') {
      dispatch(toggleLike(postId));
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3 lg:w-11/12 p-4 bg-blue-50 rounded-lg">
      <div className="flex flex-row items-center w-full justify-between">
        <Link to={`${redirectTo}`} className="flex flex-row items-center gap-3">
          <img
            src={profilePicture}
            alt="User"
            width={50}
            className="cursor-pointer rounded-full"
          />
          <div className="flex flex-col items-start">
            <p className="text-base font-semibold cursor-pointer">{fullname}</p>
            <p className="text-sm font-normal text-gray-600">{time}</p>
          </div>
        </Link>
        {isMenu && (
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
                onClick={handleOpen}
                className="flex items-center justify-between text-red-500"
              >
                <p>Delete</p>
                <Trash2 size={18} />
              </MenuItem>
            </MenuList>
          </Menu>
        )}
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
              onClick={handleOpen}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <p className="font-normal text-lg">{description}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {media.map((postItem, index) => (
          <div key={index} className="cursor-pointer">
            <img
              className="h-40 w-full max-w-full rounded-lg object-cover object-center"
              src={postItem || placeholder}
              alt="Gallery photo"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-3 self-start justify-between w-full">
        <div className="flex flex-row gap-3 self-start">
          <div
            onClick={handleLike}
            className={`flex gap-1 text-red-500 cursor-pointer hover:text-red-700 hover:scale-110 transition duration-150 ease-in-out ${
              likeStatus === 'loading' ? 'opacity-50' : ''
            }`}
          >
            <Heart />
            <p>{likeCount}</p>
          </div>
          <div className="flex gap-1 text-blue-500 cursor-pointer hover:text-blue-700 hover:scale-110 transition duration-150 ease-in-out">
            <MessageCircle />
            <p>{comments}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 self-end">
          <div className="flex gap-1 text-green-500 cursor-pointer hover:text-green-700 hover:scale-110 transition duration-150 ease-in-out">
            <Send />
            <p>Share</p>
          </div>
          <Link to={`/post/${postId}`} className="flex gap-1 text-orange-500 cursor-pointer hover:text-orange-700 hover:scale-110 transition duration-150 ease-in-out">
            <Eye />
            <p>View</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;