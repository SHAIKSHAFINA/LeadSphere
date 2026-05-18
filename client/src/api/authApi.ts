import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await API.post(
    "/api/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await API.post(
    "/api/auth/register",
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};

export default API;