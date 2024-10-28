import { Button } from "@material-tailwind/react";
import placeholder from "../assets/placeholder.png";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuggestedUsers,
} from "../store/slices/suggestionsSlice";

const Suggestions = () => {
  const dispatch = useDispatch();
  const { suggestedUsers, loading, error } = useSelector(
    (state) => state.suggestions
  );

  useEffect(() => {
    dispatch(fetchSuggestedUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-5 md:w-full h-fit p-4 rounded-lg">
      <p className="font-bold text-2xl">Suggestions</p>
      {suggestedUsers.slice(0, 5).map((suggested, index) => (
        <Link
          to={`/profile/${suggested._id}`}
          key={index}
          className="flex flex-row items-center justify-between"
        >
          <div className="flex flex-row items-center justify-center gap-1 cursor-pointer">
            <img
              src={suggested.profilePicture || placeholder}
              alt="User"
              width={40}
            />
            <p className="font-semibold lg:text-base">{suggested.fullname}</p>
          </div>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-gray-900 text-white"
          >
            Visit
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Suggestions;
