import axios from "axios";
import { getCookie } from "../utils/cookieHandler";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getUser = async (userId) => {
  const token = getCookie("token");

  try {
    const response = await axios.get(`${baseUrl}/user/profile/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSuggestedUsers = async () => {
  const token = getCookie("token");
  try {
    const response = await axios.get(`${baseUrl}/user/suggested`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response.data.users;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editUserProfile = async (userId, formData) => {
  const token = getCookie("token");

  try {
    const response = await axios.post(`${baseUrl}/user/editprofile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw error;
  }
};
