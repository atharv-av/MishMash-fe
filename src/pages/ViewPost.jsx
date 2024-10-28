import React, { useState, useEffect } from "react";
import Layout from "../wrappers/Layout";
import Post from "../components/Post";
import { useLocation, useParams } from "react-router-dom";
import { getPostById } from "../api/post";
import { getUser } from "../api/user";

const ViewPost = () => {
  const postId = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  const loggedUserId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPostById(postId.id);
      setPost(fetchedPost);
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (post && post.author) {
        const author = await getUser(post.author);
        setUser(author);
      }
    };

    fetchUser();
  }, [post]);

  if (!post || !user) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Post
        redirectTo={`/profile/${post.author}`}
        fullname={user.user.fullname}
        isMenu={loggedUserId === post.author ? true : false}
        description={post.description}
        media={post.media}
        likes={post.likes.length}
        comments={post.comments.length}
        time={new Date(post.createdAt).toLocaleString()}
        profilePicture={user.user.profilePicture}
      />
    </Layout>
  );
};

export default ViewPost;
