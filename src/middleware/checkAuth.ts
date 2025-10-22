import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import { JwtPayload, verify } from "jsonwebtoken";
import { env } from "../config/env";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization || req.cookies.accessToken;
    if (!accessToken) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "No Access Token found.Login first"
      );
    }
    const verifiedToken = verify(
      accessToken,
      env.JWT.Access_Token_Secret
    ) as JwtPayload;
    req.user = verifiedToken;
    next();
  } catch (error) {
    next(error);
  }
};

export default checkAuth;
