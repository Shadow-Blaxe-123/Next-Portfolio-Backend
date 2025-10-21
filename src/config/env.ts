import dotenv from "dotenv";
dotenv.config();

interface Env {
  PORT: number;
  NODE_ENV: string;
  JWT: {
    Access_Token_Secret: string;
    Access_Token_Expires_In: string;
    Refresh_Token_Secret: string;
    Refresh_Token_Expires_In: string;
  };
  HASH_SALT: number;
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
    "HASH_SALT",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_SECRET",
    "REFRESH_TOKEN_EXPIRES_IN",
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
    HASH_SALT: Number(process.env.HASH_SALT),

    // Admin
    Admin: {
      name: process.env.ADMIN_NAME as string,
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASSWORD as string,
    },

    // JWT
    JWT: {
      Access_Token_Secret: process.env.ACCESS_TOKEN_SECRET as string,
      Access_Token_Expires_In: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
      Refresh_Token_Secret: process.env.REFRESH_TOKEN_SECRET as string,
      Refresh_Token_Expires_In: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    },
  };
}

export const env = loadEnv();
