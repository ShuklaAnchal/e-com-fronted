"use client";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";
import ProtectedRoute from "../component/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col">
      <ProtectedRoute type="user">
        <MarqueeBar />
        <Header />

        <main className="flex-1">{children}</main>
        <Footer />
      </ProtectedRoute>
    </div>
  );
}
