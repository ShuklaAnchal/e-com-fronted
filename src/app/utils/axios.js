import axios from "axios";

const instance = axios.create({
  //baseURL: "https://dingwanifoods-backned-code.onrender.com/api/v1",
  // baseURL: "http://localhost:8080/api/v1/",
  baseURL: process.env.NEXT_PUBLIC_Backned_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    // Requests to admin APIs
    if (config.url.startsWith("/admin")) {
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      // Requests to customer APIs
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
  }

  return config;
});

export default instance;