import { StatusCodes } from "http-status-codes";
import catchPromise from "../../utils/controllerHelper";
import sendRes from "../../utils/sendRes";
import { Request, Response } from "express";
import { blogService } from "./blogs.service";
import { Prisma } from "@prisma/client";
import { uploadBufferToCloudinary } from "../../config/cloudinary";

const createBlog = catchPromise(async (req: Request, res: Response) => {
  const file = req.file;
  let imageUrl: string | null | undefined = null;
  if (file) {
    imageUrl = (await uploadBufferToCloudinary(file.buffer, file.originalname))
      ?.secure_url;
  }
  const payload: Prisma.BlogCreateInput = {
    ...req.body,
    thumbnailUrl: imageUrl,
  };
  const blog = await blogService.createBlog(payload);
  sendRes(res, {
    statusCode: StatusCodes.CREATED,
    message: "Blog created successfully",
    data: { blog },
  });
});
const updateBlog = catchPromise(async (req: Request, res: Response) => {
  const file = req.file;
  let imageUrl: string | null | undefined = null;
  if (file) {
    imageUrl = (await uploadBufferToCloudinary(file.buffer, file.originalname))
      ?.secure_url;
  }
  const payload: Prisma.BlogUpdateInput = {
    ...req.body,
    ...(imageUrl && { thumbnailUrl: imageUrl }),
  };

  const blog = await blogService.updateBlog(req.params.id, payload);
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Blog updated successfully",
    data: { blog },
  });
});
const deleteBlog = catchPromise(async (req: Request, res: Response) => {
  const blog = await blogService.deleteBlog(req.params.id);
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Blog deleted successfully",
    data: { blog },
  });
});
const getAllBlogs = catchPromise(async (req: Request, res: Response) => {
  const blogs = await blogService.getAllBlogs();
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Blogs fetched successfully",
    data: { blogs },
  });
});
const getBlog = catchPromise(async (req: Request, res: Response) => {
  const blog = await blogService.getBlog(req.params.id);
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Blog fetched successfully",
    data: { blog },
  });
});
const getFeaturedBlogs = catchPromise(async (req: Request, res: Response) => {
  const blogs = await blogService.getFeaturedBlogs();
  sendRes(res, {
    statusCode: StatusCodes.OK,
    message: "Blogs fetched successfully",
    data: { blogs },
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  getBlog,
  getFeaturedBlogs,
  updateBlog,
  deleteBlog,
};
