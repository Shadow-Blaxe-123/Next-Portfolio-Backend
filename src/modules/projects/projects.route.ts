import { Router } from "express";
import { multerUpload } from "../../config/multer";
import checkAuth from "../../middleware/checkAuth";
import { projectController } from "./projects.controller";
import validateRequest from "../../middleware/zodValidator";
import {
  createprojectSchema,
  updateprojectSchema,
} from "./projects.validation";

const router = Router();

router.post(
  "/create",
  multerUpload.single("file"),
  checkAuth,
  validateRequest(createprojectSchema),
  projectController.createProject
);
router.patch(
  "/update/:id",
  multerUpload.single("file"),
  checkAuth,
  validateRequest(updateprojectSchema),
  projectController.updateProject
);
router.delete("/delete/:id", checkAuth, projectController.deleteProject);
router.get("/get/:id", projectController.getProject);
router.get("/get-all", projectController.getAllProjects);
router.get("/get-featured", projectController.getFeaturedProjects);

export const ProjectRoutes = router;
