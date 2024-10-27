import {
  Avatar,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import placeholder from "../assets/placeholder.png";
import { useState, useEffect } from "react";
import { getUser, editUserProfile } from "../api/user";

const ProfileDetails = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    about: "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const loggedUser = await getUser(userId);
        setUser(loggedUser);
        setFormData({
          fullname: loggedUser.user.fullname,
          username: loggedUser.user.username,
          about: loggedUser.user.about,
          profilePicture: loggedUser.user.profilePicture,
        });
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleEditProfile = async () => {
    const userId = localStorage.getItem("userId");
    const updatedFormData = new FormData();
    updatedFormData.append("fullname", formData.fullname);
    updatedFormData.append("username", formData.username);
    updatedFormData.append("about", formData.about);
    
    // Use "file" as the key for the profile picture
    if (formData.profilePicture) {
      updatedFormData.append("file", formData.profilePicture);
    }
  
    // Add validation checks
    if (!formData.fullname || !formData.username) {
      console.error("Full name and username are required.");
      return;
    }
  
    try {
      await editUserProfile(userId, updatedFormData);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  

  return (
    <div className="flex flex-row items-center justify-center gap-8">
      <Avatar
        size="xxl"
        src={user?.user.profilePicture || placeholder}
        alt="avatar"
      />
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <p>{user?.user.username}</p>
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-gray-900"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <p>{user?.user.posts.length} posts</p>
          <p>{user?.user.followers.length} followers</p>
          <p>{user?.user.following.length} following</p>
        </div>
        <p>{user?.user.fullname}</p>
        <p>{user?.user.about}</p>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <DialogHeader>Edit Profile</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Textarea
              label="About"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
            />
            <Input
              label="Profile Picture"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleEditProfile}>
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ProfileDetails;
