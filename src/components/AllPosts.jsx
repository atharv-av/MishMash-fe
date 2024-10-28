import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPosts } from "../api/post";
import { getUser } from "../api/user";
import placeholder from "../assets/placeholder.png";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      const postsWithUserDetails = await Promise.all(
        fetchedPosts.map(async (post) => {
          const user = await getUser(post.author);
          return {
            ...post,
            fullname: user.user.fullname,
            profilePicture: user.user.profilePicture || placeholder,
          };
        })
      );

      setPosts(postsWithUserDetails);
    };

    fetchPosts();
  }, []);

  const loggedUserId = localStorage.getItem("userId");
  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={index}
          redirectTo={
            loggedUserId !== post.author
              ? `/profile/${post.author}`
              : "/myprofile"
          }
          fullname={post.fullname}
          isMenu={loggedUserId === post.author}
          description={post.description}
          media={post.media}
          likes={post.likes.length}
          comments={post.comments.length}
          time={new Date(post.createdAt).toLocaleString()}
          profilePicture={post.profilePicture}
        />
      ))}
    </div>
  );
};

export default AllPosts;
