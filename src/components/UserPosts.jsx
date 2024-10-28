import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import placeholderImg from "../assets/mishmash-logo.png";
import { getUserPosts } from "../api/post";

const UserPosts = ({author}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await getUserPosts(author);
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, [author]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4 mt-6 p-4 mx-auto max-w-5xl">
      {posts.map((post, index) => (
        <Card key={index} className="shadow-lg">
          <CardBody className="p-0">
            <img
              src={post.media[0] || placeholderImg}
              alt="User Post"
              className="w-full h-full object-cover"
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default UserPosts;
