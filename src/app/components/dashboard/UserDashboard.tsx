import { User } from "@/app/types";
import React from "react";

interface UserDashboardProps {
  teamMembers: User[];
  currentUser: User;
}

const UserDashboard = ({ teamMembers, currentUser }: UserDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-center items-center">
        <div className="text-3xl flex items-center gap-3 font-bold text-yellow-500 bg-gradient-to-t from-blue-800/40 via-transparent to-transparent py-3 px-6 rounded-xl">
          <span>User Dashboard</span>

          <span className="text-sm text-gray-400 font-medium">
            Your Team View!
          </span>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-gray-500 bg-gray-800 rounded-md">
            <div className="border-b p-3">
              <div className="font-bold text-green-300">
                Team Members ({teamMembers.length})
              </div>
            </div>
            <div>
              {teamMembers.map((item) => (
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
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
