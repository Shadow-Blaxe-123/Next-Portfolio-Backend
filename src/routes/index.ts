import { Router } from "express";

interface Route {
  path: string;
  route: Router;
}

export const routes: Route[] = [];

const router = Router();

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
