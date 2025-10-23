import z from "zod";

const createprojectSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  isFeatured: z.boolean(),
});
const updateprojectSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export { createprojectSchema, updateprojectSchema };
