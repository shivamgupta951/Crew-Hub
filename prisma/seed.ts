import { hashPassword } from "@/app/lib/auth";
import { Role } from "@/app/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // 🔹 Create Teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Engineering",
        description: "Developers team",
        code: "ENG001",
      },
    }),
    prisma.team.create({
      data: {
        name: "Design",
        description: "Design team",
        code: "DES001",
      },
    }),
  ]);

  // 🔹 Create Users
  const sampleUsers = [
    {
      name: "Admin User",
      email: "admin@company.com",
      password: await hashPassword("123456"),
      role: Role.ADMIN,
    },
    {
      name: "Manager User",
      email: "manager@company.com",
      password: await hashPassword("123456"),
      role: Role.MANAGER,
      teamId: teams[0].id,
    },
    {
      name: "John Developer",
      email: "john@company.com",
      password: await hashPassword("123456"),
      role: Role.USER,
      teamId: teams[0].id,
    },
    {
      name: "Jane Designer",
      email: "jane@company.com",
      password: await hashPassword("123456"),
      role: Role.USER,
      teamId: teams[1].id,
    },
  ];

  for (const user of sampleUsers) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seeding completed ✅");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });