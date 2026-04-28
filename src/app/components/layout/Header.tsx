"use client";
import { User } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdGamepad } from "react-icons/md";

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const pathName = usePathname();
  const navigation = [
    { name: "Home", href: "/", show: true },
    { name: "Dashboard", href: "/dashboard", show: true },
  ].filter((item) => item.show);
  const getNavItemClass = (href: string) => {
    let isActive = false;
    if (href === "/") {
      isActive = pathName === "/";
    } else if (href === "/dashboard") {
      isActive = pathName.startsWith(href);
    }
    return `px-3 py-2 rounded text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`;
  };
  return (
    <header className=" bg-slate-950 border-b flex justify-between px-10 items-center border-slate-700 min-h-8">
      {/* logo */}
      <div className="flex justify-center items-center border rounded-3xl my-2 text-xl py-1 px-4 bg-black text-pink-500 shadow-md shadow-pink-600">
        <MdGamepad className="mx-2 rotate-45 border" /> Crew Hub
      </div>
      {/* Navigation */}
      <div className="flex items-center space-x-5">
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={getNavItemClass(item.href)}
          >
            {item.name}
          </Link>
        ))}
      </div>
      {/* Auth Navigation */}
      {user ? (
        <div className="flex items-center space-x-5">
          <div className="px-3 py-2 rounded text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer underline">
            Shivam ~ User
          </div>
          <div
            // onClick={}
            className="px-3 py-2 rounded text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer underline"
          >
            logout
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-5">
          <Link
            href="/login"
            className="px-3 py-2 rounded text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer underline"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-3 py-2 rounded text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer underline"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
