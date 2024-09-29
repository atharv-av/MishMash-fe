import { Avatar, Button } from "@material-tailwind/react";
import placeholder from "../assets/placeholder.png";

const ProfileDetails = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <Avatar size="xxl" src={placeholder} alt="avatar" />
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <p>atharv_av_</p>
          <Button size="sm" className="bg-blue-500 hover:bg-gray-900">
            Edit Profile
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <p>12 posts</p>
          <p>416 followers</p>
          <p>500 following</p>
        </div>
        <p>Atharv Vibhute</p>
        <p>lorem ipsum dolor sit ammet lorem ipsum dolor sit ammet</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
