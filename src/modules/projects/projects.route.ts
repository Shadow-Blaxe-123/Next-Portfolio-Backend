import { Router } from "express";

const router = Router();

router.post("/create", (req, res) => {
  res.send("create project");
});

export const ProjectRoutes = router;
