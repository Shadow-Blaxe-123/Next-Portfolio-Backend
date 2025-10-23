import z from "zod";

const createBlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  thumbnailUrl: z.string().optional(),
  isFeatured: z.boolean(),
});

export const blogValidation = {
  createBlogSchema,
};
