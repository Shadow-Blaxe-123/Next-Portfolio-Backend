import { Router } from "express";
import validateRequest from "../../middleware/zodValidator";
import { blogValidation } from "./blogs.validation";
import { multerUpload } from "../../config/multer";
import checkAuth from "../../middleware/checkAuth";
import { blogController } from "./blogs.controller";

const router = Router();

router.post(
  "/create",
  multerUpload.single("file"),
  checkAuth,
  validateRequest(blogValidation.createBlogSchema),
  blogController.createBlog
);
router.patch(
  "/update/:id",
  multerUpload.single("file"),
  checkAuth,
  validateRequest(blogValidation.updateBlogSchema),
  blogController.updateBlog
);

router.delete("/delete/:id", checkAuth, blogController.deleteBlog);
router.get("/get/:id", blogController.getBlog);

router.get("/get-all", blogController.getAllBlogs);

router.get("/get-featured", blogController.getFeaturedBlogs);

export const BlogRoutes = router;
