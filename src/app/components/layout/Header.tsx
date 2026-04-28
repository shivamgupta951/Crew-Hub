"use client"
import { User } from "@/app/types";
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
  return (
    <header className=" bg-slate-950 border-b flex justify-start px-8 items-center border-slate-700 min-h-8">
      <div className="flex justify-center items-center border rounded-3xl my-2 text-xl py-1 px-4 bg-black text-pink-500 shadow-md shadow-pink-600"><MdGamepad className="mx-2 rotate-45 border"/> Crew Hub</div>
    </header>
  );
};

export default Header;
