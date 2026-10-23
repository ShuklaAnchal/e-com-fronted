import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/app/component/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const index = () => {
  return <div className="h-full w-full primaryColor">
      <div className='h-screen w-screen flex '>
<div className='h-full w-full flex items-center justify-center primaryColor text-bold text-xl'>
Coming Sooon
</div>
    </div>
  </div>;
};

export default index;
