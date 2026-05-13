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
            Team Management View
          </span>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <div className="border bg-gray-800">
            <div className="border-b p-2">
              <div>Team Members ({myTeamMembers.length})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
