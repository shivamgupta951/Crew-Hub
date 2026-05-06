"use client";
import { apiClient } from "@/app/lib/apiClient";
import { Role, Team, User } from "@/app/types";
import React, { useTransition } from "react";

interface AdminDashboardProps {
  users: User[];
  teams: Team[];
  currentUser: User;
}

const AdminDashboard = ({ users, teams, currentUser }: AdminDashboardProps) => {
  const [isPending, startTransition] = useTransition();

  // Team assignment
  const handleTeamAssignment = async (userId: string, teamId: string) => {
    startTransition(async () => {
      try {
        await apiClient.assignUserToTeam(userId, teamId);
        window.location.reload();
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Error updating team assignment!",
        );
      }
    });
  };

  // Role Assignment
  const handleRoleAssignment = async (userId: string, newRole: Role) => {
    if (userId === currentUser.id) {
      alert("You cannot change your own role!");
      return;
    }
    startTransition(async () => {
      try {
        await apiClient.updateUserRole(userId, newRole);
        window.location.reload();
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Error updating Role assignment!",
        );
      }
    });
  };

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl flex justify-center items-center font-bold text-yellow-500 bg-linear-to-t py-2 from-blue-800/50 rounded-md via-transparent to-transparent px-5">
          Admin Dashboard{" "}
          <h1 className="mx-4  text-center text-[30%] font-bold text-gray-400">
            User And Team Management
          </h1>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-md py-2 pb-6">
          <div className="py-2">
            <div className="text-xl px-2 mt-2">Users (20)</div>
            <div className="text-[70%] px-2 text-gray-400 border-b border-gray-700">
              Manage Roles and Team Assignments!
            </div>
            <div className="grid grid-cols-5 pt-4 py-2 border-gray-400 px-6 text-[75%] border-b mb-4">
              <div className="col-span-2">Name</div>
              <div>Role</div>
              <div>Team</div>
              <div>Actions</div>
            </div>

            {/* static data */}
            <div className="mx-2 px-1">
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
              <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">
                data
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-md">
          <div className="py-2 px-2">
            <div className="text-xl mt-2">Teams (3)</div>
            <div className="text-[70%] text-gray-400 border-b border-gray-700">
              Team Overview!
            </div>
            <div className="grid grid-cols-5 pt-4 py-2 border-gray-400 px-6 text-[75%] border-b mb-4">
              <div>Name</div>
              <div>Code</div>
              <div>Members</div>
              <div>Managers</div>
            </div>

            {/* static data */}
            <div className="mx-2 px-1">
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            <div className="text-[90%] py-3 flex justify-center items-center border-black border-b">data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
