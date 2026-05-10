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
  const handleTeamAssignment = async (
    userId: string,
    teamId: string | null,
  ) => {
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

  // Role assignment
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
            : "Error updating role assignment!",
        );
      }
    });
  };

  return (
    <div className="container mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-center items-center">
        <div className="text-3xl flex items-center gap-3 font-bold text-yellow-500 bg-gradient-to-t from-blue-800/40 via-transparent to-transparent py-3 px-6 rounded-xl">
          <span>Admin Dashboard</span>

          <span className="text-sm text-gray-400 font-medium">
            User And Team Management
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg">
          {/* Section Header */}
          <div className="mb-4">
            <div className="text-2xl font-bold">Users ({users.length})</div>

            <div className="text-sm text-gray-400 border-b border-gray-700 pb-3">
              Manage Roles and Team Assignments
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="table w-full">
              {/* Table Head */}
              <thead className="bg-gray-800 text-gray-200">
                <tr className="border-b">
                  <th className="py-4">Name</th>
                  <th className="py-4">Role</th>
                  <th className="py-4">Team</th>
                  <th className="py-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-800/50 transition-all cursor-pointer border-b border-gray-700"
                  >
                    {/* User Info */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full flex justify-center items-center w-8 border mx-2 bg-gray-600/50 py-1">
                            <span>{user.name?.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>

                        {/* Name + Email */}
                        <div>
                          <div className="font-semibold text-[80%] text-base">
                            {user.name}
                          </div>

                          <div className="text-sm text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 ">
                      <select
                        disabled={isPending || user.id === currentUser.id}
                        className="select select-sm select-bordered p-1 focus:ring-blue-700 bg-gray-800 focus:ring-1 rounded-md"
                        value={user.role}
                        onChange={(e) =>
                          handleRoleAssignment(user.id, e.target.value as Role)
                        }
                      >
                        <option value={Role.USER}>USER</option>
                        <option value={Role.ADMIN}>ADMIN</option>
                        <option value={Role.MANAGER}>MANAGER</option>
                      </select>
                    </td>

                    {/* Team */}
                    <td className="py-4 min-w-[160px] relative flex justify-center items-center">
                      <div className="text-[60%] absolute top-1 right-12 text-slate-400">
                        {user.team?.code}
                      </div>
                      <select
                        disabled={isPending}
                        className="select select-sm select-bordered bg-gray-800 p-1 mt-1 rounded-md"
                        value={user.team?.id || ""}
                        onChange={(e) =>
                          handleTeamAssignment(user.id, e.target.value || null)
                        }
                      >
                        <option value="">No Team</option>

                        {teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                        {user.team?.id ? (
                          <button className="text-sm cursor-pointer btn btn-xs btn-error text-red-400">
                            Remove
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teams Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg">
          {/* Section Header */}
          <div className="mb-4">
            <div className="text-2xl font-bold">Teams ({teams.length})</div>

            <div className="text-sm text-gray-400 border-b border-gray-700 pb-3">
              Team Overview
            </div>
          </div>

          {/* Teams Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="table w-full">
              <thead className="bg-gray-800 text-gray-200">
                <tr>
                  <th className="py-4">Name</th>
                  <th className="py-4">Code</th>
                  <th className="py-4">Members</th>
                  <th className="py-4">Managers</th>
                </tr>
              </thead>

              <tbody>
                {teams.map((team) => {
                  const members = users.filter(
                    (user) => user.team?.id === team.id,
                  );

                  const managers = members.filter(
                    (user) => user.role === "MANAGER",
                  );

                  return (
                    <tr
                      key={team.id}
                      className="hover:bg-gray-800/50 transition-all "
                    >
                      <td className="py-4 font-semibold px-2 flex justify-center items-center">
                        {team.name}
                      </td>

                      <td className="py-4 text-center">{team.code}</td>

                      <td className="py-4 text-center">{members.length}</td>

                      <td
                        className={`py-4 text-center text-sm ${managers.length == 0 ? "text-slate-500" : ""}`}
                      >
                        {managers.length == 0 ? "No Manager" : managers.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-950/60 py-2 rounded-xl grid grid-cols-5 gap-6 px-2">
        <div className="flex justify-center space-y-4 items-center flex-col border py-10 rounded-2xl bg-blue-950/10 border-gray-700">
          <div className="text-xl font-bold font-sans text-yellow-600">
            Total Users
          </div>
          <div className="text-2xl">{users.length}</div>
        </div>
        <div className="flex justify-center space-y-4 items-center flex-col border py-10 rounded-2xl bg-blue-950/10 border-gray-700">
          <div className="text-xl font-bold font-sans text-yellow-600">
            Managers
          </div>
          <div className="text-2xl">
            {users.filter((item) => item.role === Role.MANAGER).length}
          </div>
        </div>
        <div className="flex justify-center space-y-4 items-center flex-col border py-10 rounded-2xl bg-blue-950/10 border-gray-700">
          <div className="text-xl font-bold font-sans text-yellow-600">
            Teams
          </div>
          <div className="text-2xl">{teams.length}</div>
        </div>
        <div className="flex justify-center space-y-4 items-center flex-col border py-10 rounded-2xl bg-blue-950/10 border-gray-700">
          <div className="text-xl font-bold font-sans text-yellow-600">
            Admin
          </div>
          <div className="text-2xl">
            {users.filter((item) => item.role === Role.ADMIN).length}
          </div>
        </div>
        <div className="flex justify-center space-y-4 items-center flex-col border py-10 rounded-2xl bg-blue-950/10 border-gray-700">
          <div className="text-xl font-bold font-sans text-yellow-600">
            Users
          </div>
          <div className="text-2xl">
            {users.filter((item) => item.role === Role.USER).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
