import { Router } from "express";
import validateRequest from "../../middleware/zodValidator";
import { loginSchema } from "./login.validation";
import loginController from "./login.controller";

const router = Router();

router.post("/login", validateRequest(loginSchema), loginController);

const LoginRoutes = router;
export default LoginRoutes;
