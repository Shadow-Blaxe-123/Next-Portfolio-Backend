import { Blog, Prisma } from "@prisma/client";
import prisma from "../../config/prismaClient";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { deleteImageFromCloudinary } from "../../config/cloudinary";

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
  const newBlog = await prisma.blog.create({ data: payload });
  return newBlog;
};
const updateBlog = async (
  id: string,
  payload: Prisma.BlogUpdateInput
): Promise<Blog> => {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");
  }

  if (payload.thumbnailUrl && existing.thumbnailUrl) {
    try {
      await deleteImageFromCloudinary(existing.thumbnailUrl);
    } catch (err) {
      console.warn("Failed to delete old image from Cloudinary:", err);
    }
  }

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: payload,
  });

  return updatedBlog;
};
const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany();
  return blogs;
};
const getBlog = async () => {};
const getFeaturedBlogs = async () => {};
const deleteBlog = async () => {};

export const blogService = {
  createBlog,
  getAllBlogs,
  getBlog,
  getFeaturedBlogs,
  updateBlog,
  deleteBlog,
};
