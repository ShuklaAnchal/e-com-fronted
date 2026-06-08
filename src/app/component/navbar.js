"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { AiFillRead } from "react-icons/ai";
import { BiSolidBlanket } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { BsDiagram3Fill } from "react-icons/bs";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiGitCompare } from "react-icons/bi";
import { BiUnite } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { BiLogoBlogger } from "react-icons/bi";

import {
  fetchCurrentUser,
  logoutCurrentUser,
} from "@/app/store/action/loginAction";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const sidenavbar = () => {
  const [active, setActive] = useState(""); // State to track active button

  const handleClick = (name) => {
    setActive(name); // Set active button name on click
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const loginState = useSelector((state) => state.login);

  console.log("Login State:", loginState);

  // Adjust this based on your reducer structure
  const admin = loginState?.admin || null;

  // Fetch current user if token exists and admin is not loaded
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !admin) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, admin]);

  // Save admin data only when it exists
  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", JSON.stringify(admin));
    }
  }, [admin]);

  const id = admin?.id || "";
  const userType = admin?.userType || "";
  const adminName = admin?.adminName || "";

  const data = [
    { id: 0, Links: "/admin/dashboard/category", text: "Dashboard" },
    { id: 1, Links: "/admin/dashboard/", text: "Catgeory" },
    { id: 2, Links: "/admin/dashboard/", text: "Product" },
    { id: 3, Links: "/admin/dashboard/category", text: "Orders" },
    { id: 4, Links: "/admin/dashboard/category", text: "All Customer" },
    { id: 5, Links: "/admin/dashboard/category", text: "Staff Data" },
    { id: 6, Links: "/admin/dashboard/category", text: "Invetory" },
    { id: 7, Links: "/admin/dashboard/category", text: "Payment" },
    { id: 8, Links: "/admin/dashboard/category", text: "Enquiries" },
    { id: 9, Links: "/admin/dashboard/category", text: "Profile" },
  ];

  return (
    <div className=" rounded-br-3xl h-screen w-[12vw] py-6 flex flex-col justify-between secondrycolor text-white">
      <div className="flex flex-col gap-1 justify-center px-4">
        <div className="h-28">logo</div>
        <Link href="/admin/dashboard">
          <div
            className={`h-10 w-full flex flex-row gap-5 justify-start rounded-[5px] items-center cursor-pointer px-2 ${active === "dashboard" ? "primarybackground" : ""}`}
            onClick={() => handleClick("dashboard")}
          >
            <MdDashboard className="icons " />
            <h1 className="textColor font-semibold text-[15px] hidden sm:flex">
              Dashboard
            </h1>
          </div>
        </Link>

        <Link href="/admin/dashboard/category">
          <div
            className={`h-10 px-2 w-full flex flex-row gap-5 justify-start items-center cursor-pointer ${active === "/Routes/vmpage" ? "bg-red-500" : ""}`}
            onClick={() => handleClick("vm")}
          >
            <AiFillRead className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Category
            </h1>
          </div>
        </Link>
        <Link href="/admin/dashboard/product">
          <div
            className={`h-10 px-2 w-full flex flex-row gap-5 justify-start items-center cursor-pointer ${active === "/Routes/vmpage" ? "bg-red-500" : ""}`}
            onClick={() => handleClick("vm")}
          >
            <BiUnite className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Products
            </h1>
          </div>
        </Link>
        <Link href="/admin/dashboard/orders">
          <div className="px-2 h-10 w-full flex flex-row gap-5 justify-start items-center cursor-pointer">
            <GiBoxUnpacking className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Orders
            </h1>
          </div>
        </Link>
        <Link href="/admin/dashboard/customer">
          <div className="px-2 h-10 w-full flex flex-row gap-5 justify-start items-center cursor-pointer">
            <FaUsers className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              All Customer
            </h1>
          </div>
        </Link>
        <Link href="/admin/dashboard/staff">
          <div className="px-2 h-10 w-full flex flex-row gap-4 justify-start items-center cursor-pointer">
            <BsDiagram3Fill className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Staff Data
            </h1>
          </div>
        </Link>

        <Link href="/admin/dashboard/invetory">
          <div className="h-10 px-2 w-full flex flex-row gap-5 justify-start items-center cursor-pointer">
            <BiSolidBlanket className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Invetory
            </h1>
          </div>
        </Link>

        <Link href="/admin/dashboard/payments">
          <div className="h-10 px-2 w-full flex flex-row gap-5 justify-start items-center cursor-pointer">
            <GrInProgress className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Payment
            </h1>
          </div>
        </Link>

        <Link href="/admin/dashboard/blogs">
          <div className="h-10 px-2 w-full flex flex-row gap-5 justify-start items-center cursor-pointer">
            <BiLogoBlogger className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Blogs
            </h1>
          </div>
        </Link>

        <Link href="/admin/dashboard/enquries">
          <div className="h-10 px-2 w-full flex flex-row gap-5 justify-start items-center cursor-pointer">
            <BiGitCompare className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Enquiries
            </h1>
          </div>
        </Link>

        <Link href="/admin/dashboard/profile">
          <div className="h-10 px-2 w-full flex flex-row gap-5 justify-start items-center cursor-pointer">
            <FaUser className="icons" />
            <h1 className="textColor font-semibold	text-[15px] hidden sm:flex">
              Profile
            </h1>
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-row gap-5 px-4">
        <FaUserCircle className="icons" />
        <div className="flex flex-col gap-3">
            <h3>{adminName || "Loading..."}</h3>
    <h4>{userType || "User Role"}</h4>
        </div>
      </div>
    </div>
  );
};

export default sidenavbar;
