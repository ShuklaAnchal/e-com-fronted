import axios from "axios";

const instance = axios.create({
  //baseURL: "https://dingwanifoods-backned-code.onrender.com/api/v1",
  // baseURL: "http://localhost:8080/api/v1/",
  baseURL: process.env.NEXT_PUBLIC_Backned_URL,
  withCredentials: true,
});


instance.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  // Admin routes use explicit Bearer token (header-based auth)
  const isAdminRoute =
    config.url?.includes("/admin") ||
    config.url?.includes("/portal") ||
    config.url?.includes("/adminlogin") ||
    config.url?.includes("/currentadmin");

  if (isAdminRoute) {
    const adminToken =
      localStorage.getItem("adminToken") || localStorage.getItem("token");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  }
  // User routes use cookie-based auth — the browser sends the cookie
  // automatically because withCredentials: true is set above.
  // No manual Authorization header needed for user routes.

  return config;
});


export default instance;