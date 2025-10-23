import { Prisma } from "@prisma/client";
import prisma from "../../config/prismaClient";

const createProject = async (project: Prisma.ProjectCreateInput) => {
  const newProject = await prisma.project.create({ data: project });
  return newProject;
};
const getProject = async (id: string) => {
  const project = await prisma.project.findUnique({ where: { id } });
  return project;
};
const getAllProjects = async () => {};
const getFeaturedProjects = async () => {};
const updateProject = async () => {};
const deleteProject = async () => {};

export const projectService = {
  createProject,
  getProject,
  getAllProjects,
  getFeaturedProjects,
  updateProject,
  deleteProject,
};
