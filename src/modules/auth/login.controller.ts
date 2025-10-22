import { Request, Response } from "express";
import catchPromise from "../../utils/controllerHelper";
import loginService from "./login.service";
import setAuthCookie from "../../utils/setAuthCookie";
import sendRes from "../../utils/sendRes";
import { StatusCodes } from "http-status-codes";

const loginController = catchPromise(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await loginService(email, password);
  setAuthCookie(res, tokens);
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "User logged in successfully",
    data: { tokens },
  });
});

export default loginController;
