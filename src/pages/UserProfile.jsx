import { Avatar } from "@material-tailwind/react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Clapperboard, Images } from "lucide-react";
import placeholder from "../assets/placeholder.png";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, toggleFollowUser } from "../store/slices/userSlice";
import Layout from "../wrappers/Layout";
import Loader from "../components/Loader"

const data = [
  { label: "Posts", value: "Posts", icon: Images },
  { label: "Clips", value: "Clips", icon: Clapperboard },
];

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isFollowing, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserId = localStorage.getItem("userId");
    dispatch(fetchUser(id));
    if (loggedUserId === id) navigate("/myprofile");
  }, [id, navigate, dispatch]);

  const handleFollowUnfollow = () => {
    dispatch(toggleFollowUser(id));
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="flex bg-blue-200 md:w-2/3 mx-auto p-5 gap-5 rounded-2xl md:flex-row flex-col items-center justify-evenly">
        <Avatar size="xxl" src={user?.profilePicture || placeholder} alt="avatar" />
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <p>{user?.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <p>{user?.posts.length} posts</p>
            <p>{user?.followers.length} followers</p>
            <p>{user?.following.length} following</p>
          </div>
          <p>{user?.fullname}</p>
          <p>{user?.about}</p>
          <button
            onClick={handleFollowUnfollow}
            className={`mt-4 px-4 py-2 rounded ${
              isFollowing ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      <div className="lg:w-2/3 w-full mx-auto mt-20">
        <Tabs value="Posts">
          <TabsHeader className="bg-blue-300">
            {data.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value }) => (
              <TabPanel key={value} value={value}>
                {/* Display posts or clips */}
                {/* Add your content here */}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
