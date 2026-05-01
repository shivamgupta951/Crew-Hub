import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await context.params;
    const CurrentUser = await getCurrentUser();
    if (!CurrentUser || !checkUserPermission(CurrentUser, Role.ADMIN)) {
      return NextResponse.json(
        {
          error: "You are not authorised to assign team.",
        },
        { status: 401 },
      );
    }
    // prevent users from changing its own id
    if (userId === CurrentUser.id) {
      return NextResponse.json(
        {
          error: "You can not edit your role!",
        },
        { status: 401 },
      );
    }

    const { role } = await request.json();
    // validate role
    const validateRoles = [Role.USER, Role.MANAGER];

    if (!validateRoles.includes(role)) {
      return NextResponse.json(
        {
          error: "Invalid Role or you cannot have more than one Admin Role.",
        },
        { status: 404 },
      );
    }

    //updated teamuser assigned team
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
      },
      include: {
        team: true,
      },
    });

    return NextResponse.json({
      user: updatedUser,
      message: `User role updated to ${role} successfully.`,
    });
  } catch (error) {
    console.log("Role Assigned error: ", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        error: "Internal Server Error!",
      },
      { status: 500 },
    );
  }
}
