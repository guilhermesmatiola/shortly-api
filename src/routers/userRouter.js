import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { ValidateSignUp } from "../middlewares/userSchemaValidation.js";
import { ValidateSignIn } from "../middlewares/userSchemaValidation.js";

const router = Router();

router.post("/signup", ValidateSignUp, signUp);
router.post("/signin", ValidateSignIn, signIn);

export default router;