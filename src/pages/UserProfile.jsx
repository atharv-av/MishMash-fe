import { Avatar } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Clapperboard, Images } from "lucide-react";
import placeholder from "../assets/placeholder.png";
import React, { useState, useEffect } from "react";
import { getUser, followOrUnfollow } from "../api/user"; // Import the follow/unfollow function
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../wrappers/Layout";

const data = [
  {
    label: "Posts",
    value: "Posts",
    icon: Images,
  },
  {
    label: "Clips",
    value: "Clips",
    icon: Clapperboard,
  },
];

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedUserId = localStorage.getItem("userId");
      const targetUserId = id;

      try {
        const targetUser = await getUser(targetUserId);
        setUser(targetUser);
        // Check if logged user is following the target user
        setIsFollowing(targetUser.user.followers.includes(loggedUserId));
        if (loggedUserId === id) {
          navigate("/myprofile");
        }
      } catch (err) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleFollowUnfollow = async () => {
    try {
      await followOrUnfollow(id);

      // Update following state
      setIsFollowing((prev) => !prev); // Toggle following state

      // Update user followers in local state
      setUser((prevUser) => {
        const loggedUserId = localStorage.getItem("userId");
        const updatedFollowers = isFollowing
          ? prevUser.user.followers.filter(followerId => followerId !== loggedUserId) // Remove logged user ID if unfollowing
          : [...prevUser.user.followers, loggedUserId]; // Add logged user ID if following

        return {
          ...prevUser,
          user: {
            ...prevUser.user,
            followers: updatedFollowers,
          },
        };
      });
    } catch (err) {
      console.error("Failed to follow/unfollow user:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="flex bg-blue-200 md:w-2/3 mx-auto p-5 gap-5 rounded-2xl md:flex-row flex-col items-center justify-evenly">
        <Avatar
          size="xxl"
          src={user?.user.profilePicture || placeholder}
          alt="avatar"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <p>{user?.user.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <p>{user?.user.posts.length} posts</p>
            <p>{user?.user.followers.length} followers</p>
            <p>{user?.user.following.length} following</p>
          </div>
          <p>{user?.user.fullname}</p>
          <p>{user?.user.about}</p>
          {/* Follow/Unfollow Button */}
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
