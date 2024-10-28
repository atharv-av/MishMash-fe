// src/api/post.js
import axios from "axios";
import { getCookie } from "../utils/cookieHandler";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const createPost = async ({ description, type, file }) => {
  const token = getCookie("token");
  const formData = new FormData();
  formData.append("description", description);
  formData.append("type", type);

  if (file) {
    formData.append("file", file);
  }

  try {
    const response = await axios.post(
      `${baseUrl}/post/create?type=${type}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        post: response.data.post,
      };
    } else {
      throw new Error("Failed to create post");
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, message: error.message };
  }
};

export const getAllPosts = async () => {
  const token = getCookie("token");
  try {
    const response = await axios.get(`${baseUrl}/post/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.posts;
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, message: error.message };
  }
};
