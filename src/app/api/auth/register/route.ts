import { hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, teamCode } = await request.json();
    // validating req fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name , Email & Password are required or not valid",
        },
        { status: 400 },
      );
    }

    // find user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // duplicate user
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 409 },
      );
    }

    let teamId :string | undefined;
    if (teamCode) {
      const team = await prisma.team.findUnique({
        where: { code: teamCode },
      });

      if(!team)
      {
        return NextResponse.json({
            error: "Plese enter a valid team code"
        },{status:400})
      }
      teamId = team.id
    }

    const hashedPassword = await hashPassword(password);

    // first user become admin , others become user
  } catch (error) {}
}
