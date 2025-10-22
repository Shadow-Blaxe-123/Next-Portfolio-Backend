import z from "zod";

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  isFeatured: z.boolean(),
});

export { projectSchema };
