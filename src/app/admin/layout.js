    // app/admin/layout.jsx

import AdminNavbar from "@/app/component/navbar";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="flex">
      <AdminNavbar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}