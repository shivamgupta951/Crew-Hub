import { User } from "@/app/types";
import React from "react";

interface ManagerDashboardProps {
  myTeamMembers: User[];
  allTeamMembers: User[];
  currentUser: User;
}

const ManagerDashboard = ({
  myTeamMembers,
  allTeamMembers,
  currentUser,
}: ManagerDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-center items-center">
        <div className="text-3xl flex items-center gap-3 font-bold text-yellow-500 bg-gradient-to-t from-blue-800/40 via-transparent to-transparent py-3 px-6 rounded-xl">
          <span>Manager Dashboard</span>

          <span className="text-sm text-gray-400 font-medium">
            Team Management View!
          </span>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-gray-500 bg-gray-800 rounded-md">
            <div className="border-b p-3">
              <div className="font-bold text-green-300">
                Team Members ({myTeamMembers.length})
              </div>
            </div>
            <div>
              {myTeamMembers.map((item) => (
                <div className="border-b border-gray-700 px-4 p-2">
                  <div>{item.name}</div>
                  <div className="flex text-[70%] text-gray-400 space-x-1">
                    <div>{item.email}</div> *{" "}
                    <div className="mx-1">{item.role}</div> *{" "}
                    <div className="mx-1">{item.team?.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-500 bg-gray-800 rounded-md">
            <div className="border-b p-3">
              <div className="font-bold text-green-300">
                Teams ({allTeamMembers.length})
              </div>
            </div>
            <div>
              {allTeamMembers.map((item) => (
                <div className="border-b border-gray-700 px-4 p-2">
                  <div>{item.name}</div>
                  <div className="flex text-[70%] text-gray-400 space-x-1">
                    <div>{item.email}</div> *{" "}
                    <div className="mx-1">{item.role}</div> *{" "}
                    <div className="mx-1">{item.team?.code}</div> *
                    <div className="mx-1">{item.team?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
