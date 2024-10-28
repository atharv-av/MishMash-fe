import { Button, Input } from "@material-tailwind/react";
import { Clapperboard, Image } from "lucide-react";
import { useState } from "react";
import { createPost } from "../api/post";

const NewPost = () => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("notion"); // default to 'notion'
  const [file, setFile] = useState(null); // To hold the selected file

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleShare = async () => {
    const response = await createPost({ description, type, file });
    if (response.success) {
      alert(response.message);
      setDescription("");
      setType("notion");
      setFile(null);
    } else {
      alert("Failed to create post.");
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-3 lg:w-11/12 p-4 bg-gray-100 rounded-lg">
      <Input
        type="text"
        label="Share something..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="rounded-lg w-full"
      />
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-6">
          <div
            className={`flex items-center cursor-pointer gap-1 hover:text-blue-500 hover:scale-110 transition duration-150 ease-in-out ${
              type === "frame" ? "text-blue-500" : ""
            }`}
            onClick={() => handleTypeChange("frame")}
          >
            <Image className="h-5 w-5" />
            <p>Frame</p>
          </div>
          <div
            className={`flex items-center cursor-pointer gap-1 hover:text-blue-500 hover:scale-110 transition duration-150 ease-in-out ${
              type === "clip" ? "text-blue-500" : ""
            }`}
            onClick={() => handleTypeChange("clip")}
          >
            <Clapperboard className="h-5 w-5" />
            <p>Clip</p>
          </div>
        </div>
        <Button onClick={handleShare} className="bg-blue-500 hover:bg-gray-900">
          Share
        </Button>
      </div>
      {/* File input field */}
      {(type === "frame" || type === "clip") && (
        <Input
          type="file"
          onChange={handleFileChange}
          accept={type === "frame" ? "image/*" : "video/*"}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default NewPost;
