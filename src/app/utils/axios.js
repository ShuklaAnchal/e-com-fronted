import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_Backned_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      return config;
    }

    const isAdminRoute =
      config.url?.includes("/admin") ||
      config.url?.includes("/portal") ||
      config.url?.includes("/adminlogin");

    let token;

    if (isAdminRoute) {
      token = localStorage.getItem("adminToken");
    } else {
      token = localStorage.getItem("userToken");
    }

    // /currentadmin can use either token
    if (config.url?.includes("/currentadmin")) {
      token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("userToken");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;