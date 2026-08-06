"use client";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col">
      <MarqueeBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

