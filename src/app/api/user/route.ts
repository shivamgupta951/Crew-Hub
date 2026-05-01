import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "You are not Authenticated to access user info!",
        },
        { status: 401 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get("teamId");
    const role = searchParams.get("role");

    // user role where clause
    const where: Prisma.UserWhereInput = {};
    if (user.role === Role.ADMIN) {
      // show all users
    } else if (user.role === Role.MANAGER) {
      // show their team and other team members
      where.OR = [{ teamId: user.teamId }, { role: Role.USER }];
    } else {
      // regular user can see their team members only
      where.teamId = user.teamId;
      where.role = { not: Role.ADMIN };
    }

    // more filters
    if (teamId) {
      where.teamId = teamId;
    }
    if (role && Object.values(Role).includes(role as Role)) {
      where.role = role as Role;
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {createdAt: "desc"},
    });
    return NextResponse.json({users});
  } catch (error) {
    console.log("Get user error: ",error)
    return NextResponse.json({
      error: "Internal server error!"
    },{status: 500});
  }
}
