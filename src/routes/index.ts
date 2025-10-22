import { Router } from "express";
import LoginRoutes from "../modules/auth/login.route";

interface Route {
  path: string;
  route: Router;
}

export const routes: Route[] = [
  {
    path: "/auth",
    route: LoginRoutes,
  },
];

const router = Router();

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
