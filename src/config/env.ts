import dotenv from "dotenv";
dotenv.config();

interface Env {
  PORT: number;
}

function loadEnv(): Env {
  const requiredVariables: string[] = ["PORT"];
  requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  });
  return {
    // Server
    PORT: Number(process.env.PORT),
  };
}

export const env = loadEnv();
