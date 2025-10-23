import z from "zod";

const createBlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  thumbnailUrl: z.string().optional(),
  isFeatured: z.boolean(),
});
const updateBlogSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export const blogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
