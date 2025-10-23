import { Request, Response } from "express";
import catchPromise from "../../utils/controllerHelper";
import { projectService } from "./projects.service";
import { uploadBufferToCloudinary } from "../../config/cloudinary";
import { Prisma } from "@prisma/client";
import sendRes from "../../utils/sendRes";
import { StatusCodes } from "http-status-codes";

const createProject = catchPromise(async (req: Request, res: Response) => {
  const file = req.file;
  let imageUrl: string | null | undefined = null;
  if (file) {
    imageUrl = (await uploadBufferToCloudinary(file.buffer, file.originalname))
      ?.secure_url;
  }
  const payload: Prisma.ProjectCreateInput = {
    ...req.body,
    thumbnailUrl: imageUrl,
  };

  const project = await projectService.createProject(payload);
  sendRes(res, {
    statusCode: StatusCodes.CREATED,
    message: "Project created successfully",
    data: { project },
  });
});

export const projectController = { createProject };
