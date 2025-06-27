import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@atia.com" },
    update: {},
    create: {
      email: "admin@atia.com",
      password,
      role: "ADMIN",
      name: "Admin User",
    },
  });
  console.log("Admin user created: admin@atia.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
