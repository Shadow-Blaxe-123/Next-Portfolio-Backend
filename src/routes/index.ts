import { Router } from "express";
import LoginRoutes from "../modules/auth/login.route";
import { ProjectRoutes } from "../modules/projects/projects.route";
import { BlogRoutes } from "../modules/blogs/blogs.route";

interface Route {
  path: string;
  route: Router;
}

export const routes: Route[] = [
  {
    path: "/auth",
    route: LoginRoutes,
  },
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
];

const router = Router();

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
