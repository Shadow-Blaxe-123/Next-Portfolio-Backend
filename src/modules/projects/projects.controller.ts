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

const getProject = catchPromise(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await projectService.getProject(id);
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Project fetched successfully",
    data: { project },
  });
});

const getAllProjects = catchPromise(async (req: Request, res: Response) => {
  const projects = await projectService.getAllProjects();
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Projects fetched successfully",
    data: { projects },
  });
});
const getFeaturedProjects = catchPromise(
  async (req: Request, res: Response) => {
    const projects = await projectService.getFeaturedProjects();
    sendRes(res, {
      statusCode: StatusCodes.OK,
      message: "Projects fetched successfully",
      data: { projects },
    });
  }
);
const updateProject = catchPromise(async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file;
  let imageUrl: string | null | undefined = null;
  if (file) {
    imageUrl = (await uploadBufferToCloudinary(file.buffer, file.originalname))
      ?.secure_url;
  }
  const payload: Prisma.ProjectUpdateInput = {
    ...req.body,
    ...(imageUrl && { thumbnailUrl: imageUrl }),
  };

  const project = await projectService.updateProject(id, payload);
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Project updated successfully",
    data: { project },
  });
});
const deleteProject = catchPromise(async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleted = await projectService.deleteProject(id);
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Project deleted successfully",
    data: { deleted },
  });
});

export const projectController = {
  createProject,
  getProject,
  getAllProjects,
  getFeaturedProjects,
  updateProject,
  deleteProject,
};
