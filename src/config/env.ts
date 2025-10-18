import dotenv from "dotenv";
dotenv.config();

interface Env {
  PORT: number;
  NODE_ENV: string;
  Admin: {
    name: string;
    email: string;
    password: string;
  };
}

function loadEnv(): Env {
  const requiredVariables: string[] = [
    "PORT",
    "NODE_ENV",
    "ADMIN_NAME",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
  ];
  requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  });
  return {
    // Server
    PORT: Number(process.env.PORT),
    NODE_ENV: process.env.NODE_ENV as string,

    // Admin
    Admin: {
      name: process.env.ADMIN_NAME as string,
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASSWORD as string,
    },
  };
}

export const env = loadEnv();
