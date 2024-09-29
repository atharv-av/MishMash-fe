import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const signup = async (data, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/register`,
      {
        emailOrPhone: data.emailOrPhone,
        fullname: data.fullname,
        username: data.username,
        password: data.password,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error response:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const login = async (formData) => {
  try {
    const { identifier, password } = formData;

    const loginData = {
      identifier,
      password,
    };

    const response = await axios.post(`${baseUrl}/user/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("An error occurred during login");
  }
};
