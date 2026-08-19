// app/admin/layout.jsx

import AdminNavbar from "@/app/component/navbar";
import ProtectedRoute from "../component/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  return (
    <div className="flex overflow-hidden">
      <ProtectedRoute type="admin">
        <AdminNavbar />

        <main className="flex-1">
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
          />
        </main>
      </ProtectedRoute>
    </div>
  );
}
