import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";
import React, { use } from "react";

const UserPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // fetch data for users (team members)!
  const teamMembers = user.teamId
    ? prisma.user.findMany({
        where: {
          teamId: user.teamId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })
    : [];

  return <UserDashboard teamMembers={teamMembers} currentUser={user} />;
};

export default UserPage;
