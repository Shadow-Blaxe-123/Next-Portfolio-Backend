import { StatusCodes } from "http-status-codes";
import prisma from "../../config/prismaClient";
import AppError from "../../error/AppError";
import { compare } from "bcryptjs";
import userTokens from "../../utils/userTokens";

const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  const isPasswordMatch = await compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid password");
  }

  const accessToken = userTokens.createAccesstoken(user);
  const refreshToken = userTokens.createRefreshToken(user);
  return { accessToken, refreshToken };
};

export default loginService;
