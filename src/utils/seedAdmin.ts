import { hash } from "bcryptjs";
import { env } from "../config/env";
import prisma from "../config/prismaClient";

async function seedAdmin() {
  try {
    const isAdmin = await prisma.user.findUnique({
      where: {
        email: env.Admin.email,
      },
    });
    if (isAdmin) {
      console.log("Admin already exists");
    } else {
      const hashedPassword = await hash(env.Admin.password, env.HASH_SALT);
      const admin = await prisma.user.create({
        data: {
          name: env.Admin.name,
          email: env.Admin.email,
          password: hashedPassword,
        },
      });
      console.log("Admin created");
      console.log(admin);
    }
  } catch (error) {
    console.log(error);
  }
}

export default seedAdmin;
