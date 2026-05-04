import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";
import React, { use } from "react";

const ManagerPage = async () => {
  const user = await getCurrentUser();
  if (!user || !checkUserPermission(user, Role.MANAGER)) {
    redirect("/unauthorized");
  }

  // fetch data for manager dashbaord (Team Members only)!
  const prismaMyTeamMembers = user.teamId
    ? prisma.user.findMany({
        where: {
          teamId: user.teamId,
          role: { not: Role.ADMIN },
        },
        include: {
          team: true,
        },
      })
    : [];

  // fetch data for manager dashbaord (Other team members excluding sensitive data)!
  const prismaAllMembers = prisma.user.findMany({
    where: {
      role: { not: Role.ADMIN },
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
          code: true,
          description: true,
        },
      },
    },
    orderBy: {
      teamId: "desc",
    },
  });

  return (
    <ManagerDashboard
      myTeamMembers={prismaMyTeamMembers}
      allTeamMembers={prismaAllMembers}
      currentUser={user}
    />
  );
};

export default ManagerPage;
