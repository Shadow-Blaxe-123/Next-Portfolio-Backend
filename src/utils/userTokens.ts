import { User } from "@prisma/client";
import { sign, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

const createAccesstoken = (user: Partial<User>) => {
  const jwtPauload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = sign(jwtPauload, env.JWT.Access_Token_Secret, {
    expiresIn: env.JWT.Access_Token_Expires_In,
  } as SignOptions);
  return token;
};

const createRefreshToken = (user: Partial<User>) => {
  const jwtPauload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = sign(jwtPauload, env.JWT.Refresh_Token_Secret, {
    expiresIn: env.JWT.Refresh_Token_Expires_In,
  } as SignOptions);
  return token;
};

const userTokens = { createAccesstoken, createRefreshToken };
export default userTokens;
