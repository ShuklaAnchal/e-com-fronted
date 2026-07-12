    // app/admin/layout.jsx

import AdminNavbar from "@/app/component/navbar";
import ProtectedRoute from "../component/ProtectedRoute";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="flex">
         <ProtectedRoute type="admin">
      <AdminNavbar />

      <main className="flex-1">
        {children}
      </main>
       </ProtectedRoute>
    </div>
  );
}