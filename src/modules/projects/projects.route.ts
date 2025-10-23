import { Router } from "express";
import { multerUpload } from "../../config/multer";
import checkAuth from "../../middleware/checkAuth";
import { projectController } from "./projects.controller";
import validateRequest from "../../middleware/zodValidator";
import { projectSchema } from "./projects.validation";

const router = Router();

router.post(
  "/create",
  multerUpload.single("file"),
  checkAuth,
  validateRequest(projectSchema),
  projectController.createProject
);
router.get("/get/:id", projectController.getProject);
router.get("/get-all", projectController.getAllProjects);

export const ProjectRoutes = router;
