import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:5118/api/",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
