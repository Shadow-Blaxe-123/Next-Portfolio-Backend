import { Prisma } from "@prisma/client";
import prisma from "../../config/prismaClient";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { deleteImageFromCloudinary } from "../../config/cloudinary";

const createProject = async (project: Prisma.ProjectCreateInput) => {
  const newProject = await prisma.project.create({ data: project });
  return newProject;
};
const getProject = async (id: string) => {
  const project = await prisma.project.findUnique({ where: { id } });
  return project;
};
const getAllProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};
const getFeaturedProjects = async () => {
  const projects = await prisma.project.findMany({
    where: { isFeatured: true },
  });
  return projects;
};
const updateProject = async (id: string, data: Prisma.ProjectUpdateInput) => {
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }

  if (data.thumbnailUrl && existing.thumbnailUrl) {
    try {
      await deleteImageFromCloudinary(existing.thumbnailUrl);
    } catch (err) {
      console.warn("Failed to delete old image from Cloudinary:", err);
    }
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data,
  });

  return updatedProject;
};

const deleteProject = async (id: string) => {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, "Project not found");
  }
  if (project.thumbnailUrl) {
    try {
      await deleteImageFromCloudinary(project.thumbnailUrl);
    } catch (err) {
      console.warn("Failed to delete old image from Cloudinary:", err);
    }
  }
  await prisma.project.delete({ where: { id } });
  return true;
};

export const projectService = {
  createProject,
  getProject,
  getAllProjects,
  getFeaturedProjects,
  updateProject,
  deleteProject,
};
