import { Prisma } from "@prisma/client";
import prisma from "../../config/prismaClient";

const createBlog = async (payload: Prisma.BlogCreateInput) => {
  const newBlog = await prisma.blog.create({ data: payload });
  return newBlog;
};
const getAllBlogs = async () => {};
const getBlog = async () => {};
const getFeaturedBlogs = async () => {};
const updateBlog = async () => {};
const deleteBlog = async () => {};

export const blogService = {
  createBlog,
  getAllBlogs,
  getBlog,
  getFeaturedBlogs,
  updateBlog,
  deleteBlog,
};
