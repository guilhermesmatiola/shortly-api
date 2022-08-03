import { Router } from "express";
import { postURL } from "../controllers/urlController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenSchemaValidation.js";
import { ValidateURL } from "../middlewares/urlSchemaValidation.js";

const router = Router();

router.post("/urls/shorten", tokenValidationMiddleware, ValidateURL, postURL);

export default router;
